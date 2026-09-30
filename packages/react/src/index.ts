// Providers
export { AuthProvider } from "./providers/AuthProvider";
export type { AuthManagerLike, AuthProviderProps } from "./providers/AuthProvider";

// Hooks
export { useAuth } from "./hooks/useAuth";
export type { AuthContextValue } from "./context/AuthContext";
export { useAuthRedirect } from "./hooks/useAuthRedirect";
export type { UseAuthRedirectReturn } from "./hooks/useAuthRedirect";
export { useApi } from "./hooks/useApi";
export type { UseApiReturn, HttpClient } from "./hooks/useApi";
export { useCan, useHasRole, useHasAnyRole } from "./hooks/useRbac";

// Route Protection Components
export { RequireAuth } from "./components/RequireAuth";
export type { RequireAuthProps } from "./components/RequireAuth";
export { RequireGuest } from "./components/RequireGuest";
export type { RequireGuestProps } from "./components/RequireGuest";

// RBAC Component
export { Can } from "./components/Can";
export type { CanProps, AuthUser } from "./components/Can";

// Navigation Utilities
export {
  navigate,
  getCurrentPath,
  isCurrentPath,
  setNavigationAdapter,
} from "./utils/navigation";
export type { NavigationAdapter } from "./utils/navigation";

// SSR Utilities
export {
  createServerAuth,
  createNextServerAuth,
  createAuthMiddleware,
  getTokenFromRequest,
  setAuthCookie,
  clearAuthCookie,
  type ServerAuthResult,
  type AuthMiddlewareOptions,
} from "./utils/ssr";
