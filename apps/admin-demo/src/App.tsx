import { useEffect, useState } from "react";
import {
  AuthProvider,
  RequireAuth,
  RequireGuest,
} from "@blk-auth-toolkit/react";
import { authManager } from "./auth";
import { navigateTo } from "./navigation";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";
import { UserPage } from "./pages/UserPage";
import AuthRedirect from "./pages/authRedirect";
import QueryProvider from "./providers/QueryProvider";

function Routes() {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const updatePath = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", updatePath);
    return () => window.removeEventListener("popstate", updatePath);
  }, []);

  if (pathname === "/login") {
    return (
      <RequireGuest redirectTo="/dashboard">
        <LoginPage />
      </RequireGuest>
    );
  }

  if (pathname === "/" || pathname === "/dashboard") {
    return (
      <RequireAuth
        redirectTo="/login"
        loading={<div className="page-loading">Loading your dashboard…</div>}
      >
        <DashboardPage />
      </RequireAuth>
    );
  }

  if (pathname === "/user") {
    return (
      <RequireAuth
        redirectTo="/login"
        loading={<div className="page-loading">Loading your account…</div>}
      >
        <UserPage />
      </RequireAuth>
    );
  }

  if (pathname === "/auth-redirect") {
    return <AuthRedirect />;
  }

  return (
    <main className="not-found">
      <p className="eyebrow">Page not found</p>
      <h1>There’s nothing here.</h1>
      <button
        type="button"
        className="button button-primary"
        onClick={() => navigateTo("/dashboard")}
      >
        Go to dashboard
      </button>
    </main>
  );
}

export function App() {
  return (
    <AuthProvider<User> authManager={authManager}>
      <QueryProvider>
        <Routes />
      </QueryProvider>
    </AuthProvider>
  );
}
