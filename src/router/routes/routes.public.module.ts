// Use this route for public services
// such as: login, register, etc.

import { AuthModule } from '@modules';
import { AuthController } from '@modules/auth/auth.controller';
import { ProductPublicController } from '@modules/product/controllers';
import { ProductModule } from '@modules/product/product.module';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AuthController, ProductPublicController],
  providers: [],
  exports: [],
  imports: [AuthModule, ProductModule],
})
export class RoutesPublicModule {}
