import { CorePaginateResult, CoreResponse } from '@core/response';
import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CoreTransformInterceptor
  implements NestInterceptor<CorePaginateResult>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<CoreResponse> {
    return next.handle().pipe(
      map((result: CoreResponse) => {
        // const request: Request = context.switchToHttp().getRequest();
        const respStatus = true;
        const respMessage = 'success';
        const respStatusCode = HttpStatus.OK;

        if (result) {
          const data = result;
          if (typeof result.docs != 'undefined') {
            return plainToInstance(CoreResponse, {
              status: respStatus,
              statusCode: respStatusCode,
              message: respMessage,
              data,
            });
          } else {
            return plainToInstance(CoreResponse, {
              status: respStatus,
              statusCode: respStatusCode,
              message: respMessage,
              data,
            });
          }
        } else {
          return plainToInstance(CoreResponse, {
            status: respStatus,
            statusCode: respStatusCode,
            message: respMessage,
            data: null,
          });
        }
      }),
    );
  }
}
