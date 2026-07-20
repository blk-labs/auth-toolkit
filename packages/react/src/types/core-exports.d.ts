/**
 * Type declarations for @auth-toolkit/core module.
 *
 * These types define the interface that the React package expects from the core.
 * The actual implementation is provided  /packages/core.
 *
 * Expected exports from @auth-toolkit/core 
 * - AuthManager class (already exists in core/src/index.ts)
 * - can() - RBAC permission checker 
 * - hasRole() - single role checker 
 * - hasAnyRole() - multiple role checker
 * - createHttpClient() - HTTP client factory 
 * - TokenStore implementations (MemoryTokenStore, WebStorageTokenStore )
 */


export interface AuthUser {
  id: string;
  roles?: string[];
  permissions?: string[];
  [key: string]: unknown;
}


export interface HttpClient {
  get: <T = unknown>(url: string, config?: RequestInit) => Promise<T>;
  post: <T = unknown>(
    url: string,
    body?: unknown,
    config?: RequestInit
  ) => Promise<T>;
  put: <T = unknown>(
    url: string,
    body?: unknown,
    config?: RequestInit
  ) => Promise<T>;
  del: <T = unknown>(url: string, config?: RequestInit) => Promise<T>;
}


export type CanFunction = (
  user: AuthUser | null,
  action: string,
  resource: string,
  resolver?: (user: AuthUser, action: string, resource: string) => boolean
) => boolean;


export type CreateHttpClientFunction = (options: {
  getAccessToken: () => string | null;
  onLogout: () => void;
}) => HttpClient;


declare module "@auth-toolkit/core" {
  export { AuthUser };
  export const can: CanFunction;
  export const hasRole: (user: AuthUser | null, role: string) => boolean;
  export const hasAnyRole: (
    user: AuthUser | null,
    roles: string[]
  ) => boolean;
  export const createHttpClient: CreateHttpClientFunction;
}
