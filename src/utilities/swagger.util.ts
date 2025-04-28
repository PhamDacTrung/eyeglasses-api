import { SwaggerDocsController } from '@modules/swagger-docs/swagger-docs.controller';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PROJECT_NAME } from 'environments';

export function setupSwagger(app: INestApplication) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle(`${PROJECT_NAME} Backend API`)
    .setDescription(`${PROJECT_NAME} Backend API description`)
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();

  // Create documents with filtered paths
  const fullDocument = SwaggerModule.createDocument(app, swaggerConfig);

  // Setup routes for different swagger docs
  SwaggerModule.setup('api', app, fullDocument);
  SwaggerDocsController.setSwaggerDoc(fullDocument);
}
