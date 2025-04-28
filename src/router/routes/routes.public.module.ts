// Use this route for public services
// such as: login, register, etc.

import { AuthModule } from '@modules';
import { AuthController } from '@modules/auth/auth.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AuthController],
  providers: [],
  exports: [],
  imports: [AuthModule],
})
export class RoutesPublicModule {}
