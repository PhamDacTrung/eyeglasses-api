import { EnumInjectServiceToken } from '@common/enums';
import { Cart, CartItem, Product } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemService, CartService } from './services';

const Adapters = [
  {
    provide: EnumInjectServiceToken.CART_SERVICE,
    useClass: CartService,
  },

  {
    provide: EnumInjectServiceToken.CART_ITEM_SERVICE,
    useClass: CartItemService,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItem, Product])],
  providers: [...Adapters],
  exports: [...Adapters],
})
export class CartModule {}
