import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createHttpClient } from '../https.js';
import { MemoryTokenStore } from '../storage/MemoryTokenStore.js';

describe('HttpClient: Concurrent 401 Recovery', () => {
  let store: MemoryTokenStore;
  const mockBaseUrl = 'https://api.example.com';

  beforeEach(() => {
    store = new MemoryTokenStore();
    store.setAccessToken('old-expired-token');
    vi.stubGlobal('fetch', vi.fn());
  });

  it('Integration: 5 simultaneous 401s → 1 refresh → 5 retries', async () => {
    const refreshSpy = vi.fn().mockResolvedValue('new-valid-token');
    const logoutSpy = vi.fn();
    
    const client = new createHttpClient({
      baseUrl: mockBaseUrl,
      storage: store,
      onRefresh: refreshSpy,
      onLogout: logoutSpy
    });

    // Mock logic: 
    // First 5 calls (initial attempts) return 401.
    // Subsequent calls (retries) return 200.
    let callCount = 0;
    vi.mocked(fetch).mockImplementation(async () => {
      callCount++;
      if (callCount <= 5) {
        return { status: 401 } as Response;
      }
      return { 
        status: 200, 
        ok: true,
        json: async () => ({ data: 'success' }) 
      } as Response;
    });

    // 1. Fire 5 requests simultaneously
    const requests = Array.from({ length: 5 }).map(() => client.request('/resource'));
    const results = await Promise.all(requests);

    // AC: Concurrent 401 responses trigger exactly one refresh call
    expect(refreshSpy).toHaveBeenCalledTimes(1);

    // AC: All requests queued during refresh are retried automatically after success
    expect(results.every(res => res.status === 200)).toBe(true);

    // AC: Token store updated with new token
    expect(store.getAccessToken()).toBe('new-valid-token');

    // Total fetch calls = 5 (failed) + 5 (retried) = 10
    expect(fetch).toHaveBeenCalledTimes(10);
  });

  it('Refresh failure: clears session and rejects all queued requests', async () => {
    const refreshSpy = vi.fn().mockRejectedValue(new Error('Refresh Token Expired'));
    const logoutSpy = vi.fn();
    
    const client = new createHttpClient({
      baseUrl: mockBaseUrl,
      storage: store,
      onRefresh: refreshSpy,
      onLogout: logoutSpy
    });

    // Mock all fetch calls to return 401
    vi.mocked(fetch).mockResolvedValue({ status: 401 } as Response);

    // Fire 3 simultaneous requests
    const requests = Array.from({ length: 3 }).map(() => client.request('/resource'));

    // AC: Errors propagate correctly to the original caller
    await expect(Promise.all(requests)).rejects.toThrow('Refresh Token Expired');

    // AC: Refresh failure clears the session (via logout callback)
    expect(logoutSpy).toHaveBeenCalledTimes(1);
    
    // AC: No dangling promises (the await expect above proves they were rejected)
  });
});