// Use this route for user services

import { CartModule } from '@modules/cart/cart.module';
import { CartItemController } from '@modules/cart/controllers/cart-item.controller';
import { CartController } from '@modules/cart/controllers/cart.controller';
import { OrderController } from '@modules/order/controllers/order.controller';
import { OrderModule } from '@modules/order/order.module';
import { ProductController } from '@modules/product/controllers';
import { ProductModule } from '@modules/product/product.module';
import { UserController } from '@modules/user/controllers';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  controllers: [
    UserController,
    ProductController,
    CartController,
    CartItemController,
    OrderController,
  ],
  providers: [],
  exports: [],
  imports: [UserModule, ProductModule, CartModule, OrderModule],
})
export class RoutesUserModule {}
