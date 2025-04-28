import { configurations, LogConfig } from '@config';
import { HttpExceptionFilter } from '@core/exceptions';
import { Infrastructure } from '@infrastructure';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { RouterModule } from '@router/router.module';
import {
  WINSTON_MODULE_PROVIDER,
  WinstonModule,
  WinstonModuleOptions,
} from 'nest-winston';
import { Logger } from 'winston';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: configurations,
      cache: true,
    }),

    WinstonModule.forRootAsync({
      inject: [LogConfig.KEY],
      useFactory: (config: ConfigType<typeof LogConfig>) => {
        return config as WinstonModuleOptions;
      },
    }),

    RouterModule.forRoot(),
    ...Infrastructure,
    UserModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useFactory: (logger: Logger) => new HttpExceptionFilter(logger),
      inject: [WINSTON_MODULE_PROVIDER],
    },
  ],
})
export class AppModule {}
