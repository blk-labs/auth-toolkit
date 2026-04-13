const RETURN_TO_KEY = 'auth_toolkit_return_to'; 

export function setReturnTo(path: string): void {
  sessionStorage.setItem(RETURN_TO_KEY, path);
}

export function clearReturnTo(): void {
  sessionStorage.removeItem(RETURN_TO_KEY);
}

export function getReturnTo(): string {
  const path = sessionStorage.getItem(RETURN_TO_KEY);

  if (!path) return '/';

  const isExternal = /^(https?:)?\/\//.test(path);

  if (isExternal) {
    console.warn(`[Auth Toolkit] Blocked unsafe external redirect attempt to: ${path}`);
    return '/';
  }

  return path;
}