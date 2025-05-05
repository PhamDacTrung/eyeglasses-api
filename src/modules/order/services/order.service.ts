import { EnumOrderStatus, EnumSortDirection } from '@common/enums';
import { PageMetaDto, PageOptionsDto } from '@common/paginations';
import {
  ExceptionHandler,
  UnprocessableEntityException,
} from '@core/exceptions';
import { CartItem, Order, OrderItem, Product } from '@entities';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
  ) {}

  @Transactional()
  async createOrder(
    userId: string,
    data: CreateOrderRequestDto,
  ): Promise<OrderResponseDto> {
    const { cartItemIds, paymentMethod, shippingAddress } = data;

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

    // Create order
    const order = this.orderRepository.create({
      user: { id: userId },
      shippingAddress,
      status: EnumOrderStatus.PENDING,
      totalAmount: cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ),
      paymentMethod,
    });

    await this.orderRepository.save(order);

    // Create order items and update stock
    await Promise.all(
      cartItems.map(async (item) => {
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
    );

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

      // const { keywords } = filters;

      // const searchQuery = keywords?.trim().toLowerCase();
      // const searchVector = searchQuery
      //   ? `${searchQuery.split(/\s+/).join(':* & ')}:*`
      //   : null;

      const [orders, total] = await this.orderRepository.findAndCount({
        where: {
          user: { id: userId },
        },
        relations: ['items', 'items.product', 'user'],
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
