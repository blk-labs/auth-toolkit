/**
 * useAuthRedirect Hook
 *
 * Provides imperative redirect utilities for authentication flows.
 * Uses the AuthManager's returnTo mechanism to persist the intended destination route
 * and restores it after successful login.
 *
 * @example
 * ```tsx
 * const { redirectAfterLogin, redirectTo, redirectAfterLogout, consumeReturnTo } = useAuthRedirect();
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

import { useCallback } from 'react';

import { navigate, getCurrentPath } from '../utils/navigation';

import { useAuth } from './useAuth';

export interface UseAuthRedirectReturn {
  redirectAfterLogin: (defaultPath?: string) => void;
  redirectTo: (path: string) => void;
  redirectAfterLogout: () => void;
  consumeReturnTo: () => string;
}

export function useAuthRedirect(): UseAuthRedirectReturn {
  const { storeReturnTo, consumeReturnTo, clearReturnTo } = useAuth();

  const redirectAfterLogin = useCallback(
    (_defaultPath = '/'): void => {
      const currentPath = getCurrentPath();
      if (currentPath) {
        storeReturnTo(currentPath);
      }
      navigate('/login');
    },
    [storeReturnTo]
  );

  const redirectTo = useCallback((path: string): void => {
    navigate(path);
  }, []);

  const redirectAfterLogout = useCallback((): void => {
    clearReturnTo();
    navigate('/login');
  }, [clearReturnTo]);

  return {
    redirectAfterLogin,
    redirectTo,
    redirectAfterLogout,
    consumeReturnTo,
  };
}
