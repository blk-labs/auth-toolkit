"use client";

import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { navigate, getCurrentPath } from "../utils/navigation";

export interface RequireGuestProps {
  
  children: React.ReactNode;

  redirectTo?: string;

  loading?: React.ReactNode;
}

/**
 * RequireGuest - Guest-Only Route Protection Component
 *
 * Redirects authenticated users away from guest-only pages (e.g., login, register).
 * Default redirect is to /dashboard, but can be customized.
 *
 * @example
 * ```tsx
 * <RequireGuest>
 *   <LoginPage />
 * </RequireGuest>
 *
 * <RequireGuest redirectTo="/home">
 *   <RegisterPage />
 * </RequireGuest>
 * ```
 */
export function RequireGuest({
  children,
  redirectTo = "/dashboard",
  loading = null,
}: RequireGuestProps): React.ReactElement | null {
  const { user, status } = useAuth();

  const isAuthenticated = status === "authenticated" && user !== null;
  const isLoading = status === "loading" || status === "unknown";

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (isAuthenticated) {
      const currentPath = getCurrentPath();
      const isOnTargetPage =
        currentPath === redirectTo ||
        currentPath === redirectTo + "/" ||
        currentPath.startsWith(redirectTo + "?");

      if (!isOnTargetPage) {
        navigate(redirectTo);
      }
    }
  }, [isAuthenticated, isLoading, redirectTo]);

  if (isLoading) {
    return loading as React.ReactElement | null;
  }

  if (isAuthenticated) {
    return null;
  }

  return children as React.ReactElement;
}
