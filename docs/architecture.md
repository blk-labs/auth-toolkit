# Architecture Guide 🏛️

The Auth Toolkit is built with separation of concerns as its primary goal.

## 📦 Core vs UI Packages

The toolkit is split into two layers:

### 1. `@auth-toolkit/core`
The **"Brain"** of the system.
- **Pure Logic:** No framework dependencies (React, Vue, etc.) or DOM requirements.
- **AuthManager:** Manages authentication state (status, current user) and provides a simple pub/sub system.
- **Storage Abstractions:** A common interface for persisting tokens, allowing you to swap between `Memory`, `LocalStorage`, or even custom implementations.
- **HTTP Middleware:** Framework-agnostic client to handle 401s and token refreshes.

### 2. `@auth-toolkit/react` (Planned)
The **"UI Layer"** of the system.
- **Context API:** Wraps the `AuthManager` into a React Context.
- **Hooks:** Provides `useAuth()` for easy access to state and methods.
- **Protection Components:** `<ProtectedRoute />` components for easy routing.

---

## ⚡ Refresh Queue Design Decision

One of the hardest parts of auth is handling multiple failing requests. If a user opens 5 tabs and all their tokens expire, you don't want 5 simultaneous refresh requests.

**Our Solution:**
The `createHttpClient` uses a **Queueing Mechanism**:

1. When a 401 error is received, the client checks if a refresh is already in progress.
2. **If not:** It marks `isRefreshing = true` and calls the provided `onRefresh` callback.
3. **If yes:** It adds the failed request to a `refreshSubscribers` queue as a `Promise`.
4. Once the refresh completes successfully, all queued requests are resolved with the new token and automatically retried.
5. If the refresh fails, all queued requests are rejected, and the session is cleared.

---

## 💾 Token Storage Tradeoffs

Storage is abstracted through the `TokenStore` interface:

```typescript
export interface TokenStore {
  getAccessToken(): string | null;
  setAccessToken(token: string): void;
  clear(): void;
}
```

This allows developers to choose the security model that fits their threat model:
- **MemoryTokenStore:** Safe from XSS/CSRF but doesn't survive page refreshes.
- **WebStorageTokenStore:** Persists across refreshes (using `localStorage` or `sessionStorage`) but is more vulnerable to XSS.
