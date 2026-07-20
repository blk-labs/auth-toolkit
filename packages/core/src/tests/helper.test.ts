/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setReturnTo, getReturnTo, clearReturnTo } from '../utils/helper.js';

describe('Redirect Helpers', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.restoreAllMocks();
  });

  it('should store and retrieve a valid internal path', () => {
    setReturnTo('/dashboard/settings');
    expect(getReturnTo()).toBe('/dashboard/settings');
  });

  it('should return "/" if no path is stored', () => {
    expect(getReturnTo()).toBe('/');
  });

  it('should clear the stored path', () => {
    setReturnTo('/profile');
    clearReturnTo();
    expect(getReturnTo()).toBe('/');
  });

  it('should reject unsafe external URLs and fallback to "/"', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    
    const unsafePaths = [
      'https://malicious-site.com',
      'http://attacker.org/login',
      '//evil.com',
    ];

    unsafePaths.forEach((path) => {
      setReturnTo(path);
      expect(getReturnTo()).toBe('/');
    });

    expect(consoleSpy).toHaveBeenCalledTimes(unsafePaths.length);
  });
});