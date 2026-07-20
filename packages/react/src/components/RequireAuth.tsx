"use client";

import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { navigate, getCurrentPath, isCurrentPath } from "../utils/navigation";

const INTENDED_ROUTE_KEY = "auth-toolkit.intendedRoute";

export interface RequireAuthProps {
 
  children: React.ReactNode;

  redirectTo?: string;

  loading?: React.ReactNode;
}

/**
 * RequireAuth - Route Protection Component
 *
 * Redirects unauthenticated users to the login page and stores the intended
 * destination in sessionStorage. After login, the destination can be restored
 * using the `useAuthRedirect` hook.
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
  redirectTo = "/login",
  loading = null,
}: RequireAuthProps): React.ReactElement | null {
  const { user, status } = useAuth();

  const isAuthenticated = status === "authenticated" && user !== null;
  const isLoading = status === "loading" || status === "unknown";

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      const currentPath = getCurrentPath();
      const isOnLoginPage =
        currentPath === redirectTo ||
        currentPath === redirectTo + "/" ||
        currentPath.startsWith(redirectTo + "?");

      if (!isOnLoginPage) {
        if (typeof window !== "undefined" && window.sessionStorage) {
          try {
            window.sessionStorage.setItem(INTENDED_ROUTE_KEY, currentPath);
          } catch {
          }
        }

        // Redirect to login
        navigate(redirectTo);
      }
    }
  }, [isAuthenticated, isLoading, redirectTo]);

  if (isLoading) {
    return loading as React.ReactElement | null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return children as React.ReactElement;
}
