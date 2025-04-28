import { EnumInjectServiceToken } from '@common/enums';
import { AuthConfig } from '@config';
import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthPasswordService } from './services';
import { JwtStrategy } from './strategies';

const Adapters = [
  {
    provide: EnumInjectServiceToken.AUTH_SERVICE,
    useClass: AuthPasswordService,
  },
];

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      inject: [AuthConfig.KEY],
      useFactory: (authConfig: ConfigType<typeof AuthConfig>) => {
        const { jwtSecret, accessTokenExpiration } = authConfig;
        return {
          secret: jwtSecret,
          signOptions: {
            expiresIn: parseInt(accessTokenExpiration, 10),
          },
        };
      },
    }),
  ],
  providers: [...Adapters, JwtStrategy],
  exports: [...Adapters],
})
export class AuthModule {}
