import { HealthController } from '@modules/health/health.controller';
import { HealthModule } from '@modules/health/health.module';
import { Module } from '@nestjs/common';

@Module({
  controllers: [HealthController],
  providers: [],
  exports: [],
  imports: [HealthModule],
})
export class RoutesHealthModule {}
