import type { TokenStore } from '@auth/types';

function getStorage(storage?: Storage): Storage | null {
  if (storage) return storage;
  if (typeof window === 'undefined') return null;
  try {
    const testKey = '__storage_test__';
    window.sessionStorage.setItem(testKey, testKey);
    window.sessionStorage.removeItem(testKey);
    return window.sessionStorage;
  } catch (error) {
    console.warn('Failed to access sessionStorage', error);
    return null;
  }
}

export class SessionStorageTokenStore implements TokenStore {
  private storage: Storage | null;
  constructor(
    private key: string = 'auth-toolkit.auth_token',
    storage?: Storage
  ) {
    this.storage = getStorage(storage);
  }

  private getStore(): Storage | null {
    if (!this.storage) {
      this.storage = getStorage();
    }
    return this.storage;
  }

  getAccessToken(): string | null {
    try {
      return this.getStore()?.getItem(this.key) ?? null;
    } catch (error) {
      console.warn('Failed to retrieve auth token', error);
      return null;
    }
  }

  setAccessToken(token: string): void {
    try {
      this.getStore()?.setItem(this.key, token);
    } catch (error) {
      console.warn('Failed to persist auth token', error);
    }
  }

  clear(): void {
    try {
      this.getStore()?.removeItem(this.key);
    } catch {}
  }
}
