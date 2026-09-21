import { createContext } from "react";

export type AuthStatus =
  | "unknown"
  | "loading"
  | "authenticated"
  | "unauthenticated";

export interface AuthState<User = unknown> {
  status: AuthStatus;
  user: User | null;
}

export interface AuthContextValue<User = unknown>
  extends AuthState<User> {
  login: (user: User, token: string) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<string>;
}

export const AuthContext = createContext<AuthContextValue<unknown> | undefined>(
  undefined
);
