"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { loadCoreModule } from "../utils/core-loader";
import type { AuthUser } from "../types/core-exports";


type CanChecker = (
  user: AuthUser | null,
  action: string,
  resource: string,
  resolver?: (user: AuthUser, action: string, resource: string) => boolean
) => boolean;

let cachedCanFn: CanChecker | null = null;
let loadPromise: Promise<void> | null = null;


function loadCanFn(): Promise<void> {
  if (cachedCanFn) {
    return Promise.resolve();
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = loadCoreModule()
    .then((core) => {
      cachedCanFn = core.can;
    })
    .catch(() => {
      cachedCanFn = () => false;
    });

  return loadPromise;
}

export interface CanProps {
  
  action: string;

 
  resource: string;

  
  fallback?: React.ReactNode;

  resolver?: (user: AuthUser, action: string, resource: string) => boolean;

  
  children: React.ReactNode;
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
  const [isReady, setIsReady] = useState(!!cachedCanFn);

  useEffect(() => {
    let cancelled = false;

    loadCanFn()
      .then(() => {
        if (!cancelled) {
          setIsReady(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setIsReady(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // If the can function is not loaded yet, render nothing
  if (!isReady || !cachedCanFn) {
    return null;
  }

  const hasPermission = cachedCanFn(
    user as AuthUser | null,
    action,
    resource,
    resolver
  );

  if (!hasPermission) {
    return fallback as React.ReactElement | null;
  }

  return children as React.ReactElement;
}

export type { AuthUser };
