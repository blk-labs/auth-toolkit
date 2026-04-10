export type AuthStatus =
  | "unknown"
  | "loading"
  | "authenticated"
  | "unauthenticated";

export interface AuthState<User = unknown> {
  status: AuthStatus;
  user: User | null;
}

export type AuthListener<User = unknown> = (state: AuthState<User>) => void;