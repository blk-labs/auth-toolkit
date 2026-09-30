export class AuthError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode?: number,
  ) {
    super(message);
    this.name = "AuthError";
    (Error as unknown as { captureStackTrace?: (target: object, constructor: Function) => void }).captureStackTrace?.(this, AuthError);
  }
}

export class TokenExpiredError extends AuthError {
  constructor(message = "Access token has expired") {
    super(message, "TOKEN_EXPIRED", 401);
    this.name = "TokenExpiredError";
  }
}

export class RefreshFailedError extends AuthError {
  constructor(
    message = "Failed to refresh access token",
    public readonly originalError?: unknown,
  ) {
    super(message, "REFRESH_FAILED", 401);
    this.name = "RefreshFailedError";
  }
}

export class NetworkError extends AuthError {
  constructor(
    message = "Network request failed",
    public readonly originalError?: unknown,
  ) {
    super(message, "NETWORK_ERROR", 0);
    this.name = "NetworkError";
  }
}

export class UnauthorizedError extends AuthError {
  constructor(message = "Unauthorized") {
    super(message, "UNAUTHORIZED", 401);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends AuthError {
  constructor(message = "Forbidden") {
    super(message, "FORBIDDEN", 403);
    this.name = "ForbiddenError";
  }
}

export class ConfigurationError extends AuthError {
  constructor(message: string) {
    super(message, "CONFIGURATION_ERROR", 500);
    this.name = "ConfigurationError";
  }
}

export function isAuthError(error: unknown): error is AuthError {
  return error instanceof AuthError;
}

export function getAuthErrorCode(error: unknown): string | null {
  if (error instanceof AuthError) {
    return error.code;
  }
  if (error instanceof Response) {
    if (error.status === 401) return "UNAUTHORIZED";
    if (error.status === 403) return "FORBIDDEN";
    return `HTTP_${error.status}`;
  }
  return null;
}