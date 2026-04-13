import type { AuthListener, AuthState, TokenStore } from "@auth/types";

export class AuthManager<T = unknown> {
 private tokenStore: TokenStore; 

  constructor(tokenStore: TokenStore) {
    this.tokenStore = tokenStore;
  }
  private state: AuthState<T> = {
    status: "unknown",
    user: null,
  };

  private listeners = new Set<AuthListener<T>>();

  getState(): AuthState<T> {
    return this.state;
  }

  subscribe(listener: AuthListener<T>): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit(): void {
    this.listeners.forEach((listener) => listener(this.state));
  }

  private setState(updates: Partial<AuthState<T>>): void {
    this.state = { ...this.state, ...updates };
    this.emit();
  }

  async login(user: T, token: string): Promise<void> {
    this.setState({ status: "loading" });

    // Auth Logic
    this.tokenStore.setAccessToken(token);

    this.setState({ status: "authenticated", user });
  }

  logout(): void {
    this.tokenStore.clear();
    this.setState({ status: "unauthenticated", user: null });
  }

 async updateToken(newToken: string): Promise<void> {
    this.tokenStore.setAccessToken(newToken);
  }

  async bootstrapAuth(): Promise<void> {
    this.setState({ status: "loading" });

    const token = this.tokenStore.getAccessToken();

    if (!token) {
      this.setState({ status: "unauthenticated", user: null });
      return;
    }

    this.setState({ status: "authenticated", user: null });
  }
}
