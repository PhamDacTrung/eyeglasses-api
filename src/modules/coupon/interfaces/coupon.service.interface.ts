import { PageOptionsDto } from '@common/paginations';
import {
  CouponFilterDto,
  CreateCouponRequestDto,
  PublicCouponFilterDto,
  UpdateCouponRequestDto,
} from '../dtos/requests';
import { CouponResponseDto, PageCouponResponseDto } from '../dtos/responses';

export interface ICouponService {
  /**
   * Check if the coupons are valid
   * @param couponIds - The coupon ids
   */
  checkValidCoupons(couponIds: string[]): Promise<void>;

  /**
   * Get a coupon by id
   * @param id - The coupon id
   * @returns The coupon
   */
  getOneById(id: string): Promise<CouponResponseDto>;

  /**
   * Get many coupons by ids
   * @param ids - The coupon ids
   * @returns The coupons
   */
  getManyByIds(ids: string[]): Promise<CouponResponseDto[]>;

  /**
   * Get a coupon by code
   * @param code - The coupon code
   * @returns The coupon
   */
  getOneByCode(code: string): Promise<CouponResponseDto | null>;

  /**
   * Get all coupons
   * @returns The coupons
   */
  getAllCoupons(
    pageOptions: PageOptionsDto,
    filter?: CouponFilterDto,
  ): Promise<PageCouponResponseDto>;

  /**
   * Get all public coupons
   * @returns The coupons
   */
  getAllPublicCoupons(
    pageOptions: PageOptionsDto,
    filter?: PublicCouponFilterDto,
  ): Promise<PageCouponResponseDto>;

  /**
   * Create a coupon
   * @param dto - The coupon data
   * @returns The created coupon
   */
  createOne(dto: CreateCouponRequestDto): Promise<CouponResponseDto>;

  /**
   * Update a coupon
   * @param id - The coupon id
   * @param dto - The coupon data
   * @returns The updated coupon
   */
  updateOne(
    id: string,
    dto: UpdateCouponRequestDto,
  ): Promise<CouponResponseDto>;

  /**
   * Delete a coupon
   * @param id - The coupon id
   */
  deleteOne(id: string): Promise<void>;
}
