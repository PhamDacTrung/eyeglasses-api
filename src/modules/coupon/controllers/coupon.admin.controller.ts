import { ApiResponseWrapper, Roles } from '@common/decorators';
import { EnumInjectServiceToken, EnumUserRole } from '@common/enums';
import { JwtAuthGuard, RolesGuard } from '@common/guards';
import { PageOptionsDto } from '@common/paginations';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CouponFilterDto,
  CreateCouponRequestDto,
  UpdateCouponRequestDto,
} from '../dtos/requests';
import { CouponResponseDto, PageCouponResponseDto } from '../dtos/responses';
import { ICouponService } from '../interfaces';

@Controller({
  path: 'coupons',
  version: '1',
})
@ApiTags('Coupons (Admin Only)')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(EnumUserRole.ADMIN)
export class CouponAdminController {
  constructor(
    @Inject(EnumInjectServiceToken.COUPON_SERVICE)
    private readonly couponService: ICouponService,
  ) {}

  @Get()
  @ApiResponseWrapper(PageCouponResponseDto, 'Get all coupons')
  async getCoupons(
    @Query() pageOptions: PageOptionsDto,
    @Query() query: CouponFilterDto,
  ): Promise<PageCouponResponseDto> {
    return this.couponService.getAllCoupons(pageOptions, query);
  }

  @Post()
  @ApiResponseWrapper(CouponResponseDto, 'Create a coupon')
  async createCoupon(
    @Body() dto: CreateCouponRequestDto,
  ): Promise<CouponResponseDto> {
    return this.couponService.createOne(dto);
  }

  @Put(':id')
  @ApiResponseWrapper(CouponResponseDto, 'Update a coupon')
  async updateCoupon(
    @Param('id') id: string,
    @Body() dto: UpdateCouponRequestDto,
  ): Promise<CouponResponseDto> {
    return this.couponService.updateOne(id, dto);
  }

  @Delete(':id')
  @ApiResponseWrapper(null, 'Delete a coupon')
  async deleteCoupon(@Param('id') id: string): Promise<void> {
    return this.couponService.deleteOne(id);
  }
}
