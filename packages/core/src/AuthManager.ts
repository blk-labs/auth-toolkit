import type { AuthListener, AuthState, TokenStore } from "@auth/types";

export interface RefreshResult<User> {
  accessToken: string;
  user?: User;
}

export interface AuthManagerOptions<User> {
  onRefresh?: (currentAccessToken: string | null) => Promise<RefreshResult<User>>;
}

export class AuthManager<T = unknown> {
  private tokenStore: TokenStore;
  private options: AuthManagerOptions<T>;
  private refreshRequest: { sessionVersion: number; promise: Promise<string> } | null = null;
  private sessionVersion = 0;

  constructor(tokenStore: TokenStore, options: AuthManagerOptions<T> = {}) {
    this.tokenStore = tokenStore;
    this.options = options;
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
    this.sessionVersion++;
    this.setState({ status: "loading" });

    // Auth Logic
    this.tokenStore.setAccessToken(token);

    this.setState({ status: "authenticated", user });
  }

  logout(): void {
    this.sessionVersion++;
    this.tokenStore.clear();
    this.setState({ status: "unauthenticated", user: null });
  }

  refresh(): Promise<string> {
    const onRefresh = this.options.onRefresh;
    if (!onRefresh) {
      return Promise.reject(new Error("AuthManager refresh is not configured"));
    }

    if (this.refreshRequest?.sessionVersion === this.sessionVersion) {
      return this.refreshRequest.promise;
    }

    const sessionVersion = this.sessionVersion;
    const refreshPromise = (async () => {
      try {
        const result = await onRefresh(this.tokenStore.getAccessToken());

        if (sessionVersion !== this.sessionVersion) {
          throw new Error("AuthManager refresh was cancelled by a session change");
        }
        if (!result || typeof result.accessToken !== "string" || !result.accessToken.trim()) {
          throw new Error("AuthManager refresh returned an invalid access token");
        }

        this.tokenStore.setAccessToken(result.accessToken);
        this.setState({
          status: "authenticated",
          user: result.user === undefined ? this.state.user : result.user,
        });
        return result.accessToken;
      } catch (error) {
        if (sessionVersion === this.sessionVersion) {
          this.logout();
        }
        throw error;
      } finally {
        if (this.refreshRequest?.sessionVersion === sessionVersion) {
          this.refreshRequest = null;
        }
      }
    })();

    this.refreshRequest = { sessionVersion, promise: refreshPromise };
    return refreshPromise;
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
