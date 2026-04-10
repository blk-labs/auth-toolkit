import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AuthManager } from './index';

describe('AuthManager: Test should cover all state transitions', () => {
let auth: AuthManager;

beforeEach(() => {
    auth = new AuthManager();
  });

  it('1. Initial State: Should start in "unknown"', () => {
    expect(auth.getState().status).toBe('unknown');
  });

  it('2. Cold Start: bootstrapAuth transitions to "unauthenticated"', async () => {
    await auth.bootstrapAuth();
    expect(auth.getState().status).toBe('unauthenticated');
  });

  it('3. Login: Transitions to "authenticated" with user data', async () => {
    const mockUser = { id: 'joe_01', email: 'joseph@example.com' };
    await auth.login(mockUser);
    
    const state = auth.getState();
    expect(state.status).toBe('authenticated');
    expect(state.user).toEqual(mockUser);
  });

  it('4. Logout: Transitions back to "unauthenticated"', async () => {
    await auth.login({ id: '1' } as any);
    auth.logout();
    
    expect(auth.getState().status).toBe('unauthenticated');
    expect(auth.getState().user).toBeNull();
  });

  it('Event-Driven: Notifies subscribers on every state change', async () => {
    const listener = vi.fn();
    auth.subscribe(listener);

    await auth.login({ id: '1' } as any);

    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'authenticated' })
    );
  });


})