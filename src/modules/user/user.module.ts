import { EnumInjectServiceToken } from '@common/enums';
import { User, UserAddress, UserInfo } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddressService } from './services';
import { UserService } from './services/user.service';

const Adapters = [
  {
    provide: EnumInjectServiceToken.USER_SERVICE,
    useClass: UserService,
  },
  {
    provide: EnumInjectServiceToken.USER_ADDRESS_SERVICE,
    useClass: UserAddressService,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([User, UserInfo, UserAddress])],
  controllers: [],
  providers: [...Adapters],
  exports: [...Adapters],
})
export class UserModule {}
