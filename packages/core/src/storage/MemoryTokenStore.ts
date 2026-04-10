import type { TokenStore } from "@auth/types";

export class MemoryTokenStore implements TokenStore {
  private _token: string | null = null;

  getAccessToken(): string | null {
    return this._token;
  }

  setAccessToken(token: string): void {
    this._token = token;
  }

  clear(): void {
    this._token = null;
  }
}
