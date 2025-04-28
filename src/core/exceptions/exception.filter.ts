import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: Logger,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // Combine request and exception details into a single error context object
    const errorContext = {
      timestamp: new Date().toISOString(),
      statusCode: status,
      path: request.url,
      method: request.method,
      headers: request.headers,
      query: request.query,
      errorResponse: exception.getResponse(),
      stack: exception.stack,
    };

    // Log the error with combined context
    this.logger.error(`Request failed: ${exception.message}`, errorContext);

    response.status(status).json({
      statusCode: status,
      error: HttpStatus[status],
      timestamp: new Date().toISOString(),
      path: request.url,
      response: exception.getResponse(),
      message: exception.message,
    });
  }
}
