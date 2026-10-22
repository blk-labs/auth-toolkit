import type { AuthUser as CoreAuthUser, CanFunction as CoreCanFunction } from '@auth-toolkit/core';
import type {
  HttpClient as CoreHttpClient,
  CreateHttpClientFunction as CoreCreateHttpClientFunction,
} from '@auth-toolkit/core';

export type AuthUser = CoreAuthUser;
export type CanFunction = CoreCanFunction;
export type HttpClient = CoreHttpClient;
export type CreateHttpClientFunction = CoreCreateHttpClientFunction;
