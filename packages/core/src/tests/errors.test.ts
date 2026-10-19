import { describe, it, expect } from "vitest";
import {
  AuthError,
  TokenExpiredError,
  RefreshFailedError,
  NetworkError,
  UnauthorizedError,
  ForbiddenError,
  ConfigurationError,
  isAuthError,
  getAuthErrorCode,
} from "../errors.js";

describe("AuthError Classes", () => {
  describe("AuthError", () => {
    it("creates error with message, code, and statusCode", () => {
      const error = new AuthError("Test error", "TEST_CODE", 500);
      expect(error.message).toBe("Test error");
      expect(error.code).toBe("TEST_CODE");
      expect(error.statusCode).toBe(500);
      expect(error.name).toBe("AuthError");
    });

    it("has correct prototype chain", () => {
      const error = new AuthError("Test", "CODE");
      expect(error instanceof Error).toBe(true);
      expect(error instanceof AuthError).toBe(true);
    });
  });

  describe("TokenExpiredError", () => {
    it("creates error with default message", () => {
      const error = new TokenExpiredError();
      expect(error.message).toBe("Access token has expired");
      expect(error.code).toBe("TOKEN_EXPIRED");
      expect(error.statusCode).toBe(401);
      expect(error.name).toBe("TokenExpiredError");
    });

    it("accepts custom message", () => {
      const error = new TokenExpiredError("Custom expiry message");
      expect(error.message).toBe("Custom expiry message");
    });
  });

  describe("RefreshFailedError", () => {
    it("creates error with default message", () => {
      const error = new RefreshFailedError();
      expect(error.message).toBe("Failed to refresh access token");
      expect(error.code).toBe("REFRESH_FAILED");
      expect(error.statusCode).toBe(401);
      expect(error.name).toBe("RefreshFailedError");
    });

    it("stores original error", () => {
      const original = new Error("Network down");
      const error = new RefreshFailedError("Failed", original);
      expect(error.originalError).toBe(original);
    });
  });

  describe("NetworkError", () => {
    it("creates error with default message", () => {
      const error = new NetworkError();
      expect(error.message).toBe("Network request failed");
      expect(error.code).toBe("NETWORK_ERROR");
      expect(error.statusCode).toBe(0);
      expect(error.name).toBe("NetworkError");
    });

    it("stores original error", () => {
      const original = new Error("Connection refused");
      const error = new NetworkError("Failed", original);
      expect(error.originalError).toBe(original);
    });
  });

  describe("UnauthorizedError", () => {
    it("creates error with correct code and status", () => {
      const error = new UnauthorizedError();
      expect(error.code).toBe("UNAUTHORIZED");
      expect(error.statusCode).toBe(401);
      expect(error.name).toBe("UnauthorizedError");
    });
  });

  describe("ForbiddenError", () => {
    it("creates error with correct code and status", () => {
      const error = new ForbiddenError();
      expect(error.code).toBe("FORBIDDEN");
      expect(error.statusCode).toBe(403);
      expect(error.name).toBe("ForbiddenError");
    });
  });

  describe("ConfigurationError", () => {
    it("creates error with correct code and status", () => {
      const error = new ConfigurationError("Invalid config");
      expect(error.message).toBe("Invalid config");
      expect(error.code).toBe("CONFIGURATION_ERROR");
      expect(error.statusCode).toBe(500);
      expect(error.name).toBe("ConfigurationError");
    });
  });

  describe("isAuthError", () => {
    it("returns true for AuthError instances", () => {
      expect(isAuthError(new AuthError("test", "CODE"))).toBe(true);
      expect(isAuthError(new TokenExpiredError())).toBe(true);
      expect(isAuthError(new RefreshFailedError())).toBe(true);
      expect(isAuthError(new NetworkError())).toBe(true);
      expect(isAuthError(new UnauthorizedError())).toBe(true);
      expect(isAuthError(new ForbiddenError())).toBe(true);
      expect(isAuthError(new ConfigurationError("test"))).toBe(true);
    });

    it("returns false for non-AuthError instances", () => {
      expect(isAuthError(new Error("regular error"))).toBe(false);
      expect(isAuthError({ code: "CODE" })).toBe(false);
      expect(isAuthError(null)).toBe(false);
      expect(isAuthError(undefined)).toBe(false);
      expect(isAuthError("string")).toBe(false);
    });
  });

  describe("getAuthErrorCode", () => {
    it("returns code for AuthError instances", () => {
      expect(getAuthErrorCode(new TokenExpiredError())).toBe("TOKEN_EXPIRED");
      expect(getAuthErrorCode(new UnauthorizedError())).toBe("UNAUTHORIZED");
      expect(getAuthErrorCode(new ForbiddenError())).toBe("FORBIDDEN");
    });

    it("returns HTTP status codes for Response objects", () => {
      const resp401 = new Response(null, { status: 401 });
      const resp403 = new Response(null, { status: 403 });
      const resp500 = new Response(null, { status: 500 });
      expect(getAuthErrorCode(resp401)).toBe("UNAUTHORIZED");
      expect(getAuthErrorCode(resp403)).toBe("FORBIDDEN");
      expect(getAuthErrorCode(resp500)).toBe("HTTP_500");
    });

    it("returns null for unknown errors", () => {
      expect(getAuthErrorCode(new Error("test"))).toBeNull();
      expect(getAuthErrorCode(null)).toBeNull();
      expect(getAuthErrorCode(undefined)).toBeNull();
    });
  });
});