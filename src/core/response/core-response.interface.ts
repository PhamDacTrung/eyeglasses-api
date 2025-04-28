export interface ICorePaginateResult {
  status?: boolean;
  statusCode: number;
  data?: {
    list?: unknown;
    total?: number;
    pages?: number;
    hasNextPage?: boolean;
    encKey?: string;
  } | null;
  message: string;
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
