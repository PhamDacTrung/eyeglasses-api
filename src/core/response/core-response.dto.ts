import { PageDto } from '@common/paginations';
import { Expose, Type } from 'class-transformer';
import { ICorePaginateResult, ICoreResponse } from './core-response.interface';

export class CoreResponse implements ICoreResponse {
  @Expose()
  status?: boolean;

  @Expose()
  statusCode?: number;

  @Expose()
  message?: string;

  @Expose()
  data?: unknown;

  @Expose()
  excel?: {
    name: string;
    data: Record<string, unknown>[];
    customHeaders?: string[];
  };

  @Expose()
  docs?: unknown;
}

// ! There are some issues with the paginated response but I still can't figure out what it is
// ! I'm not sure if it's the class-transformer or the interceptor that's causing the issue
// ! This class maybe wrong
export class CorePaginateResult implements ICorePaginateResult {
  @Expose()
  status?: boolean;

  @Expose()
  statusCode: number;

  @Expose()
  message?: string;

  @Expose()
  @Type(() => PageDto)
  data?: PageDto<unknown>;
}
