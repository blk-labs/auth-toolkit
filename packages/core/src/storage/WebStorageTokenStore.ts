import type { TokenStore } from "@auth/types";

export class WebStorageTokenStore implements TokenStore {
  private storage: Storage | null;
  constructor(
    private key: string = "auth-toolkit.auth_token",
    storage?: Storage,
  ) {
    this.storage =
      storage ?? (typeof window !== "undefined" ? window.localStorage : null);
  }

  getAccessToken(): string | null {
    try {
      return this.storage?.getItem(this.key) ?? null;
    } catch (error) {
      console.warn("Failed to retrieve auth token", error);
      return null;
    }
  }

  setAccessToken(token: string): void {
    try {
      this.storage?.setItem(this.key, token);
    } catch (error) {
      console.warn("Failed to persist auth token", error);
    }
  }

  clear(): void {
    try {
      this.storage?.removeItem(this.key);
    } catch {}
  }
}
