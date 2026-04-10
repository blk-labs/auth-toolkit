import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider } from "../providers/AuthProvider";
import { useAuth } from "../hooks/useAuth";
import type { AuthManagerLike } from "../providers/AuthProvider";
import { vi } from "vitest";

type MockUser = {
  id: string;
  name: string;
  role?: string;
};

function createMockAuthManager(
  initialState: ReturnType<AuthManagerLike<MockUser>["getState"]>
): AuthManagerLike<MockUser> & {
  __emit(state: ReturnType<AuthManagerLike<MockUser>["getState"]>): void;
} {
  let state = initialState;
  const listeners = new Set<
    (state: ReturnType<AuthManagerLike<MockUser>["getState"]>) => void
  >();

  return {
    getState: vi.fn(() => state),

    subscribe: vi.fn(
      (
        listener: (
          state: ReturnType<AuthManagerLike<MockUser>["getState"]>
        ) => void
      ) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
      }
    ),

    login: vi.fn(),
    logout: vi.fn(),
    refresh: vi.fn(),
    bootstrapAuth: vi.fn(),

    __emit(newState) {
      state = newState;
      listeners.forEach((listener) => listener(state));
    },
  };
}

describe("AuthProvider & useAuth", () => {
  /**
   * 1. Context Availability
   * useAuth() should throw if used outside AuthProvider
   */
  it("throws an error when useAuth is used outside AuthProvider", () => {
    const TestComponent = () => {
      useAuth();
      return null;
    };

    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      /useAuth must be used within an AuthProvider/i
    );

    consoleError.mockRestore();
  });

 
  it("calls bootstrapAuth on mount", () => {
    const mockManager = createMockAuthManager({
      status: "unauthenticated",
      user: null,
    });

    render(
      <AuthProvider authManager={mockManager}>
        <div>Test</div>
      </AuthProvider>
    );

    expect(mockManager.bootstrapAuth).toHaveBeenCalledTimes(1);
  });

  
  it("updates components when AuthManager emits new state", () => {
    const mockManager = createMockAuthManager({
      status: "unauthenticated",
      user: null,
    });

    const TestComponent = () => {
      const { status, user } = useAuth<MockUser>();
      return (
        <div>
          <span data-testid="status">{status}</span>
          <span data-testid="username">{user?.name ?? "Guest"}</span>
        </div>
      );
    };

    render(
      <AuthProvider authManager={mockManager}>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("status").textContent).toBe("unauthenticated");
    expect(screen.getByTestId("username").textContent).toBe("Guest");

    act(() => {
      mockManager.__emit({
        status: "authenticated",
        user: { id: "1", name: "Peace", role: "admin" },
      });
    });

    expect(screen.getByTestId("status").textContent).toBe("authenticated");
    expect(screen.getByTestId("username").textContent).toBe("Peace");
  });

  
  it("delegates login, logout, and refresh actions to AuthManager", async () => {
    const user = userEvent.setup();

    const mockManager = createMockAuthManager({
      status: "authenticated",
      user: { id: "1", name: "Peace" },
    });

    const TestComponent = () => {
      const { login, logout, refresh } = useAuth();

      return (
        <div>
          <button onClick={() => login()}>Login</button>
          <button onClick={() => logout()}>Logout</button>
          <button onClick={() => refresh()}>Refresh</button>
        </div>
      );
    };

    render(
      <AuthProvider authManager={mockManager}>
        <TestComponent />
      </AuthProvider>
    );

    await user.click(screen.getByText("Login"));
    await user.click(screen.getByText("Logout"));
    await user.click(screen.getByText("Refresh"));

    expect(mockManager.login).toHaveBeenCalledTimes(1);
    expect(mockManager.logout).toHaveBeenCalledTimes(1);
    expect(mockManager.refresh).toHaveBeenCalledTimes(1);
  });

  
  it("cleans up subscription on unmount", () => {
    const unsubscribe = vi.fn();

    const base = createMockAuthManager({
      status: "unauthenticated",
      user: null,
    });

    const mockManager: AuthManagerLike<MockUser> = {
      ...base,
      subscribe: vi.fn(() => unsubscribe()),
    };

    const { unmount } = render(
      <AuthProvider authManager={mockManager}>
        <div>Test</div>
      </AuthProvider>
    );

    unmount();

    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });
});
