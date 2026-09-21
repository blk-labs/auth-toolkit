import { useEffect, useState } from "react";
import { AuthProvider, RequireAuth, RequireGuest } from "@blk-auth-toolkit/react";
import { authManager } from "./auth";
import { navigateTo } from "./navigation";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPlaceholder } from "./pages/LoginPlaceholder";

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
        <LoginPlaceholder />
      </RequireGuest>
    );
  }

  if (pathname === "/" || pathname === "/dashboard") {
    return (
      <RequireAuth redirectTo="/login" loading={<div className="page-loading">Loading your dashboard…</div>}>
        <DashboardPage />
      </RequireAuth>
    );
  }

  return (
    <main className="not-found">
      <p className="eyebrow">Page not found</p>
      <h1>There’s nothing here.</h1>
      <button type="button" className="button button-primary" onClick={() => navigateTo("/dashboard")}>
        Go to dashboard
      </button>
    </main>
  );
}

export function App() {
  return (
    <AuthProvider authManager={authManager}>
      <Routes />
    </AuthProvider>
  );
}
