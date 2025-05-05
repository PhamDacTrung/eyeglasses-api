import { HttpException, HttpStatus } from '@nestjs/common';

import { IFetchDtoResponse } from 'src/common/http';

export class Exception extends HttpException {
  constructor(statusCode: HttpStatus, message: string, data?: unknown) {
    super(message, statusCode, data as object);
  }
}

export class BadRequestException extends Exception {
  constructor(message: string, data?: unknown) {
    super(HttpStatus.BAD_REQUEST, message, data);
  }
}

export class UnauthorizedException extends Exception {
  constructor(message: string, data?: unknown) {
    super(HttpStatus.UNAUTHORIZED, message, data);
  }
}

export class ForbiddenException extends Exception {
  constructor(message: string, data?: unknown) {
    super(HttpStatus.FORBIDDEN, message, data);
  }
}

export class NotFoundException extends Exception {
  constructor(message: string, data?: unknown) {
    super(HttpStatus.NOT_FOUND, message, data);
  }
}

export class InternalServerError extends Exception {
  constructor(message: string, data?: unknown) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, message, data);
  }
}

export class ConflictException extends Exception {
  constructor(message: string, data?: unknown) {
    super(HttpStatus.CONFLICT, message, data);
  }
}

export class NotImplementedException extends Exception {
  constructor(message: string, data?: unknown) {
    super(HttpStatus.NOT_IMPLEMENTED, message, data);
  }
}

export class UnprocessableEntityException extends Exception {
  constructor(message: string, data?: unknown) {
    super(HttpStatus.UNPROCESSABLE_ENTITY, message, data);
  }
}

export class ExternalServiceException extends Exception {
  private static readonly defaultMessage = 'Error in external service';

  constructor(response: IFetchDtoResponse<unknown>) {
    super(
      response.statusCode,
      response.message || ExternalServiceException.defaultMessage,
    );
  }
}

export class ExceptionHandler {
  static handleErrorException(error: unknown, message?: string): never {
    if (error instanceof Exception) {
      throw error;
    }

    const errorMessage =
      message ??
      (error instanceof Error ? error.message : 'Internal server error');

    throw new InternalServerError('Internal server error', {
      cause: error,
      description: errorMessage,
    });
  }
}
