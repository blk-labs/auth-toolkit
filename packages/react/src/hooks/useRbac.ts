'use client';

import { can, hasRole, hasAnyRole, type AuthUser } from '@auth-toolkit/core';
import { useMemo } from 'react';

import { useAuth } from './useAuth';

/**
 * useCan Hook
 *
 * Returns a function to check if the current user has a specific permission.
 *
 * @example
 * ```tsx
 * function DocumentViewer() {
 *   const canRead = useCan("read", "document");
 *
 *   if (!canRead()) {
 *     return <AccessDenied />;
 *   }
 *   return <DocumentContent />;
 * }
 * ```
 */
export function useCan() {
  const { user } = useAuth<AuthUser>();

  const checkPermission = useMemo(
    () =>
      (
        action: string,
        resource: string,
        resolver?: (user: AuthUser, action: string, resource: string) => boolean
      ) => {
        return can(user as AuthUser | null, action, resource, resolver);
      },
    [user]
  );

  return checkPermission;
}

/**
 * useHasRole Hook
 *
 * Returns a function to check if the current user has a specific role.
 *
 * @example
 * ```tsx
 * function AdminPanel() {
 *   const hasAdminRole = useHasRole("admin");
 *
 *   if (!hasAdminRole()) {
 *     return <AccessDenied />;
 *   }
 *   return <AdminContent />;
 * }
 * ```
 */
export function useHasRole() {
  const { user } = useAuth<AuthUser>();

  const checkRole = useMemo(
    () => (role: string) => {
      return hasRole(user as AuthUser | null, role);
    },
    [user]
  );

  return checkRole;
}

/**
 * useHasAnyRole Hook
 *
 * Returns a function to check if the current user has any of the specified roles.
 *
 * @example
 * ```tsx
 * function ManagerDashboard() {
 *   const hasManagerRole = useHasAnyRole(["admin", "manager"]);
 *
 *   if (!hasManagerRole()) {
 *     return <AccessDenied />;
 *   }
 *   return <ManagerContent />;
 * }
 * ```
 */
export function useHasAnyRole() {
  const { user } = useAuth<AuthUser>();

  const checkRoles = useMemo(
    () => (roles: string[]) => {
      return hasAnyRole(user as AuthUser | null, roles);
    },
    [user]
  );

  return checkRoles;
}

export type { AuthUser };
