import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('swagger-docs')
export class SwaggerDocsController {
  private static swaggerDoc: any = null;

  @Get()
  @ApiOperation({ summary: 'Get OpenAPI/Swagger documentation in JSON format' })
  @ApiResponse({
    status: 200,
    description:
      'Returns the complete API documentation in OpenAPI/Swagger format',
  })
  getSwaggerJson() {
    return SwaggerDocsController.swaggerDoc;
  }

  // Method to update the swagger document
  static setSwaggerDoc(doc: any) {
    SwaggerDocsController.swaggerDoc = doc;
  }
}
