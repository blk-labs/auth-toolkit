import { createContext } from "react";
import type { AuthState } from "../types/core";

export interface AuthContextValue<User = unknown>
  extends AuthState<User> {
  login: () => Promise<void> | void;
  logout: () => Promise<void> | void;
  refresh: () => Promise<void> | void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);