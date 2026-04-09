
// temporary AuthManager definition for type safety in React package
// actual implementation is provided by @auth-toolkit/core at runtime
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

export class AuthManager<User = unknown> {
  getState(): AuthState<User> {
    throw new Error("Not implemented — provided by @auth-toolkit/core");
  }

  subscribe(_listener: AuthListener<User>): () => void {
    throw new Error("Not implemented — provided by @auth-toolkit/core");
  }

  async login(_user: User): Promise<void> {
    throw new Error("Not implemented — provided by @auth-toolkit/core");
  }

  logout(): void {
    throw new Error("Not implemented — provided by @auth-toolkit/core");
  }

  async refresh(): Promise<void> {
    throw new Error("Not implemented — provided by @auth-toolkit/core");
  }

  async bootstrapAuth(): Promise<void> {
    throw new Error("Not implemented — provided by @auth-toolkit/core");
  }
}
