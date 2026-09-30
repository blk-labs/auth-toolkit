import { createContext } from "react";
import type { AuthState, TokenStore } from "@auth-toolkit/core";

export interface AuthContextValue<User = unknown>
  extends AuthState<User> {
  login: (user: User, token: string) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<string>;
  getTokenStore: () => TokenStore;
}

// Use a type that accepts any User type - the context value is covariant in User
export type AuthContextType = AuthContextValue<unknown> | undefined;

export const AuthContext = createContext<AuthContextType>(undefined);

// Type helper for provider value
export type AuthProviderValue<User = unknown> = AuthContextValue<User>;
