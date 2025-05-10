import { PageDto } from '@common/paginations';

export interface ICorePaginateResult {
  status?: boolean;
  statusCode: number;
  data?: PageDto<unknown>;
  message?: string;
}

export interface ICoreResponse {
  status?: boolean;
  statusCode?: number;
  data?: unknown;
  message?: string;
  excel?: {
    name: string;
    data: Record<string, unknown>[];
    customHeaders?: string[];
  };
  docs?: unknown;
}
