import { EnumInjectServiceToken } from '@common/enums';
import { Coupon, OrderCoupon } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderCouponService } from './services';
import { CouponService } from './services/coupon.service';

const adapters = [
  {
    provide: EnumInjectServiceToken.COUPON_SERVICE,
    useClass: CouponService,
  },
  {
    provide: EnumInjectServiceToken.ORDER_COUPON_SERVICE,
    useClass: OrderCouponService,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([Coupon, OrderCoupon])],
  controllers: [],
  providers: [...adapters],
  exports: [...adapters],
})
export class CouponModule {}
