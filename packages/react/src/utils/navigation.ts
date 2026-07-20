/**
 * Navigation abstraction layer for router-agnostic redirects.
 *
 * This utility detects the routing environment (React Router v6 or Next.js App Router)
 * and provides a unified interface for navigation operations.
 */

export type NavigationAdapter = {
  navigate: (path: string, replace?: boolean) => void;
  getCurrentPath: () => string;
};

// Store the custom adapter if provided by the consumer
let customAdapter: NavigationAdapter | null = null;

/**
 * Register a custom navigation adapter for environments that don't auto-detect.
 * Use this for Next.js App Router or any custom routing setup.
 */
export function setNavigationAdapter(adapter: NavigationAdapter): void {
  customAdapter = adapter;
}

/**
 * Detect if we're running in a Next.js App Router environment.
 * Next.js exposes `next/navigation` on the client side.
 */
function isNextJsAppRouter(): boolean {
  if (typeof window === "undefined") return false;
  // Next.js exposes internal routing markers
  return !!(window as any).__NEXT_DATA__;
}

/**
 * Detect if we're in a React Router v6 environment.
 * React Router doesn't expose global markers, so we rely on
 * the presence of a registered adapter or default to history API.
 */
function isReactRouter(): boolean {
  return typeof window !== "undefined" && !!window.history;
}

/**
 * Navigate to a given path, optionally replacing the current history entry.
 */
export function navigate(path: string, replace = false): void {
  // If a custom adapter is registered, use it
  if (customAdapter) {
    customAdapter.navigate(path, replace);
    return;
  }

  // Fallback to window.location or history API
  if (typeof window !== "undefined") {
    if (replace) {
      window.location.replace(path);
    } else {
      window.location.href = path;
    }
  }
}

/**
 * Get the current path from the browser.
 */
export function getCurrentPath(): string {
  // If a custom adapter is registered, use it
  if (customAdapter) {
    return customAdapter.getCurrentPath();
  }

  if (typeof window !== "undefined") {
    return window.location.pathname + window.location.search;
  }

  return "/";
}

/**
 * Check if the current path matches the given path.
 */
export function isCurrentPath(path: string): boolean {
  const current = getCurrentPath();
  return current === path || current === path + "/";
}
