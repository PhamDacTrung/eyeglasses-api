// Use this route for system admin

import { OrderAdminController } from '@modules/order/controllers/order.admin.controller';
import { OrderModule } from '@modules/order/order.module';
import { ProductAdminController } from '@modules/product/controllers';
import { ProductModule } from '@modules/product/product.module';
import { UserAdminController } from '@modules/user/controllers/user.admin.controller';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  controllers: [
    UserAdminController,
    ProductAdminController,
    OrderAdminController,
  ],
  providers: [],
  exports: [],
  imports: [UserModule, ProductModule, OrderModule],
})
export class RoutesAdminModule {}
