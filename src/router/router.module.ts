import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { RouterModule as NestJsRouterModule } from '@nestjs/core';

import { HTTP_ENABLE } from 'environments';

import { RoutesAdminModule } from './routes/routes.admin.module';
import { RoutesCallbackModule } from './routes/routes.callback.module';
import { RoutesHealthModule } from './routes/routes.health.module';
import { RoutesInternalModule } from './routes/routes.internal.module';
import { RoutesPublicModule } from './routes/routes.public.module';
import { RoutesTestModule } from './routes/routes.test.module';
import { RoutesUserModule } from './routes/routes.user.module';

@Module({})
export class RouterModule {
  static forRoot(): DynamicModule {
    const imports: (
      | DynamicModule
      | Type
      | Promise<DynamicModule>
      | ForwardReference
    )[] = [];

    if (HTTP_ENABLE) {
      imports.push(
        RoutesHealthModule,
        RoutesPublicModule,
        RoutesAdminModule,
        RoutesUserModule,
        RoutesTestModule,
        RoutesCallbackModule,
        RoutesInternalModule,
        NestJsRouterModule.register([
          {
            path: '/health',
            module: RoutesHealthModule,
          },
          {
            path: '/',
            module: RoutesUserModule,
          },
          {
            path: '/test',
            module: RoutesTestModule,
          },
          {
            path: '/public',
            module: RoutesPublicModule,
          },
          {
            path: '/admin',
            module: RoutesAdminModule,
          },
          {
            path: '/callback',
            module: RoutesCallbackModule,
          },
          {
            path: '/internal',
            module: RoutesInternalModule,
          },
        ]),
      );
    }

    return {
      module: RouterModule,
      providers: [],
      exports: [],
      controllers: [],
      imports,
    };
  }
}
