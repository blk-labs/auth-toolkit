/**
 * useAuthRedirect Hook
 *
 * Provides imperative redirect utilities for authentication flows.
 * Uses sessionStorage to persist the intended destination route
 * and restores it after successful login.
 *
 * @example
 * ```tsx
 * const { redirectAfterLogin, redirectTo, redirectAfterLogout } = useAuthRedirect();
 *
 * // Store intended destination and redirect to login
 * redirectAfterLogin('/dashboard');
 *
 * // Direct redirect
 * redirectTo('/settings');
 *
 * // Clear session and redirect
 * redirectAfterLogout();
 * ```
 */

import { useCallback } from "react";
import { navigate, getCurrentPath } from "../utils/navigation";

const INTENDED_ROUTE_KEY = "auth-toolkit.intendedRoute";

export interface UseAuthRedirectReturn {
  
  redirectAfterLogin: (defaultPath?: string) => void;

  redirectTo: (path: string) => void;

  redirectAfterLogout: () => void;

  consumeIntendedRoute: () => string | null;
}


function storeIntendedRoute(path: string): void {
  if (typeof window !== "undefined" && window.sessionStorage) {
    try {
      window.sessionStorage.setItem(INTENDED_ROUTE_KEY, path);
    } catch {
    }
  }
}


function consumeIntendedRoute(): string | null {
  if (typeof window !== "undefined" && window.sessionStorage) {
    try {
      const route = window.sessionStorage.getItem(INTENDED_ROUTE_KEY);
      if (route) {
        window.sessionStorage.removeItem(INTENDED_ROUTE_KEY);
      }
      return route;
    } catch {
      return null;
    }
  }
  return null;
}

export function useAuthRedirect(): UseAuthRedirectReturn {
  const redirectAfterLogin = useCallback((defaultPath = "/"): void => {
    const currentPath = getCurrentPath();
    if (currentPath) {
      storeIntendedRoute(currentPath);
    }
    navigate("/login");
  }, []);

  const redirectTo = useCallback((path: string): void => {
    navigate(path);
  }, []);

  const redirectAfterLogout = useCallback((): void => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      try {
        window.sessionStorage.removeItem(INTENDED_ROUTE_KEY);
      } catch {
      }
    }
    navigate("/login");
  }, []);

  return {
    redirectAfterLogin,
    redirectTo,
    redirectAfterLogout,
    consumeIntendedRoute,
  };
}
