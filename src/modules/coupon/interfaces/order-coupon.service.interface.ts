import {
  CreateManyOrderCouponRequestDto,
  CreateOrderCouponRequestDto,
} from '../dtos/requests';
import { OrderCouponResponseDto } from '../dtos/responses';

export interface IOrderCouponService {
  /**
   * Create a new order coupon
   * @param dto - The order coupon data
   * @returns The created order coupon
   */
  createOne(dto: CreateOrderCouponRequestDto): Promise<OrderCouponResponseDto>;

  /**
   * Create multiple order coupons
   * @param dto - The order coupons data
   * @returns The created order coupons
   */
  createMany(
    dto: CreateManyOrderCouponRequestDto,
  ): Promise<OrderCouponResponseDto[]>;

  /**
   * Delete an order coupon
   * @param orderId - The order id
   * @param couponId - The coupon id
   */
  deleteOne(orderId: string, couponId: string): Promise<void>;

  /**
   * Get many order coupons by order id
   * @param orderId - The order id
   * @returns The order coupons
   */
  getManyByOrderId(orderId: string): Promise<OrderCouponResponseDto[]>;

  /**
   * Delete many coupons by order id
   * @param orderId - The order id
   */
  deleteManyByOrderId(orderId: string): Promise<void>;
}
