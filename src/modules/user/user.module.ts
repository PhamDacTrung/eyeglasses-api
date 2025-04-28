import { EnumInjectServiceToken } from '@common/enums';
import { User, UserInfo } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';

const Adapters = [
  {
    provide: EnumInjectServiceToken.USER_SERVICE,
    useClass: UserService,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([User, UserInfo])],
  controllers: [],
  providers: [...Adapters],
  exports: [...Adapters],
})
export class UserModule {}
