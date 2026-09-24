/**
 * Lazy loader for @auth-toolkit/core exports.
 * 
 * This module provides a typed wrapper around the dynamic import of @auth-toolkit/core.
 * The core package is a workspace dependency of the React package.
 * 
 * @module @auth-toolkit/core-loader
 */

import type {
  AuthUser,
  HttpClient,
  CanFunction,
  CreateHttpClientFunction,
} from "../types/core-exports";

/**
 * The shape of the @auth-toolkit/core module.
 */
export interface CoreModule {
  can: CanFunction;
  hasRole: (user: AuthUser | null, role: string) => boolean;
  hasAnyRole: (user: AuthUser | null, roles: string[]) => boolean;
  createHttpClient: CreateHttpClientFunction;
}

/**
 * Lazily load the @auth-toolkit/core module.
 * Returns the core module exports with proper typing.
 */
export async function loadCoreModule(): Promise<CoreModule> {
  const core = await import("@auth-toolkit/core");
  return core as unknown as CoreModule;
}
