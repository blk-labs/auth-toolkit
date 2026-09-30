"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AuthContext, AuthContextValue, AuthContextType } from "../context/AuthContext";
import type { AuthState } from "@auth-toolkit/core";

export interface AuthManagerLike<User = unknown> {
  getState(): { status: AuthState<User>["status"]; user: User | null };
  subscribe(
    listener: (state: {
      status: AuthState<User>["status"];
      user: User | null;
    }) => void
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
}

export interface AuthProviderProps<User = unknown> {
  authManager: AuthManagerLike<User>;
  children: React.ReactNode;
}

export function AuthProvider<User = unknown>({
  authManager,
  children,
}: AuthProviderProps<User>) {
  const initialState = authManager.getState();

  const [status, setStatus] = useState<AuthState<User>["status"]>(
    initialState.status === "unknown" ? "loading" : initialState.status
  );
  const [user, setUser] = useState<User | null>(initialState.user ?? null);

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = authManager.subscribe((state: AuthState<User>) => {
      if (!isMounted) return;
      setStatus(state.status);
      setUser(state.user);
    });

    authManager.bootstrapAuth().then(() => {
      if (!isMounted) return;
      const latestState = authManager.getState();
      setStatus(latestState.status);
      setUser(latestState.user);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [authManager]);

  const value = useMemo(
    () => ({
      status,
      user,
      login: (user: User, token: string) => authManager.login(user, token),
      logout: () => authManager.logout(),
      refresh: () => authManager.refresh(),
      getTokenStore: () => authManager.getTokenStore(),
    }),
    [status, user, authManager]
  );

  return (
    <AuthContext.Provider value={value as AuthContextType}>
      {children}
    </AuthContext.Provider>
  );
}