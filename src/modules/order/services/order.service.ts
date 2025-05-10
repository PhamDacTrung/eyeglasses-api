import {
  EnumCouponApplicableTo,
  EnumCouponType,
  EnumInjectServiceToken,
  EnumOrderStatus,
  EnumSortDirection,
} from '@common/enums';
import { PageMetaDto, PageOptionsDto } from '@common/paginations';
import {
  BadRequestException,
  ExceptionHandler,
  NotFoundException,
  UnprocessableEntityException,
} from '@core/exceptions';
import { CartItem, Order, OrderItem, Product, UserAddress } from '@entities';
import {
  ICouponService,
  IOrderCouponService,
} from '@modules/coupon/interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { In, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { CreateOrderRequestDto, OrderFilterDto } from '../dtos/requests';
import { OrderResponseDto, PageOrderResponseDto } from '../dtos/responses';
import { IOrderService } from '../interfaces';

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(UserAddress)
    private readonly userAddressRepository: Repository<UserAddress>,

    @Inject(EnumInjectServiceToken.COUPON_SERVICE)
    private readonly couponService: ICouponService,

    @Inject(EnumInjectServiceToken.ORDER_COUPON_SERVICE)
    private readonly orderCouponService: IOrderCouponService,
  ) {}

  @Transactional()
  async createOrder(
    userId: string,
    data: CreateOrderRequestDto,
  ): Promise<OrderResponseDto> {
    const { cartItemIds, paymentMethod, userAddressId, couponIds } = data;

    const cartItems = await this.cartItemRepository.find({
      where: { id: In(cartItemIds), cart: { user: { id: userId } } },
      relations: ['cart', 'product'],
    });

    if (!cartItems.length) {
      throw new BadRequestException('Cart is empty');
    }

    // Check stock availability
    for (const item of cartItems) {
      if (!item.product || item.product.stockQuantity < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for product ${item.product?.name}`,
        );
      }
    }

    // get coupon infos
    const couponInfos = couponIds
      ? await this.couponService.getManyByIds(couponIds)
      : [];

    // can apply only 1 shipping coupon
    const shippingCoupon = couponInfos.find(
      (coupon) => coupon.applicableTo === EnumCouponApplicableTo.SHIPPING,
    );

    if (shippingCoupon && couponInfos.length > 1) {
      throw new BadRequestException('Only one shipping coupon is allowed');
    }

    // get shipping address
    const shippingAddress = await this.userAddressRepository.findOne({
      where: { id: userAddressId },
    });

    if (!shippingAddress) {
      throw new BadRequestException('Shipping address not found');
    }

    // calculate original amount
    const originalAmount = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    // calculate final amount base on coupon infos and original amount
    const finalAmount = couponInfos.reduce((total, coupon) => {
      if (coupon.applicableTo === EnumCouponApplicableTo.PRODUCT) {
        if (coupon.type === EnumCouponType.PERCENTAGE) {
          return total * (1 - coupon.value / 100);
        }

        if (coupon.type === EnumCouponType.FIXED) {
          return total - coupon.value;
        }

        return total;
      }

      return total;
    }, originalAmount);

    // get original shipping amount
    const originalShippingFee = 30000;

    // calculate final shipping amount
    const finalShippingFee = shippingCoupon
      ? shippingCoupon.type === EnumCouponType.PERCENTAGE
        ? originalShippingFee * (1 - shippingCoupon.value / 100)
        : originalShippingFee - shippingCoupon.value
      : originalShippingFee;

    // Create order
    const order = this.orderRepository.create({
      userId,
      status: EnumOrderStatus.PENDING,
      originalAmount,
      finalAmount,
      paymentMethod,
      originalShippingFee,
      finalShippingFee,
      userAddressId,
    });

    await this.orderRepository.save(order);

    // Create order items, update stock and update coupon
    await Promise.all([
      ...cartItems.map(async (item) => {
        const orderItem = this.orderItemRepository.create({
          order,
          product: item.product,
          quantity: item.quantity,
          price: item.price,
        });

        await this.orderItemRepository.save(orderItem);

        // Update product stock
        const product = await this.productRepository.findOne({
          where: { id: item.product.id },
        });
        product.stockQuantity -= item.quantity;
        await this.productRepository.save(product);
      }),

      // Update coupon
      ...couponInfos.map(async (coupon) => {
        await this.couponService.updateOne(coupon.id, {
          usageCount: coupon.usageCount + 1,
        });
      }),

      // Create order coupons
      await this.orderCouponService.createMany({
        orderCoupons: couponInfos.map((coupon) => ({
          orderId: order.id,
          couponId: coupon.id,
        })),
      }),
    ]);

    // Clear cart
    await this.cartItemRepository.delete({ id: In(cartItemIds) });

    return this.findOne(order.id);
  }

  async findAll(
    userId: string,
    pageOptionDtos: PageOptionsDto,
    filters: OrderFilterDto,
  ): Promise<PageOrderResponseDto> {
    try {
      const { page, take, sort, sortDirection, skip } = pageOptionDtos;

      const { status } = filters;

      const [orders, total] = await this.orderRepository.findAndCount({
        where: {
          user: { id: userId },
          ...(status && { status }),
        },
        relations: ['items', 'items.product', 'user', 'orderCoupons'],
        order: {
          [sort ?? 'createdAt']: sortDirection ?? EnumSortDirection.DESC,
        },
        take,
        skip,
      });

      const meta = new PageMetaDto({
        page,
        take,
        itemCount: total,
      });

      const data = plainToInstance(OrderResponseDto, orders);

      return new PageOrderResponseDto(data, meta);
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }

  async findOne(id: string): Promise<OrderResponseDto> {
    try {
      const order = await this.orderRepository.findOne({
        where: { id },
        relations: ['items', 'items.product', 'user'],
      });

      if (!order) {
        throw new NotFoundException('Order not found');
      }

      return plainToInstance(OrderResponseDto, order);
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }

  async updateStatus(id: string, status: EnumOrderStatus): Promise<void> {
    try {
      const order = await this.findOne(id);
      const result = await this.orderRepository.update(
        { id: order.id },
        {
          status,
        },
      );

      if (result.affected === 0) {
        throw new UnprocessableEntityException('Order status update failed');
      }
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }
}
