export interface TokenStore {
  getAccessToken(): string | null;
  setAccessToken(token: string): void;
  clear(): void;
}
