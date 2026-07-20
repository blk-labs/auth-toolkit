# Token Storage Guide 💾

Choosing where to store your access tokens is a critical security decision. Auth Toolkit provides multiple options out of the box.

## 🏢 In-Memory Storage (`MemoryTokenStore`)

**Use this when:** You prioritize maximum security over user convenience.

### Pros
- **Immune to XSS:** Even if an attacker injects a script, they cannot access the memory of your application to steal the token.
- **Immune to CSRF:** Since the token isn't in a cookie or storage that's automatically sent, it can't be misused by cross-site requests.

### Cons
- **Doesn't Survive Refresh:** If the user hits F5, the token is gone, and they'll need to log in again (unless you have a silent-refresh mechanism with an HttpOnly cookie).

```typescript
import { AuthManager, MemoryTokenStore } from '@auth-toolkit/core';

const storage = new MemoryTokenStore();
const auth = new AuthManager(storage);
```

---

## 🌐 Web Storage (`WebStorageTokenStore`)

**Use this when:** You need the session to persist across page refreshes and browser restarts.

### Pros
- **Persistent:** Surrounding a page refresh doesn't log the user out.
- **Convenient:** Works seamlessly with `localStorage` or `sessionStorage`.

### Cons
- **Vulnerable to XSS:** Any script running on your page can access `localStorage` and steal the token.

```typescript
import { AuthManager, WebStorageTokenStore } from '@auth-toolkit/core';

// Pass localStorage or sessionStorage
const storage = new WebStorageTokenStore(localStorage);
const auth = new AuthManager(storage);
```

---

## 🏗️ Building a Custom Store

You can implement the `TokenStore` interface to create your own storage logic (e.g., using IndexedDB or a specialized mobile storage).

```typescript
import { TokenStore } from '@auth-toolkit/core';

class MyCustomStore implements TokenStore {
  getAccessToken() { /* custom logic */ }
  setAccessToken(token: string) { /* custom logic */ }
  clear() { /* custom logic */ }
}
```

## 🔐 Security Recommendations

1. **Short-lived Access Tokens:** Regardless of storage, keep access tokens short-lived (e.g., 5-15 minutes).
2. **HttpOnly Cookies for Refresh Tokens:** The safest architecture uses `MemoryTokenStore` for access tokens and a secure, `HttpOnly` cookie for refresh tokens.
3. **Avoid LocalStorage for Sensitive Data:** Never store personally identifiable information (PII) in `localStorage`.
