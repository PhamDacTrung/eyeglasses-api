// Use this route for user services

import { UserController } from '@modules/user/controllers';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UserController],
  providers: [],
  exports: [],
  imports: [UserModule],
})
export class RoutesUserModule {}
