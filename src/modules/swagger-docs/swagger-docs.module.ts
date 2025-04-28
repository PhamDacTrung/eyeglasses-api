import { Module } from '@nestjs/common';
import { SwaggerDocsController } from './swagger-docs.controller';

@Module({
  controllers: [SwaggerDocsController],
})
export class SwaggerDocsModule {}
