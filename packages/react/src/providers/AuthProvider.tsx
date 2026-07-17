"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AuthContext, AuthContextValue } from "../context/AuthContext";
import type { AuthState } from "../context/AuthContext";


export interface AuthManagerLike<User = unknown> {
  getState(): { status: AuthState<User>["status"]; user: User | null };
  subscribe(listener: (state: { status: AuthState<User>["status"]; user: User | null }) => void): () => void;
  login(user: User): Promise<void>;
  logout(): void;
  refresh(): Promise<void>;
  bootstrapAuth(): Promise<void>;
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

  const [status, setStatus] = useState(initialState.status);
  const [user, setUser] = useState<User | null>(initialState.user);

  useEffect(() => {
    const unsubscribe = authManager.subscribe((state: AuthState<User>) => {
      setStatus(state.status);
      setUser(state.user);
    });

    authManager.bootstrapAuth();

    return unsubscribe;
  }, [authManager]);

  const value: AuthContextValue<User> = useMemo(
    () => ({
      status,
      user,
      login: (user?: User) => authManager.login(user!),
      logout: () => authManager.logout(),
      refresh: () => authManager.refresh(),
    }),
    [status, user, authManager]
  );

  return <AuthContext.Provider value={value as AuthContextValue<unknown>}>{children}</AuthContext.Provider>;
}