'use client';

import { useEffect } from 'react';

import { useAuth } from '../hooks/useAuth';
import { navigate, getCurrentPath } from '../utils/navigation';

export interface RequireAuthProps {
  children: React.ReactNode;
  redirectTo?: string;
  loading?: React.ReactNode;
}

/**
 * RequireAuth - Route Protection Component
 *
 * Redirects unauthenticated users to the login page and stores the intended
 * destination using the AuthManager's returnTo mechanism. After login, the
 * destination can be restored using the `useAuthRedirect` hook.
 *
 * @example
 * ```tsx
 * <RequireAuth>
 *   <Dashboard />
 * </RequireAuth>
 *
 * <RequireAuth redirectTo="/sign-in">
 *   <Settings />
 * </RequireAuth>
 * ```
 */
export function RequireAuth({
  children,
  redirectTo = '/login',
  loading = null,
}: RequireAuthProps): React.ReactElement | null {
  const { user, status, storeReturnTo } = useAuth();

  const isAuthenticated = status === 'authenticated' && user;
  const isLoading = status === 'loading' || status === 'unknown';

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      const currentPath = getCurrentPath();
      const isOnLoginPage =
        currentPath === redirectTo ||
        currentPath === redirectTo + '/' ||
        currentPath.startsWith(redirectTo + '?');

      if (!isOnLoginPage) {
        storeReturnTo(currentPath);
        navigate(redirectTo);
      }
    }
  }, [isAuthenticated, isLoading, redirectTo, storeReturnTo]);

  if (isLoading) {
    return loading as React.ReactElement | null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return children as React.ReactElement;
}
