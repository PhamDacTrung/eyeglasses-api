import { EnumInjectServiceToken } from '@common/enums';
import { CartItem, Order, OrderItem, Product } from '@entities';
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
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Product, CartItem])],
  controllers: [],
  providers: [...Adapters],
  exports: [...Adapters],
})
export class OrderModule {}
