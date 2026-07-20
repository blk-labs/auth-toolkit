# React Integration Guide ⚛️

Integrating Auth Toolkit with React is straightforward using the core logic. While a specialized `@auth-toolkit/react` package is in development, you can easily set up your own provider.

## 🚀 Step-by-Step Integration

### 1. Install the Core Package
```bash
npm install @auth-toolkit/core
```

### 2. Create the AuthProvider
Wrap your application in a custom context to provide the `AuthManager` instance.

```tsx
// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthManager, WebStorageTokenStore, AuthState } from '@auth-toolkit/core';

const storage = new WebStorageTokenStore(localStorage);
const authManager = new AuthManager(storage);

const AuthContext = createContext<{
  state: AuthState;
  login: (user: any, token: string) => Promise<void>;
  logout: () => void;
} | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState(authManager.getState());

  useEffect(() => {
    // Subscribe to state changes in the core manager
    const unsubscribe = authManager.subscribe((newState) => {
      setState(newState);
    });

    // Initial check (rehydrate session)
    authManager.bootstrapAuth();

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ 
      state, 
      login: authManager.login.bind(authManager), 
      logout: authManager.logout.bind(authManager) 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 3. Use the `useAuth` Hook
Create a simple hook to consume the context.

```tsx
// src/hooks/useAuth.ts
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
```

### 4. Protect a Route
Create a wrapper component for protected pages.

```tsx
// src/components/ProtectedRoute.tsx
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { state } = useAuth();

  if (state.status === 'loading') return <div>Loading...</div>;
  if (state.status === 'unauthenticated') return <Navigate to="/login" />;

  return <>{children}</>;
};
```

### 5. Putting it all Together
```tsx
// src/App.tsx
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
```
