// Providers
export { AuthProvider } from './providers/AuthProvider';
export type { AuthManagerLike, AuthProviderProps } from './providers/AuthProvider';

// Hooks
export { useAuth } from './hooks/useAuth';
export type { AuthContextValue } from './context/AuthContext';
export { useAuthRedirect } from './hooks/useAuthRedirect';
export type { UseAuthRedirectReturn } from './hooks/useAuthRedirect';
export { useApi } from './hooks/useApi';
export type { UseApiReturn, HttpClient } from './hooks/useApi';
export { useCan, useHasRole, useHasAnyRole } from './hooks/useRbac';

// Route Protection Components
export { RequireAuth } from './components/RequireAuth';
export type { RequireAuthProps } from './components/RequireAuth';
export { RequireGuest } from './components/RequireGuest';
export type { RequireGuestProps } from './components/RequireGuest';

// RBAC Component
export { Can } from './components/Can';
export type { CanProps, AuthUser } from './components/Can';

// Error Boundary
export { AuthErrorBoundary } from './components/AuthErrorBoundary';
export type { AuthErrorBoundaryProps } from './components/AuthErrorBoundary';
export { withAuthErrorBoundary } from './components/AuthErrorBoundary';

// Factories
export { createAuthManager } from './factories/createAuthManager';
export type { CreateAuthManagerOptions } from './factories/createAuthManager';

// Navigation Utilities
export { navigate, getCurrentPath, isCurrentPath, setNavigationAdapter } from './utils/navigation';
export type { NavigationAdapter } from './utils/navigation';

// SSR Utilities
export {
  createServerAuth,
  createAuthMiddleware,
  getTokenFromRequest,
  setAuthCookie,
  clearAuthCookie,
  type ServerAuthResult,
  type AuthMiddlewareOptions,
} from './utils/ssr';
