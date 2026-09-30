"use client";

import React, { useEffect, useState, type PropsWithChildren } from "react";
import { useAuth } from "../hooks/useAuth";
import { can, hasRole, hasAnyRole, type AuthUser } from "@auth-toolkit/core";

export interface CanProps extends PropsWithChildren {
  action: string;
  resource: string;
  fallback?: React.ReactNode;
  resolver?: (user: AuthUser, action: string, resource: string) => boolean;
} 

/**
 * Can - RBAC Permission Component
 *
 * Conditionally renders children based on the current user's permissions.
 * Uses the `can()` function from @auth-toolkit/core under the hood.
 *
 * @example
 * ```tsx
 * <Can action="read" resource="document">
 *   <DocumentViewer />
 * </Can>
 *
 * <Can action="write" resource="document" fallback={<ReadOnlyBadge />}>
 *   <DocumentEditor />
 * </Can>
 *
 * <Can action="admin" resource="settings" resolver={customCheck}>
 *   <SettingsPanel />
 * </Can>
 * ```
 */
export function Can({
  action,
  resource,
  fallback = null,
  resolver,
  children,
}: CanProps): React.ReactElement | null {
  const { user } = useAuth<AuthUser>();

  const hasPermission = can(user as AuthUser | null, action, resource, resolver);

  if (!hasPermission) {
    return fallback as React.ReactElement | null;
  }

  return children as React.ReactElement;
}

export type { AuthUser };