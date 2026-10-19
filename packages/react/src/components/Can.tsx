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