import { render, screen, act } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';

import { useCan, useHasRole, useHasAnyRole } from '../hooks/useRbac';
import { AuthProvider } from '../providers/AuthProvider';
import type { AuthManagerLike } from '../providers/AuthProvider';

type MockUser = {
  id: string;
  name: string;
  roles?: string[];
  permissions?: string[];
};

function createMockAuthManager(
  initialState: ReturnType<AuthManagerLike<MockUser>['getState']>
): AuthManagerLike<MockUser> & {
  __emit(state: ReturnType<AuthManagerLike<MockUser>['getState']>): void;
} {
  let state = initialState;
  const listeners = new Set<(state: ReturnType<AuthManagerLike<MockUser>['getState']>) => void>();

  const mockTokenStore = {
    getAccessToken: vi.fn(() => 'mock-token'),
    setAccessToken: vi.fn(),
    clear: vi.fn(),
  };

  return {
    getState: vi.fn(() => state),
    subscribe: vi.fn(
      (listener: (state: ReturnType<AuthManagerLike<MockUser>['getState']>) => void) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
      }
    ),
    login: vi.fn().mockResolvedValue(undefined),
    logout: vi.fn(),
    refresh: vi.fn().mockResolvedValue('renewed-token'),
    bootstrapAuth: vi.fn().mockResolvedValue(undefined),
    getTokenStore: vi.fn(() => mockTokenStore),
    storeReturnTo: vi.fn(),
    getReturnTo: vi.fn(() => '/'),
    consumeReturnTo: vi.fn(() => '/'),
    clearReturnTo: vi.fn(),
    __emit(newState) {
      state = newState;
      listeners.forEach((listener) => listener(state));
    },
  };
}

describe('RBAC Hooks', () => {
  it('useCan returns function that checks permissions', () => {
    const mockManager = createMockAuthManager({
      status: 'authenticated',
      user: { id: '1', name: 'Peace', roles: ['admin'], permissions: ['read:document'] },
    });

    const TestComponent = () => {
      const can = useCan();
      const result = can('read', 'document');
      return <div data-testid="result">{String(result)}</div>;
    };

    render(
      <AuthProvider authManager={mockManager}>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('result').textContent).toBe('true');
  });

  it('useCan returns false for missing permissions', () => {
    const mockManager = createMockAuthManager({
      status: 'authenticated',
      user: { id: '1', name: 'Peace', roles: ['user'], permissions: ['read:document'] },
    });

    const TestComponent = () => {
      const can = useCan();
      const result = can('write', 'document');
      return <div data-testid="result">{String(result)}</div>;
    };

    render(
      <AuthProvider authManager={mockManager}>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('result').textContent).toBe('false');
  });

  it('useHasRole returns function that checks role', () => {
    const mockManager = createMockAuthManager({
      status: 'authenticated',
      user: { id: '1', name: 'Peace', roles: ['admin'] },
    });

    const TestComponent = () => {
      const hasRole = useHasRole();
      const result = hasRole('admin');
      return <div data-testid="result">{String(result)}</div>;
    };

    render(
      <AuthProvider authManager={mockManager}>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('result').textContent).toBe('true');
  });

  it('useHasRole returns false for missing role', () => {
    const mockManager = createMockAuthManager({
      status: 'authenticated',
      user: { id: '1', name: 'Peace', roles: ['user'] },
    });

    const TestComponent = () => {
      const hasRole = useHasRole();
      const result = hasRole('admin');
      return <div data-testid="result">{String(result)}</div>;
    };

    render(
      <AuthProvider authManager={mockManager}>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('result').textContent).toBe('false');
  });

  it('useHasAnyRole returns function that checks any of the roles', () => {
    const mockManager = createMockAuthManager({
      status: 'authenticated',
      user: { id: '1', name: 'Peace', roles: ['manager'] },
    });

    const TestComponent = () => {
      const hasAnyRole = useHasAnyRole();
      const result = hasAnyRole(['admin', 'manager']);
      return <div data-testid="result">{String(result)}</div>;
    };

    render(
      <AuthProvider authManager={mockManager}>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('result').textContent).toBe('true');
  });

  it('useHasAnyRole returns false when user has none of the roles', () => {
    const mockManager = createMockAuthManager({
      status: 'authenticated',
      user: { id: '1', name: 'Peace', roles: ['user'] },
    });

    const TestComponent = () => {
      const hasAnyRole = useHasAnyRole();
      const result = hasAnyRole(['admin', 'manager']);
      return <div data-testid="result">{String(result)}</div>;
    };

    render(
      <AuthProvider authManager={mockManager}>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('result').textContent).toBe('false');
  });

  it('RBAC hooks return false when user is null', () => {
    const mockManager = createMockAuthManager({
      status: 'unauthenticated',
      user: null,
    });

    const TestComponent = () => {
      const can = useCan();
      const hasRole = useHasRole();
      const hasAnyRole = useHasAnyRole();

      return (
        <div>
          <span data-testid="can">{String(can('read', 'doc'))}</span>
          <span data-testid="hasRole">{String(hasRole('admin'))}</span>
          <span data-testid="hasAnyRole">{String(hasAnyRole(['admin', 'manager']))}</span>
        </div>
      );
    };

    render(
      <AuthProvider authManager={mockManager}>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('can').textContent).toBe('false');
    expect(screen.getByTestId('hasRole').textContent).toBe('false');
    expect(screen.getByTestId('hasAnyRole').textContent).toBe('false');
  });

  it('RBAC hooks update when user changes', () => {
    const mockManager = createMockAuthManager({
      status: 'unauthenticated',
      user: null,
    });

    const TestComponent = () => {
      const can = useCan();
      return <div data-testid="can">{String(can('read', 'doc'))}</div>;
    };

    render(
      <AuthProvider authManager={mockManager}>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('can').textContent).toBe('false');

    act(() => {
      mockManager.__emit({
        status: 'authenticated',
        user: { id: '1', name: 'Peace', roles: ['admin'], permissions: ['read:doc'] },
      });
    });

    expect(screen.getByTestId('can').textContent).toBe('true');
  });
});
