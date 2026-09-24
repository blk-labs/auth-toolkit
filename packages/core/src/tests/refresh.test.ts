import { describe, expect, it, vi } from "vitest";
import { AuthManager } from "../AuthManager.js";
import { MemoryTokenStore } from "../storage/MemoryTokenStore.js";

type User = { id: string; role: string };
const user: User = { id: "1", role: "admin" };

describe("AuthManager refresh", () => {
  it("saves a renewed token and updates subscribers through the React-facing state", async () => {
    const store = new MemoryTokenStore();
    const onRefresh = vi.fn().mockResolvedValue({
      accessToken: "new-token",
      user: { id: "1", role: "admin" },
    });
    const manager = new AuthManager<User>(store, { onRefresh });
    const listener = vi.fn();
    manager.subscribe(listener);
    await manager.login(user, "old-token");

    await expect(manager.refresh()).resolves.toBe("new-token");

    expect(onRefresh).toHaveBeenCalledWith("old-token");
    expect(store.getAccessToken()).toBe("new-token");
    expect(manager.getState()).toEqual({ status: "authenticated", user });
    expect(listener).toHaveBeenLastCalledWith({ status: "authenticated", user });
  });

  it("clears the session when the refresh handler fails", async () => {
    const store = new MemoryTokenStore();
    const error = new Error("Refresh denied");
    const manager = new AuthManager<User>(store, {
      onRefresh: vi.fn().mockRejectedValue(error),
    });
    await manager.login(user, "old-token");

    await expect(manager.refresh()).rejects.toBe(error);

    expect(store.getAccessToken()).toBeNull();
    expect(manager.getState()).toEqual({ status: "unauthenticated", user: null });
  });

  it("reports missing configuration without discarding a valid session", async () => {
    const store = new MemoryTokenStore();
    const manager = new AuthManager<User>(store);
    await manager.login(user, "old-token");

    await expect(manager.refresh()).rejects.toThrow("refresh is not configured");

    expect(store.getAccessToken()).toBe("old-token");
    expect(manager.getState()).toEqual({ status: "authenticated", user });
  });

  it("shares one refresh request across concurrent callers", async () => {
    const store = new MemoryTokenStore();
    let resolveRefresh!: (value: { accessToken: string }) => void;
    const onRefresh = vi.fn(() => new Promise<{ accessToken: string }>((resolve) => {
      resolveRefresh = resolve;
    }));
    const manager = new AuthManager<User>(store, { onRefresh });
    await manager.login(user, "old-token");

    const first = manager.refresh();
    const second = manager.refresh();
    resolveRefresh({ accessToken: "new-token" });

    await expect(Promise.all([first, second])).resolves.toEqual(["new-token", "new-token"]);
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });

  it("does not restore a session after logout during refresh", async () => {
    const store = new MemoryTokenStore();
    let resolveRefresh!: (value: { accessToken: string }) => void;
    const manager = new AuthManager<User>(store, {
      onRefresh: () => new Promise((resolve) => {
        resolveRefresh = resolve;
      }),
    });
    await manager.login(user, "old-token");

    const pending = manager.refresh();
    manager.logout();
    resolveRefresh({ accessToken: "new-token" });

    await expect(pending).rejects.toThrow("cancelled by a session change");
    expect(store.getAccessToken()).toBeNull();
    expect(manager.getState()).toEqual({ status: "unauthenticated", user: null });
  });

  it("allows a new session to refresh while an older refresh is still pending", async () => {
    const store = new MemoryTokenStore();
    let resolveOldRefresh!: (value: { accessToken: string }) => void;
    const onRefresh = vi.fn()
      .mockImplementationOnce(() => new Promise((resolve) => {
        resolveOldRefresh = resolve;
      }))
      .mockResolvedValueOnce({ accessToken: "newer-token" });
    const manager = new AuthManager<User>(store, { onRefresh });
    await manager.login(user, "old-token");
    const oldRefresh = manager.refresh();

    manager.logout();
    await manager.login(user, "replacement-token");
    await expect(manager.refresh()).resolves.toBe("newer-token");
    resolveOldRefresh({ accessToken: "stale-token" });
    await expect(oldRefresh).rejects.toThrow("cancelled by a session change");

    expect(onRefresh).toHaveBeenCalledTimes(2);
    expect(store.getAccessToken()).toBe("newer-token");
    expect(manager.getState()).toEqual({ status: "authenticated", user });
  });
});
