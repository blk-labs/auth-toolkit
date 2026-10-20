import { describe, it, expect, beforeEach, vi } from 'vitest';

import { SessionStorageTokenStore } from '../storage/SessionStorageTokenStore.js';

describe('SessionStorageTokenStore', () => {
  let store: SessionStorageTokenStore;
  let mockStorage: Storage;

  beforeEach(() => {
    mockStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
      length: 0,
      key: vi.fn(),
    };
    store = new SessionStorageTokenStore('test_key', mockStorage);
  });

  it('returns null when storage is empty', () => {
    vi.mocked(mockStorage.getItem).mockReturnValue(null);
    expect(store.getAccessToken()).toBeNull();
  });

  it('returns token from storage', () => {
    vi.mocked(mockStorage.getItem).mockReturnValue('stored-token');
    expect(store.getAccessToken()).toBe('stored-token');
  });

  it('sets token in storage', () => {
    store.setAccessToken('new-token');
    expect(mockStorage.setItem).toHaveBeenCalledWith('test_key', 'new-token');
  });

  it('clears token from storage', () => {
    store.clear();
    expect(mockStorage.removeItem).toHaveBeenCalledWith('test_key');
  });

  it('returns null and warns on getItem error', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.mocked(mockStorage.getItem).mockImplementation(() => {
      throw new Error('Storage error');
    });
    expect(store.getAccessToken()).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Failed to retrieve auth token', expect.any(Error));
    consoleSpy.mockRestore();
  });

  it('warns on setItem error', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.mocked(mockStorage.setItem).mockImplementation(() => {
      throw new Error('Storage error');
    });
    store.setAccessToken('token');
    expect(consoleSpy).toHaveBeenCalledWith('Failed to persist auth token', expect.any(Error));
    consoleSpy.mockRestore();
  });

  it('handles SSR gracefully', () => {
    const ssrStore = new SessionStorageTokenStore();
    expect(ssrStore.getAccessToken()).toBeNull();
    expect(() => ssrStore.setAccessToken('token')).not.toThrow();
    expect(() => ssrStore.clear()).not.toThrow();
  });
});
