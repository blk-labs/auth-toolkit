export interface TokenStore {
  getAccessToken(): string | null;
  setAccessToken(token: string): void;
  clear(): void;
}

export interface AccessToken {
  token: string;
  expiresAt?: number;
  issuedAt?: number;
}

export interface RefreshToken {
  token: string;
  expiresAt?: number;
  issuedAt?: number;
}

export interface TokenPair {
  accessToken: AccessToken;
  refreshToken: RefreshToken;
}

export interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  token_type?: string;
  scope?: string;
}

export function parseTokenResponse(response: TokenResponse): TokenPair {
  const now = Date.now();
  const expiresIn = response.expires_in ? response.expires_in * 1000 : 3600 * 1000;

  return {
    accessToken: {
      token: response.access_token,
      issuedAt: now,
      expiresAt: now + expiresIn,
    },
    refreshToken: response.refresh_token
      ? {
          token: response.refresh_token,
          issuedAt: now,
        }
      : {
          token: '',
          issuedAt: now,
        },
  };
}

export function isTokenExpired(token: AccessToken | RefreshToken, bufferMs = 60000): boolean {
  if (!token.expiresAt) return false;
  return Date.now() + bufferMs >= token.expiresAt;
}
