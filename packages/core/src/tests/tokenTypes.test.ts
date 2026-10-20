import { describe, it, expect } from 'vitest';

import { parseTokenResponse, isTokenExpired, type TokenResponse } from '../types/token.js';

describe('Token Types', () => {
  describe('parseTokenResponse', () => {
    it('parses access token with expires_in', () => {
      const response: TokenResponse = {
        access_token: 'access-123',
        expires_in: 3600,
      };
      const result = parseTokenResponse(response);
      expect(result.accessToken.token).toBe('access-123');
      expect(result.accessToken.expiresAt).toBeGreaterThan(Date.now());
      expect(result.accessToken.issuedAt).toBeLessThanOrEqual(Date.now());
    });

    it('parses refresh token when present', () => {
      const response: TokenResponse = {
        access_token: 'access-123',
        refresh_token: 'refresh-456',
        expires_in: 3600,
      };
      const result = parseTokenResponse(response);
      expect(result.refreshToken.token).toBe('refresh-456');
      expect(result.refreshToken.issuedAt).toBeLessThanOrEqual(Date.now());
    });

    it('handles missing refresh token', () => {
      const response: TokenResponse = {
        access_token: 'access-123',
        expires_in: 3600,
      };
      const result = parseTokenResponse(response);
      expect(result.refreshToken.token).toBe('');
    });

    it('uses default expiry when expires_in missing', () => {
      const response: TokenResponse = {
        access_token: 'access-123',
      };
      const result = parseTokenResponse(response);
      expect(result.accessToken.expiresAt).toBeGreaterThan(Date.now() + 3500000);
      expect(result.accessToken.expiresAt).toBeLessThan(Date.now() + 3700000);
    });
  });

  describe('isTokenExpired', () => {
    it('returns false for token without expiry', () => {
      const token = { token: 'test' };
      expect(isTokenExpired(token)).toBe(false);
    });

    it('returns false for valid future token', () => {
      const token = { token: 'test', expiresAt: Date.now() + 3600000 };
      expect(isTokenExpired(token)).toBe(false);
    });

    it('returns true for expired token', () => {
      const token = { token: 'test', expiresAt: Date.now() - 1000 };
      expect(isTokenExpired(token)).toBe(true);
    });

    it('returns true for token expiring within buffer', () => {
      const token = { token: 'test', expiresAt: Date.now() + 30000 };
      expect(isTokenExpired(token, 60000)).toBe(true);
    });

    it('returns false for token expiring after buffer', () => {
      const token = { token: 'test', expiresAt: Date.now() + 120000 };
      expect(isTokenExpired(token, 60000)).toBe(false);
    });
  });
});
