// Providers
export { AuthProvider } from "./providers/AuthProvider";
export type { AuthProviderProps } from "./providers/AuthProvider";

// Hooks
export { useAuth } from "./hooks/useAuth";
export type { AuthContextValue } from "./context/AuthContext";
export { useAuthRedirect } from "./hooks/useAuthRedirect";
export type { UseAuthRedirectReturn } from "./hooks/useAuthRedirect";
export { useApi } from "./hooks/useApi";
export type { UseApiReturn, HttpClient } from "./hooks/useApi";

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