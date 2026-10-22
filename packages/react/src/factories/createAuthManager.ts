'use client';

import {
  AuthManager,
  MemoryTokenStore,
  WebStorageTokenStore,
  type TokenStore,
  type AuthManagerOptions,
} from '@auth-toolkit/core';

export interface CreateAuthManagerOptions<User = unknown> {
  storage?: 'memory' | 'localStorage' | 'sessionStorage' | TokenStore;
  storageKey?: string;
  onRefresh?: AuthManagerOptions<User>['onRefresh'];
}

export function createAuthManager<User = unknown>(
  options: CreateAuthManagerOptions<User> = {}
): AuthManager<User> {
  const { storage = 'localStorage', storageKey = 'auth_token', onRefresh } = options;

  let tokenStore: TokenStore;

  if (typeof storage === 'string') {
    switch (storage) {
      case 'memory':
        tokenStore = new MemoryTokenStore();
        break;
      case 'localStorage':
        if (typeof window === 'undefined') {
          tokenStore = new MemoryTokenStore();
        } else {
          tokenStore = new WebStorageTokenStore(storageKey, window.localStorage);
        }
        break;
      case 'sessionStorage':
        if (typeof window === 'undefined') {
          tokenStore = new MemoryTokenStore();
        } else {
          tokenStore = new WebStorageTokenStore(storageKey, window.sessionStorage);
        }
        break;
      default:
        tokenStore = new MemoryTokenStore();
    }
  } else {
    tokenStore = storage;
  }

  return new AuthManager<User>(tokenStore, { onRefresh });
}
