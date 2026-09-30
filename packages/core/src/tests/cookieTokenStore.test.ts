import { describe, it, expect, beforeEach, vi } from "vitest";
import { CookieTokenStore } from "../storage/CookieTokenStore.js";

describe("CookieTokenStore", () => {
  let store: CookieTokenStore;

  beforeEach(() => {
    store = new CookieTokenStore({ name: "test_token" });
    vi.stubGlobal("document", { cookie: "" });
  });

  it("returns null when no cookie exists", () => {
    vi.stubGlobal("document", { cookie: "" });
    expect(store.getAccessToken()).toBeNull();
  });

  it("returns token from cookie", () => {
    vi.stubGlobal("document", { cookie: "test_token=abc123; other=value" });
    expect(store.getAccessToken()).toBe("abc123");
  });

  it("returns null when cookie name doesn't match", () => {
    vi.stubGlobal("document", { cookie: "other_token=abc123" });
    expect(store.getAccessToken()).toBeNull();
  });

  it("handles URL encoded tokens", () => {
    const encoded = encodeURIComponent("token with spaces");
    vi.stubGlobal("document", { cookie: `test_token=${encoded}` });
    expect(store.getAccessToken()).toBe("token with spaces");
  });

  it("sets cookie with correct attributes", () => {
    const setCookieSpy = vi.spyOn(Object.getOwnPropertyDescriptor(document, "cookie")!, "set");
    store.setAccessToken("new-token");
    expect(setCookieSpy).toHaveBeenCalled();
    const cookieValue = setCookieSpy.mock.calls[0][0];
    expect(cookieValue).toContain("test_token=new-token");
    expect(cookieValue).toContain("Path=/");
    expect(cookieValue).toContain("SameSite=lax");
    expect(cookieValue).toContain("Secure");
  });

  it("clears cookie with expiration date", () => {
    const setCookieSpy = vi.spyOn(Object.getOwnPropertyDescriptor(document, "cookie")!, "set");
    store.clear();
    expect(setCookieSpy).toHaveBeenCalled();
    const cookieValue = setCookieSpy.mock.calls[0][0];
    expect(cookieValue).toContain("test_token=");
    expect(cookieValue).toContain("Expires=Thu, 01 Jan 1970");
  });

  it("handles SSR gracefully", () => {
    vi.stubGlobal("document", undefined);
    expect(store.getAccessToken()).toBeNull();
    expect(() => store.setAccessToken("token")).not.toThrow();
    expect(() => store.clear()).not.toThrow();
  });

  it("uses custom domain and path", () => {
    const customStore = new CookieTokenStore({
      name: "custom",
      domain: "example.com",
      path: "/app",
      secure: false,
      sameSite: "strict",
    });
    const setCookieSpy = vi.spyOn(Object.getOwnPropertyDescriptor(document, "cookie")!, "set");
    customStore.setAccessToken("token");
    const cookieValue = setCookieSpy.mock.calls[0][0];
    expect(cookieValue).toContain("Domain=example.com");
    expect(cookieValue).toContain("Path=/app");
    expect(cookieValue).toContain("SameSite=strict");
    expect(cookieValue).not.toContain("Secure");
  });
});