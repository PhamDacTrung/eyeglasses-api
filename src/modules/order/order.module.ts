import { EnumInjectServiceToken } from '@common/enums';
import { CartItem, Order, OrderItem, Product, UserAddress } from '@entities';
import { CouponModule } from '@modules/coupon/coupon.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './services/order.service';

const Adapters = [
  {
    provide: EnumInjectServiceToken.ORDER_SERVICE,
    useClass: OrderService,
  },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderItem,
      Product,
      CartItem,
      UserAddress,
    ]),

    CouponModule,
  ],
  controllers: [],
  providers: [...Adapters],
  exports: [...Adapters],
})
export class OrderModule {}
