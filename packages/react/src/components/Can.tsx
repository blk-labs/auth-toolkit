'use client';

import { can, type AuthUser } from '@auth-toolkit/core';
import type React from 'react';
import { type PropsWithChildren } from 'react';

import { useAuth } from '../hooks/useAuth';

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
