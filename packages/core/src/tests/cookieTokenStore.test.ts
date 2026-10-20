import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

import { CookieTokenStore } from '../storage/CookieTokenStore.js';

describe('CookieTokenStore', () => {
  let store: CookieTokenStore;
  let cookieValue: string;

  beforeEach(() => {
    cookieValue = '';
    store = new CookieTokenStore({ name: 'test_token' });
    // Mock document.cookie with getter/setter
    Object.defineProperty(global, 'document', {
      value: {
        get cookie() {
          return cookieValue;
        },
        set cookie(val: string) {
          cookieValue = val;
        },
      },
      configurable: true,
      writable: true,
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns null when no cookie exists', () => {
    cookieValue = '';
    expect(store.getAccessToken()).toBeNull();
  });

  it('returns token from cookie', () => {
    cookieValue = 'test_token=abc123; other=value';
    expect(store.getAccessToken()).toBe('abc123');
  });

  it("returns null when cookie name doesn't match", () => {
    cookieValue = 'other_token=abc123';
    expect(store.getAccessToken()).toBeNull();
  });

  it('handles URL encoded tokens', () => {
    const encoded = encodeURIComponent('token with spaces');
    cookieValue = `test_token=${encoded}`;
    expect(store.getAccessToken()).toBe('token with spaces');
  });

  it('sets cookie with correct attributes', () => {
    store.setAccessToken('new-token');
    expect(cookieValue).toContain('test_token=new-token');
    expect(cookieValue).toContain('Path=/');
    expect(cookieValue).toContain('SameSite=lax');
    expect(cookieValue).toContain('Secure');
  });

  it('clears cookie with expiration date', () => {
    store.clear();
    expect(cookieValue).toContain('test_token=');
    expect(cookieValue).toContain('Expires=Thu, 01 Jan 1970');
  });

  it('handles SSR gracefully', () => {
    vi.stubGlobal('document', undefined);
    expect(store.getAccessToken()).toBeNull();
    expect(() => store.setAccessToken('token')).not.toThrow();
    expect(() => store.clear()).not.toThrow();
  });

  it('uses custom domain and path', () => {
    const customStore = new CookieTokenStore({
      name: 'custom',
      domain: 'example.com',
      path: '/app',
      secure: false,
      sameSite: 'strict',
    });
    customStore.setAccessToken('token');
    expect(cookieValue).toContain('Domain=example.com');
    expect(cookieValue).toContain('Path=/app');
    expect(cookieValue).toContain('SameSite=strict');
    expect(cookieValue).not.toContain('Secure');
  });
});
