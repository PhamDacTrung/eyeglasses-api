import { CoreTransformInterceptor } from '@core/interceptors';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { setupSwagger } from '@utilities/swagger.util';
import { PORT } from 'environments';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { Logger } from 'winston';
import { AppModule } from './app.module';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Setup Swagger documentation
  setupSwagger(app);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: '*',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: true,
      transform: true,
    }),
  );

  // First, apply our custom interceptor which formats the response
  // Then apply the ClassSerializerInterceptor for the other responses
  app.useGlobalInterceptors(
    new CoreTransformInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true,
      exposeUnsetFields: true,
      strategy: 'excludeAll',
      enableImplicitConversion: false,
      exposeDefaultValues: false,
      enableCircularCheck: true,
    }),
  );

  await app.listen(PORT);

  // Get the Winston logger instance
  const logger = app.get(WINSTON_MODULE_PROVIDER) as Logger;
  logger.info(`🚀 Server is running on port ${PORT}`);
}
bootstrap();
