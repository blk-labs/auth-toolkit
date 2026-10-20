import { setNavigationAdapter } from '@auth-toolkit/react';

export function navigateTo(path: string, replace = false): void {
  if (replace) {
    window.history.replaceState(null, '', path);
  } else {
    window.history.pushState(null, '', path);
  }
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export const navigate = navigateTo;

setNavigationAdapter({
  navigate: navigateTo,
  getCurrentPath: () => window.location.pathname + window.location.search,
});
