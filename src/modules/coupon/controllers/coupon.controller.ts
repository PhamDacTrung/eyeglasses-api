import { ApiResponseWrapper, Roles } from '@common/decorators';
import { EnumInjectServiceToken, EnumUserRole } from '@common/enums';
import { JwtAuthGuard, RolesGuard } from '@common/guards';
import { PageOptionsDto } from '@common/paginations';
import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PublicCouponFilterDto } from '../dtos/requests';
import { CouponResponseDto, PageCouponResponseDto } from '../dtos/responses';
import { ICouponService } from '../interfaces';

@Controller('coupon')
@ApiTags('Coupons')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(EnumUserRole.USER)
export class CouponController {
  constructor(
    @Inject(EnumInjectServiceToken.COUPON_SERVICE)
    private readonly couponService: ICouponService,
  ) {}

  @Get()
  @ApiResponseWrapper(PageCouponResponseDto, 'Get all public coupons')
  async getCoupons(
    @Query() pageOptions: PageOptionsDto,
    @Query() query: PublicCouponFilterDto,
  ): Promise<PageCouponResponseDto> {
    return this.couponService.getAllPublicCoupons(pageOptions, query);
  }

  @Get('by-code')
  @ApiResponseWrapper(CouponResponseDto, 'Get a coupon by code')
  async getCouponByCode(
    @Query() query: Pick<PublicCouponFilterDto, 'keywords'>,
  ): Promise<CouponResponseDto> {
    return this.couponService.getOneByCode(query.keywords);
  }
}
