# Custom Backend Integration Guide 🔌

The Auth Toolkit is designed to be completely backend-agnostic. This guide explains how to connect it to your custom API.

## 🚀 Setting Up the HTTP Client

The `createHttpClient` utility is the key to connecting the toolkit to your backend.

### 1. Basic Configuration

```typescript
import { createHttpClient, WebStorageTokenStore } from '@auth-toolkit/core';

const storage = new WebStorageTokenStore(localStorage);

const client = new createHttpClient({
  baseUrl: 'https://api.yourdomain.com/v1',
  storage,
  
  // Callback triggered when a 401 is received
  onRefresh: async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await fetch('https://api.yourdomain.com/v1/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });

    if (!response.ok) throw new Error('Refresh failed');
    
    const { accessToken } = await response.json();
    return accessToken;
  },

  // Callback triggered when refresh fails
  onLogout: () => {
    console.warn('Session expired. Redirecting to login.');
    window.location.href = '/login';
  }
});
```

### 2. Making Requests

Once configured, use the `client.request()` method. It automatically:
1. Attaches the `Authorization: Bearer <token>` header if a token exists.
2. Handles 401 errors by triggering a refresh and retrying the request.
3. Handles concurrent 401s by queueing requests until the refresh is complete.

```typescript
const fetchUserProfile = async () => {
  try {
    const response = await client.request('/users/me');
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Request failed after refresh attempt:', error);
  }
};
```

### 3. Tips for Backend Compatibility

- **CORS:** Ensure your backend allows `Authorization` headers.
- **Refresh Endpoint:** Your refresh endpoint should be accessible without an access token (usually via a refresh token in the body or a cookie).
- **Error Codes:** The client specifically looks for `401 Unauthorized` to trigger the refresh cycle. Ensure your backend returns this status code consistently for expired tokens.
