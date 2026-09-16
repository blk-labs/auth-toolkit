declare type BaseBackendResponse<T = unknown, Z = unknown> = {
  data?: T;
  message?: string;
} & Z;
