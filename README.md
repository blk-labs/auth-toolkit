<<<<<<< Updated upstream
# auth-toolkit
=======
# Auth Toolkit 🛠️

A professional, modular authentication toolkit designed for modern web applications. This monorepo contains a framework-agnostic core engine and specialized UI wrappers.

## ⚠️ The Problem

Authentication is deceptively complex. Developers often struggle with:
- **Token Refreshing:** Handling concurrent 401 errors without multiple refresh calls.
- **Storage Tradeoffs:** Balancing security (XSS/CSRF) with persistence.
- **Framework Locking:** Rewriting auth logic every time you switch from React to Vue or Svelte.

## ✨ Features

- **Framework-Agnostic Core:** Pure TypeScript logic for state and token management.
- **Automatic Token Refresh:** Intelligent HTTP client that queues requests during a refresh cycle.
- **Modular Storage:** Pluggable backends for `localStorage`, `sessionStorage`, or `In-Memory` (the most secure).
- **TypeScript First:** Comprehensive types for user models and auth states.
- **React Ready:** (Planned) Hook-based integration for seamless React development.

---

## 🚀 Quick Start

### 1. Installation

```bash
npm install @auth-toolkit/core
```

### 2. Basic Setup

```typescript
import { AuthManager, WebStorageTokenStore } from '@auth-toolkit/core';

// 1. Choose a storage engine
const storage = new WebStorageTokenStore(localStorage);

// 2. Initialize the manager
const auth = new AuthManager(storage);

// 3. (Optional) Setup the HTTP client for automatic refreshes
const client = new createHttpClient({
  baseUrl: 'https://api.myapp.com',
  storage,
  onRefresh: async () => {
    const res = await fetch('/api/refresh', { method: 'POST' });
    const data = await res.json();
    return data.accessToken;
  },
  onLogout: () => {
    auth.logout();
    window.location.href = '/login';
  }
});

// 4. Use it!
await auth.login({ id: 1, name: 'John Doe' }, 'ey...token');
```

---

## 📖 Documentation

- [Architecture](./docs/architecture.md)
- [Token Storage Tradeoffs](./docs/guides/token-storage.md)
- [React Integration](./docs/guides/react-integration.md)
- [Custom Backend Guide](./docs/guides/custom-backend.md)
>>>>>>> Stashed changes
