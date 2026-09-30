import type { TokenStore } from "@auth/types";
import type { FetchAdapter } from "./fetch-adapter.js";
import { defaultFetchAdapter } from "./fetch-adapter.js";
import { NetworkError, UnauthorizedError, isAuthError } from "./errors.js";

interface HttpClientConfig {
  baseUrl: string;
  storage: TokenStore;
  onRefresh: () => Promise<string>;
  onLogout: () => void;
  fetchAdapter?: FetchAdapter;
}

type Subscriber = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

export class HttpClient {
  private isRefreshing = false;
  private refreshSubscribers: Subscriber[] = [];

  constructor(private config: HttpClientConfig) {}

  private getFetch(): FetchAdapter {
    return this.config.fetchAdapter ?? defaultFetchAdapter;
  }

  async request(path: string, options: RequestInit = {}): Promise<Response> {
    const url = `${this.config.baseUrl}${path}`;

    // 1. Attach current access token
    const token = this.config.storage.getAccessToken();
    const headers = new Headers(options.headers);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    let response: Response;
    try {
      response = await this.getFetch()(url, { ...options, headers });
    } catch (error) {
      if (isAuthError(error)) throw error;
      throw new NetworkError("Network request failed", error);
    }

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

          this.getFetch()(url, { ...options, headers: retryHeaders })
            .then(resolve)
            .catch((error) => {
              if (isAuthError(error)) reject(error);
              else reject(new NetworkError("Retry request failed", error));
            });
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
    const authError = isAuthError(error)
      ? error
      : new UnauthorizedError("Token refresh failed");
    this.refreshSubscribers.forEach((sub) => sub.reject(authError));
    this.refreshSubscribers = [];
  }

  get(url: string, config?: RequestInit): Promise<Response> {
    return this.request(url, { ...config, method: "GET" });
  }

  post(url: string, body?: unknown, config?: RequestInit): Promise<Response> {
    const headers = new Headers(config?.headers);
    if (body && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    return this.request(url, {
      ...config,
      method: "POST",
      headers,
      body: body ? JSON.stringify(body) : null,
    });
  }

  put(url: string, body?: unknown, config?: RequestInit): Promise<Response> {
    const headers = new Headers(config?.headers);
    if (body && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    return this.request(url, {
      ...config,
      method: "PUT",
      headers,
      body: body ? JSON.stringify(body) : null,
    });
  }

  del(url: string, config?: RequestInit): Promise<Response> {
    return this.request(url, { ...config, method: "DELETE" });
  }
}

export function createHttpClient(config: HttpClientConfig): HttpClient {
  return new HttpClient(config);
}
