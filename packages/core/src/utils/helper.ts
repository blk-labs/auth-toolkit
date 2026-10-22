const RETURN_TO_KEY = 'auth_toolkit_return_to';

function getSessionStorage(): Storage | null {
  if (typeof window === 'undefined') return null;
  try {
    const testKey = '__storage_test__';
    window.sessionStorage.setItem(testKey, testKey);
    window.sessionStorage.removeItem(testKey);
    return window.sessionStorage;
  } catch {
    return null;
  }
}

export function setReturnTo(path: string): void {
  const storage = getSessionStorage();
  storage?.setItem(RETURN_TO_KEY, path);
}

export function clearReturnTo(): void {
  const storage = getSessionStorage();
  storage?.removeItem(RETURN_TO_KEY);
}

export function getReturnTo(): string {
  const storage = getSessionStorage();
  const path = storage?.getItem(RETURN_TO_KEY);

  if (!path) return '/';

  const isExternal = /^(https?:)?\/\//.test(path);

  if (isExternal) {
    console.warn(`[Auth Toolkit] Blocked unsafe external redirect attempt to: ${path}`);
    return '/';
  }

  return path;
}

export function consumeReturnTo(): string {
  const path = getReturnTo();
  clearReturnTo();
  return path;
}
