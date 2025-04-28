// Use this route for system admin

import { UserAdminController } from '@modules/user/controllers/user.admin.controller';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UserAdminController],
  providers: [],
  exports: [],
  imports: [UserModule],
})
export class RoutesAdminModule {}
