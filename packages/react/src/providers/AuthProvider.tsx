"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AuthContext, AuthContextValue } from "../context/AuthContext";
import type { AuthManager, AuthState } from "../types/core";

export interface AuthProviderProps<User = unknown> {
  authManager: AuthManager<User>;
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
      login: authManager.login.bind(authManager),
      logout: authManager.logout.bind(authManager),
      refresh: authManager.refresh.bind(authManager),
    }),
    [status, user, authManager]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}