'use client';

import type { AuthState } from '@auth-toolkit/core';
import React, { useEffect, useMemo, useState } from 'react';

import type { AuthContextType } from '../context/AuthContext';
import { AuthContext } from '../context/AuthContext';

export interface AuthManagerLike<User = unknown> {
  getState(): { status: AuthState<User>['status']; user: User | null };
  subscribe(
    listener: (state: { status: AuthState<User>['status']; user: User | null }) => void
  ): () => void;
  login(user: User, token: string): Promise<void>;
  logout(): void;
  refresh(): Promise<string>;
  bootstrapAuth(): Promise<void>;
  getTokenStore(): {
    getAccessToken(): string | null;
    setAccessToken(token: string): void;
    clear(): void;
  };
  storeReturnTo(path: string): void;
  getReturnTo(): string;
  consumeReturnTo(): string;
  clearReturnTo(): void;
}

export interface AuthProviderProps<User = unknown> {
  authManager: AuthManagerLike<User>;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

let bootstrapPromise: Promise<void> | null = null;
let bootstrapAuthManager: AuthManagerLike | null = null;

function AuthProviderInner<User = unknown>({ authManager, children }: AuthProviderProps<User>) {
  const initialState = authManager.getState();

  const [status, setStatus] = useState<AuthState<User>['status']>(
    initialState.status === 'unknown' ? 'loading' : initialState.status
  );
  const [user, setUser] = useState<User | null>(initialState.user ?? null);

  if (bootstrapAuthManager !== authManager) {
    bootstrapAuthManager = authManager;
    bootstrapPromise = authManager.bootstrapAuth();
  }

  if (bootstrapPromise && initialState.status === 'unknown') {
    throw bootstrapPromise;
  }

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = authManager.subscribe((state: AuthState<User>) => {
      if (!isMounted) return;
      setStatus(state.status);
      setUser(state.user);
    });

    if (initialState.status !== 'unknown') {
      return () => {
        isMounted = false;
        unsubscribe();
      };
    }

    bootstrapPromise?.then(() => {
      if (!isMounted) return;
      const latestState = authManager.getState();
      setStatus(latestState.status);
      setUser(latestState.user);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [authManager, initialState.status]);

  const value = useMemo(
    () => ({
      status,
      user,
      login: (user: User, token: string) => authManager.login(user, token),
      logout: () => authManager.logout(),
      refresh: () => authManager.refresh(),
      getTokenStore: () => authManager.getTokenStore(),
      storeReturnTo: (path: string) => authManager.storeReturnTo(path),
      getReturnTo: () => authManager.getReturnTo(),
      consumeReturnTo: () => authManager.consumeReturnTo(),
      clearReturnTo: () => authManager.clearReturnTo(),
    }),
    [status, user, authManager]
  );

  return <AuthContext.Provider value={value as AuthContextType}>{children}</AuthContext.Provider>;
}

export function AuthProvider<User = unknown>({
  authManager,
  children,
  fallback,
}: AuthProviderProps<User>) {
  return (
    <React.Suspense fallback={fallback ?? null}>
      <AuthProviderInner authManager={authManager}>{children}</AuthProviderInner>
    </React.Suspense>
  );
}
