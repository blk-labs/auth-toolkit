import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthManager } from "../AuthManager.js";
import { MemoryTokenStore } from "../storage/MemoryTokenStore.js";

describe("AuthManager: Return-to Integration", () => {
  let auth: AuthManager;
  let store: MemoryTokenStore;

  beforeEach(() => {
    store = new MemoryTokenStore();
    auth = new AuthManager(store);
    vi.stubGlobal("sessionStorage", {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
  });

  it("stores return-to path", () => {
    auth.storeReturnTo("/dashboard");
    expect(sessionStorage.setItem).toHaveBeenCalledWith("auth_toolkit_return_to", "/dashboard");
  });

  it("gets return-to path", () => {
    vi.mocked(sessionStorage.getItem).mockReturnValue("/settings");
    expect(auth.getReturnTo()).toBe("/settings");
  });

  it("returns default path when none stored", () => {
    vi.mocked(sessionStorage.getItem).mockReturnValue(null);
    expect(auth.getReturnTo()).toBe("/");
  });

  it("consumes and clears return-to path", () => {
    vi.mocked(sessionStorage.getItem).mockReturnValue("/profile");
    const path = auth.consumeReturnTo();
    expect(path).toBe("/profile");
    expect(sessionStorage.removeItem).toHaveBeenCalledWith("auth_toolkit_return_to");
  });

  it("clears return-to on logout", () => {
    auth.logout();
    expect(sessionStorage.removeItem).toHaveBeenCalledWith("auth_toolkit_return_to");
  });

  it("blocks external URLs in return-to", () => {
    vi.mocked(sessionStorage.getItem).mockReturnValue("https://evil.com");
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(auth.getReturnTo()).toBe("/");
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Blocked unsafe external redirect"));
    consoleSpy.mockRestore();
  });

  it("handles SSR gracefully", () => {
    vi.stubGlobal("sessionStorage", undefined);
    const ssrAuth = new AuthManager(new MemoryTokenStore());
    expect(() => ssrAuth.storeReturnTo("/test")).not.toThrow();
    expect(ssrAuth.getReturnTo()).toBe("/");
    expect(ssrAuth.consumeReturnTo()).toBe("/");
    expect(() => ssrAuth.clearReturnTo()).not.toThrow();
  });
});