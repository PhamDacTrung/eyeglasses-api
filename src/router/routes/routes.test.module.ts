// Use this route for testing

import { Module } from '@nestjs/common';

import { DevModeController } from '@modules/dev-mode/controllers';
import { DevModeModule } from '@modules/dev-mode/dev-mode.module';
import { NODE_ENV } from 'environments';

@Module({
  controllers: NODE_ENV === 'production' ? [] : [DevModeController],
  imports: [DevModeModule.register()],
})
export class RoutesTestModule {}
