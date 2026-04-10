import type { AuthListener, AuthState } from "@auth/types";

export class AuthManager<T = unknown> {
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

  async login(user: T): Promise<void> {
    this.setState({ status: "loading" });

    // Auth Logic

    this.setState({ status: "authenticated", user });
  }

  logout(): void {
    this.setState({ status: "unauthenticated", user: null });
  }

  async refresh(): Promise<void> {
    this.setState({ status: "loading" });
  }


  async bootstrapAuth(): Promise<void> {
    this.setState({ status: "loading" });
    
    this.setState({ status: "unauthenticated", user: null });
  }
}
