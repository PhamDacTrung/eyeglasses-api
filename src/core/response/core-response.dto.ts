import { Expose } from 'class-transformer';
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
export class CorePaginateResult implements ICorePaginateResult {
  @Expose()
  status?: boolean;

  @Expose()
  statusCode: number;

  @Expose()
  data?: {
    list?: unknown;
    total?: number;
    pages?: number;
    hasNextPage?: boolean;
    encKey?: string;
  } | null;

  @Expose()
  message: string;
}
