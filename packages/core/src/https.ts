import type { TokenStore } from "@auth/types";

interface HttpClientConfig {
  baseUrl: string;
  storage: TokenStore;
  onRefresh: () => Promise<string>;
  onLogout: () => void;
}

type Subscriber = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

export class createHttpClient {
  private isRefreshing = false;
  private refreshSubscribers: Subscriber[] = [];

  constructor(private config: HttpClientConfig) {}

  async request(path: string, options: RequestInit = {}): Promise<Response> {
    const url = `${this.config.baseUrl}${path}`;

    // 1. Attach current access token
    const token = this.config.storage.getAccessToken();
    const headers = new Headers(options.headers);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(url, { ...options, headers });

    // 2. If 401, handle token refresh
    if (response.status === 401) {
      return this.handleUnauthorized(url, options);
    }

    return response;
  }

  //   Unauthorized function
  private async handleUnauthorized(
    url: string,
    options: RequestInit,
  ): Promise<Response> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      this.config
        .onRefresh()
        .then((newToken) => {
          this.isRefreshing = false;
          this.config.storage.setAccessToken(newToken);
          this.onTokenRefreshed(newToken);
        })
        .catch((error) => {
          this.isRefreshing = false;
          this.onRefreshFailed(error);
        });
    }

    return new Promise<Response>((resolve, reject) => {
      this.refreshSubscribers.push({
        resolve: (newToken: string) => {
          const retryHeaders = new Headers(options.headers);
          retryHeaders.set("Authorization", `Bearer ${newToken}`);

          fetch(url, { ...options, headers: retryHeaders })
            .then(resolve)
            .catch(reject);
        },
        reject: (error: unknown) => {
          reject(error);
        }
      });
    });
  }

  //   if the token refresh we retry all stored requests
  private onTokenRefreshed(token: string) {
    this.refreshSubscribers.forEach((sub) => sub.resolve(token));
    this.refreshSubscribers = [];
  }

  private onRefreshFailed(error: unknown) {
    this.config.onLogout();
    this.refreshSubscribers.forEach((sub) => sub.reject(error));
    this.refreshSubscribers = [];
  }
}
