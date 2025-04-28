import { DynamicModule, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthConfig } from '@config';
import { User } from '@entities';
import { NODE_ENV } from 'environments';

import { DevModeService } from './services/dev-mode.service';

@Module({})
export class DevModeModule {
  static register(): DynamicModule {
    // If we're in production, return an empty module
    if (NODE_ENV === 'production') {
      return {
        module: DevModeModule,
      };
    }

    // Otherwise, return the full module configuration
    return {
      module: DevModeModule,
      imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
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
      providers: [DevModeService],
      exports: [DevModeService],
    };
  }
}
