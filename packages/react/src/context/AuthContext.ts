import { createContext } from "react";
import type { AuthState, TokenStore } from "@auth-toolkit/core";

export interface AuthContextValue<User = unknown>
  extends AuthState<User> {
  login: (user: User, token: string) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<string>;
  getTokenStore: () => TokenStore;
}

export const AuthContext = createContext<AuthContextValue<unknown> | undefined>(
  undefined
);
