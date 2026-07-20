/**
 * Lazy loader for @auth-toolkit/core exports.
 * 
 * This module provides a typed wrapper around the dynamic import of @auth-toolkit/core.
 * The actual module will be available at runtime once the other intern's PR is merged.
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
  // Dynamic import - will resolve to @auth-toolkit/core at runtime
  // @ts-expect-error - @auth-toolkit/core will be available when the other intern's PR is merged
  const core = await import("@auth-toolkit/core");
  return core as unknown as CoreModule;
}
