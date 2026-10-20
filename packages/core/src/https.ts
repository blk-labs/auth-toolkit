import type { TokenStore } from '@auth/types';

import { NetworkError, UnauthorizedError, isAuthError } from './errors.js';
import type { FetchAdapter } from './fetch-adapter.js';
import { defaultFetchAdapter } from './fetch-adapter.js';

export interface RequestInterceptor {
  (url: string, options: RequestInit): RequestInit | Promise<RequestInit>;
}

export interface ResponseInterceptor {
  (response: Response): Response | Promise<Response>;
}

export interface RetryConfig {
  maxRetries: number;
  retryDelay?: (attempt: number) => number;
  retryCondition?: (error: unknown) => boolean;
}

interface HttpClientConfig {
  baseUrl: string;
  storage: TokenStore;
  onRefresh: () => Promise<string>;
  onLogout: () => void;
  fetchAdapter?: FetchAdapter;
  requestInterceptors?: RequestInterceptor[];
  responseInterceptors?: ResponseInterceptor[];
  retry?: RetryConfig;
}

type Subscriber = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

export class HttpClient {
  private isRefreshing = false;
  private refreshSubscribers: Subscriber[] = [];
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];
  private retryConfig: RetryConfig | null = null;

  constructor(private config: HttpClientConfig) {
    this.requestInterceptors = config.requestInterceptors ?? [];
    this.responseInterceptors = config.responseInterceptors ?? [];
    this.retryConfig = config.retry ?? null;
  }

  private getFetch(): FetchAdapter {
    return this.config.fetchAdapter ?? defaultFetchAdapter;
  }

  addRequestInterceptor(interceptor: RequestInterceptor): () => void {
    this.requestInterceptors.push(interceptor);
    return () => {
      const index = this.requestInterceptors.indexOf(interceptor);
      if (index !== -1) this.requestInterceptors.splice(index, 1);
    };
  }

  addResponseInterceptor(interceptor: ResponseInterceptor): () => void {
    this.responseInterceptors.push(interceptor);
    return () => {
      const index = this.responseInterceptors.indexOf(interceptor);
      if (index !== -1) this.responseInterceptors.splice(index, 1);
    };
  }

  setRetryConfig(config: RetryConfig | null): void {
    this.retryConfig = config;
  }

  private async runRequestInterceptors(url: string, options: RequestInit): Promise<RequestInit> {
    let modifiedOptions = options;
    for (const interceptor of this.requestInterceptors) {
      modifiedOptions = await interceptor(url, modifiedOptions);
    }
    return modifiedOptions;
  }

  private async runResponseInterceptors(response: Response): Promise<Response> {
    let modifiedResponse = response;
    for (const interceptor of this.responseInterceptors) {
      modifiedResponse = await interceptor(modifiedResponse);
    }
    return modifiedResponse;
  }

  private shouldRetry(error: unknown, attempt: number): boolean {
    if (!this.retryConfig || attempt >= this.retryConfig.maxRetries) return false;
    if (this.retryConfig.retryCondition) return this.retryConfig.retryCondition(error);
    if (error instanceof NetworkError) return true;
    return false;
  }

  private getRetryDelay(attempt: number): number {
    if (this.retryConfig?.retryDelay) return this.retryConfig.retryDelay(attempt);
    return Math.min(1000 * 2 ** attempt, 30000);
  }

  async request(path: string, options: RequestInit = {}): Promise<Response> {
    const url = `${this.config.baseUrl}${path}`;
    let attempt = 0;

    while (true) {
      // 1. Attach current access token
      const token = this.config.storage.getAccessToken();
      const headers = new Headers(options.headers);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      // 2. Run request interceptors
      const modifiedOptions = await this.runRequestInterceptors(url, { ...options, headers });

      let response: Response;
      try {
        response = await this.getFetch()(url, modifiedOptions);
      } catch (error) {
        if (isAuthError(error)) throw error;
        if (this.shouldRetry(error, attempt)) {
          attempt++;
          await new Promise((r) => setTimeout(r, this.getRetryDelay(attempt)));
          continue;
        }
        throw new NetworkError('Network request failed', error);
      }

      // 3. Run response interceptors
      response = await this.runResponseInterceptors(response);

      // 4. If 401, handle token refresh
      if (response.status === 401) {
        return this.handleUnauthorized(url, options);
      }

      // 5. Retry on other error statuses if configured
      if (!response.ok && this.shouldRetry(new NetworkError(`HTTP ${response.status}`), attempt)) {
        attempt++;
        await new Promise((r) => setTimeout(r, this.getRetryDelay(attempt)));
        continue;
      }

      return response;
    }
  }

  private async handleUnauthorized(url: string, options: RequestInit): Promise<Response> {
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
          retryHeaders.set('Authorization', `Bearer ${newToken}`);

          this.getFetch()(url, { ...options, headers: retryHeaders })
            .then(resolve)
            .catch((error) => {
              if (isAuthError(error)) reject(error);
              else reject(new NetworkError('Retry request failed', error));
            });
        },
        reject: (error: unknown) => {
          reject(error);
        },
      });
    });
  }

  private onTokenRefreshed(token: string) {
    this.refreshSubscribers.forEach((sub) => sub.resolve(token));
    this.refreshSubscribers = [];
  }

  private onRefreshFailed(error: unknown) {
    this.config.onLogout();
    const authError = isAuthError(error) ? error : new UnauthorizedError('Token refresh failed');
    this.refreshSubscribers.forEach((sub) => sub.reject(authError));
    this.refreshSubscribers = [];
  }

  get(url: string, config?: RequestInit): Promise<Response> {
    return this.request(url, { ...config, method: 'GET' });
  }

  post(url: string, body?: unknown, config?: RequestInit): Promise<Response> {
    const headers = new Headers(config?.headers);
    if (body && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
    return this.request(url, {
      ...config,
      method: 'POST',
      headers,
      body: body ? JSON.stringify(body) : null,
    });
  }

  put(url: string, body?: unknown, config?: RequestInit): Promise<Response> {
    const headers = new Headers(config?.headers);
    if (body && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
    return this.request(url, {
      ...config,
      method: 'PUT',
      headers,
      body: body ? JSON.stringify(body) : null,
    });
  }

  patch(url: string, body?: unknown, config?: RequestInit): Promise<Response> {
    const headers = new Headers(config?.headers);
    if (body && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
    return this.request(url, {
      ...config,
      method: 'PATCH',
      headers,
      body: body ? JSON.stringify(body) : null,
    });
  }

  del(url: string, config?: RequestInit): Promise<Response> {
    return this.request(url, { ...config, method: 'DELETE' });
  }
}

export function createHttpClient(config: HttpClientConfig): HttpClient {
  return new HttpClient(config);
}
