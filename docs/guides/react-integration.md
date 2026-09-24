# React Integration Guide

The core package owns tokens and auth state. The React package makes that state available to components. Its declared package name is `@blk-auth-toolkit/react`.

## Create one shared manager

Create the manager once, outside your React components, and pass it to `AuthProvider`. Use the same provider for the login page and protected pages.

```tsx
import { AuthManager, MemoryTokenStore } from "@auth-toolkit/core";
import { AuthProvider, RequireAuth, RequireGuest } from "@blk-auth-toolkit/react";

type User = { id: string; name: string; role: string };

const tokenStore = new MemoryTokenStore();
const authManager = new AuthManager<User>(tokenStore, {
  // Replace this test handler with a request to your application's refresh endpoint.
  onRefresh: async () => ({ accessToken: "new-test-token" }),
});

export function App() {
  return (
    <AuthProvider authManager={authManager}>
      {/* Define /login and /dashboard in your router. */}
    </AuthProvider>
  );
}

// Wrap /login in <RequireGuest> and /dashboard in <RequireAuth>.
```

`MemoryTokenStore` is useful for a mock app. Its token disappears on a browser reload. If an app persists the token, it must also restore or fetch the user: `RequireAuth` needs a non-null user to show a protected page.

## Use auth actions in pages

```tsx
import { useAuth } from "@blk-auth-toolkit/react";

type User = { id: string; name: string; role: string };

function LoginPage() {
  const { login } = useAuth<User>();

  async function handleSuccessfulLogin(user: User, accessToken: string) {
    await login(user, accessToken);
    // Navigate to /dashboard with your app's router.
  }

  // Render your login form and call handleSuccessfulLogin after it succeeds.
}

function DashboardPage() {
  const { user, logout, refresh } = useAuth<User>();

  function handleLogout() {
    logout();
    // Navigate to /login with your app's router.
  }

  // refresh() returns the new access token. It rejects if renewal fails.
  // Render the dashboard and its logout button.
}
```

## Supply a real refresh handler later

The application decides how to renew a session. Pass an `onRefresh` function to `AuthManager` that calls its backend and returns `{ accessToken, user? }`. The manager passes the current access token to this function, stores the returned token, and updates the user when one is returned. Failed renewal clears the session. Calling `refresh()` without a configured handler rejects with a configuration error and leaves the current session intact.

Core's `createHttpClient` can use the same manager for automatic retries after a `401` response:

```ts
import { createHttpClient } from "@auth-toolkit/core";

const client = new createHttpClient({
  baseUrl: "/api",
  storage: tokenStore,
  onRefresh: () => authManager.refresh(),
  onLogout: () => authManager.logout(),
});
```

The app must provide its own backend refresh handler; the toolkit does not define an endpoint.
