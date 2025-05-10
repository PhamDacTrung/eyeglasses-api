import {
  EnumCouponApplicableTo,
  EnumCouponStatus,
  EnumSortDirection,
} from '@common/enums';
import { PageMetaDto, PageOptionsDto } from '@common/paginations';
import {
  BadRequestException,
  ExceptionHandler,
  UnprocessableEntityException,
} from '@core/exceptions';
import { Coupon, OrderCoupon } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { In, Raw, Repository } from 'typeorm';
import {
  CouponFilterDto,
  CreateCouponRequestDto,
  PublicCouponFilterDto,
  UpdateCouponRequestDto,
} from '../dtos/requests';
import { CouponResponseDto, PageCouponResponseDto } from '../dtos/responses';
import { ICouponService } from '../interfaces/coupon.service.interface';

@Injectable()
export class CouponService implements ICouponService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,

    @InjectRepository(OrderCoupon)
    private readonly orderCouponRepository: Repository<OrderCoupon>,
  ) {}

  async getOneByCode(code: string): Promise<CouponResponseDto | null> {
    try {
      const coupon = await this.couponRepository.findOne({
        where: { code },
      });

      return plainToInstance(CouponResponseDto, coupon);
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }

  async getAllCoupons(
    pageOptions: PageOptionsDto,
    filter?: CouponFilterDto,
  ): Promise<PageCouponResponseDto> {
    try {
      const { page, take, skip, sort, sortDirection } = pageOptions;

      const { keywords, type, status, applicableTo, isPublic } = filter;

      const searchQuery = keywords?.trim().toLowerCase();
      const searchVector = searchQuery
        ? `${searchQuery.split(/\s+/).join(':* & ')}:*`
        : null;

      const [coupons, total] = await this.couponRepository.findAndCount({
        where: {
          searchVector: searchVector
            ? Raw((alias) => `${alias} @@ to_tsquery('simple',:query)`, {
                query: searchVector,
              })
            : null,
          type,
          status,
          applicableTo,
          isPublic,
        },
        order: {
          [sort ?? 'createdAt']: sortDirection ?? EnumSortDirection.DESC,
        },
        skip,
        take,
      });

      const meta = new PageMetaDto({
        page,
        take,
        itemCount: total,
      });

      return new PageCouponResponseDto(
        plainToInstance(CouponResponseDto, coupons),
        meta,
      );
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }

  async getAllPublicCoupons(
    pageOptions: PageOptionsDto,
    filter?: PublicCouponFilterDto,
  ): Promise<PageCouponResponseDto> {
    try {
      const { page, take, skip, sort, sortDirection } = pageOptions;

      const { keywords, applicableTo } = filter;

      const searchQuery = keywords?.trim().toLowerCase();
      const searchVector = searchQuery
        ? `${searchQuery.split(/\s+/).join(':* & ')}:*`
        : null;

      const [coupons, total] = await this.couponRepository.findAndCount({
        where: {
          searchVector: searchVector
            ? Raw((alias) => `${alias} @@ to_tsquery('simple',:query)`, {
                query: searchVector,
              })
            : null,
          status: EnumCouponStatus.ACTIVE,
          applicableTo,
          isPublic: true,
        },
        order: {
          [sort ?? 'createdAt']: sortDirection ?? EnumSortDirection.DESC,
        },
        skip,
        take,
      });

      const meta = new PageMetaDto({
        page,
        take,
        itemCount: total,
      });

      return new PageCouponResponseDto(
        plainToInstance(CouponResponseDto, coupons),
        meta,
      );
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }

  async getOneById(id: string): Promise<CouponResponseDto> {
    try {
      const coupon = await this.couponRepository.findOne({
        where: { id },
      });

      if (!coupon) {
        throw new BadRequestException('Coupon not found');
      }

      return plainToInstance(CouponResponseDto, coupon);
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }

  async getManyByIds(ids: string[]): Promise<CouponResponseDto[]> {
    try {
      const coupons = await this.couponRepository.find({
        where: { id: In(ids) },
      });

      return plainToInstance(CouponResponseDto, coupons);
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }

  async createOne(dto: CreateCouponRequestDto): Promise<CouponResponseDto> {
    try {
      const coupon = this.couponRepository.create(dto);
      await this.couponRepository.save(coupon);

      return plainToInstance(CouponResponseDto, coupon);
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }

  async updateOne(
    id: string,
    dto: UpdateCouponRequestDto,
  ): Promise<CouponResponseDto> {
    try {
      const coupon = await this.couponRepository.findOne({
        where: { id },
      });

      if (!coupon) {
        throw new BadRequestException('Coupon not found');
      }

      const updatedCoupon = await this.couponRepository.update(id, dto);

      if (updatedCoupon.affected === 0) {
        throw new UnprocessableEntityException('Coupon not updated');
      }

      const newCoupon = await this.couponRepository.findOne({
        where: { id },
      });

      return plainToInstance(CouponResponseDto, newCoupon);
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }

  async deleteOne(id: string): Promise<void> {
    try {
      const coupon = await this.couponRepository.findOne({
        where: { id },
      });

      if (!coupon) {
        throw new BadRequestException('Coupon not found');
      }

      // only delete if no order applied
      const orderCoupon = await this.orderCouponRepository.findOne({
        where: { couponId: id },
      });

      if (orderCoupon) {
        throw new BadRequestException(
          'Coupon is applied to an order. Let update the coupon to INACTIVE instead.',
        );
      }

      const deletedCoupon = await this.couponRepository.delete(id);

      if (deletedCoupon.affected === 0) {
        throw new UnprocessableEntityException('Coupon not deleted');
      }
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }

  async checkValidCoupons(couponIds: string[]): Promise<void> {
    try {
      // get coupon infos
      const couponInfos = await this.couponRepository.find({
        where: { id: In(couponIds) },
      });

      if (couponInfos.length !== couponIds.length) {
        throw new BadRequestException('Invalid coupon');
      }

      // can apply only 1 shipping coupon
      const shippingCoupon = couponInfos.find(
        (coupon) => coupon.applicableTo === EnumCouponApplicableTo.SHIPPING,
      );

      if (shippingCoupon && couponInfos.length > 1) {
        throw new BadRequestException('Only one shipping coupon is allowed');
      }

      // check inactive coupon
      const isInactive = couponInfos.some(
        (coupon) => coupon.status !== EnumCouponStatus.ACTIVE,
      );

      if (isInactive) {
        throw new BadRequestException('Coupon(s) is inactive or expired');
      }

      // check coupon is expired
      const isExpired = couponInfos.some(
        (coupon) => coupon.endDate < new Date(),
      );

      if (isExpired) {
        throw new BadRequestException('Coupon(s) is expired');
      }

      // check coupon is used up
      const isUsedUp = couponInfos.some(
        (coupon) => coupon.usageLimit && coupon.usageLimit <= 0,
      );

      if (isUsedUp) {
        throw new BadRequestException('Coupon(s) is used up');
      }
    } catch (error) {
      ExceptionHandler.handleErrorException(error);
    }
  }
}
