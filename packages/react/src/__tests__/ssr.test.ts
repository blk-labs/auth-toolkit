import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryTokenStore } from "@auth-toolkit/core";
import { AuthManager } from "@auth-toolkit/core";
import { createServerAuth, getTokenFromRequest, setAuthCookie, clearAuthCookie } from "../utils/ssr";

// Mock next/headers for tests
vi.mock("next/headers", () => ({
  cookies: () => Promise.resolve({
    get: vi.fn(),
    set: vi.fn(),
    delete: vi.fn(),
    has: vi.fn(),
  }),
}));

describe("SSR Utilities", () => {
  let authManager: AuthManager;
  let store: MemoryTokenStore;

  beforeEach(() => {
    store = new MemoryTokenStore();
    // Create authManager with onRefresh that rejects for invalid tokens
    authManager = new AuthManager(store, {
      onRefresh: async (token) => {
        if (!token || token === "invalid-token") {
          throw new Error("Invalid token");
        }
        return { accessToken: token };
      },
    });
    // Clear any existing token
    store.clear();
  });

  describe("createServerAuth", () => {
    it("returns unauthenticated when no token", async () => {
      const serverAuth = createServerAuth(authManager, () => undefined);
      const result = await serverAuth.getAuth();
      expect(result.status).toBe("unauthenticated");
      expect(result.user).toBeNull();
    });

    it("returns unauthenticated when token is invalid", async () => {
      const serverAuth = createServerAuth(authManager, () => "invalid-token");
      const result = await serverAuth.getAuth();
      expect(result.status).toBe("unauthenticated");
    });

    it("isAuthenticated returns false when no token", async () => {
      const serverAuth = createServerAuth(authManager, () => undefined);
      const result = await serverAuth.isAuthenticated();
      expect(result).toBe(false);
    });
  });

  describe("getTokenFromRequest", () => {
    it("extracts token from cookie header", () => {
      const request = new Request("http://example.com", {
        headers: { cookie: "auth_token=abc123; other=value" },
      });
      const token = getTokenFromRequest(request);
      expect(token).toBe("abc123");
    });

    it("returns null when no cookie header", () => {
      const request = new Request("http://example.com");
      const token = getTokenFromRequest(request);
      expect(token).toBeNull();
    });

    it("returns null when auth_token not in cookies", () => {
      const request = new Request("http://example.com", {
        headers: { cookie: "other=value" },
      });
      const token = getTokenFromRequest(request);
      expect(token).toBeNull();
    });
  });

  describe("setAuthCookie", () => {
    it("sets auth cookie on response", () => {
      const response = new Response();
      setAuthCookie(response, "test-token");
      const cookie = response.headers.get("Set-Cookie");
      expect(cookie).toContain("auth_token=test-token");
      expect(cookie).toContain("HttpOnly");
      expect(cookie).toContain("Secure");
      expect(cookie).toContain("SameSite=lax");
    });

    it("accepts custom options", () => {
      const response = new Response();
      setAuthCookie(response, "test-token", { maxAge: 3600, secure: false, sameSite: "strict" });
      const cookie = response.headers.get("Set-Cookie");
      expect(cookie).toContain("Max-Age=3600");
      expect(cookie).toContain("Secure=false");
      expect(cookie).toContain("SameSite=strict");
    });
  });

  describe("clearAuthCookie", () => {
    it("clears auth cookie on response", () => {
      const response = new Response();
      clearAuthCookie(response);
      const cookie = response.headers.get("Set-Cookie");
      expect(cookie).toContain("auth_token=");
      expect(cookie).toContain("Max-Age=0");
    });
  });
});