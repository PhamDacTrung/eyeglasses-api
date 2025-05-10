import {
  ExceptionHandler,
  UnprocessableEntityException,
} from '@core/exceptions';
import { OrderCoupon } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import {
  CreateManyOrderCouponRequestDto,
  CreateOrderCouponRequestDto,
} from '../dtos/requests';
import { OrderCouponResponseDto } from '../dtos/responses';
import { IOrderCouponService } from '../interfaces';

@Injectable()
export class OrderCouponService implements IOrderCouponService {
  constructor(
    @InjectRepository(OrderCoupon)
    private readonly orderCouponRepository: Repository<OrderCoupon>,
  ) {}

  async createMany(
    dto: CreateManyOrderCouponRequestDto,
  ): Promise<OrderCouponResponseDto[]> {
    try {
      const { orderCoupons } = dto;

      const newOrderCoupons = this.orderCouponRepository.create(orderCoupons);

      await this.orderCouponRepository.save(newOrderCoupons);

      return plainToInstance(OrderCouponResponseDto, newOrderCoupons);
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }

  async createOne(
    dto: CreateOrderCouponRequestDto,
  ): Promise<OrderCouponResponseDto> {
    try {
      const { orderId, couponId } = dto;

      const orderCoupon = this.orderCouponRepository.create({
        orderId,
        couponId,
      });

      await this.orderCouponRepository.save(orderCoupon);

      return orderCoupon;
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }

  async deleteOne(orderId: string, couponId: string): Promise<void> {
    try {
      const orderCoupon = await this.orderCouponRepository.findOne({
        where: { orderId, couponId },
      });

      if (!orderCoupon) {
        throw new UnprocessableEntityException('Order coupon not found');
      }

      const deletedOrderCoupon = await this.orderCouponRepository.delete({
        orderId,
        couponId,
      });

      if (deletedOrderCoupon.affected === 0) {
        throw new UnprocessableEntityException('Failed to delete order coupon');
      }
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }

  async getManyByOrderId(orderId: string): Promise<OrderCouponResponseDto[]> {
    try {
      const orderCoupons = await this.orderCouponRepository.find({
        where: { orderId },
      });

      return plainToInstance(OrderCouponResponseDto, orderCoupons);
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }

  async deleteManyByOrderId(orderId: string): Promise<void> {
    try {
      const deletedOrderCoupons = await this.orderCouponRepository.delete({
        orderId,
      });

      if (deletedOrderCoupons.affected === 0) {
        throw new UnprocessableEntityException(
          'Failed to delete order coupons',
        );
      }
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }
}
