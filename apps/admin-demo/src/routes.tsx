import { createBrowserRouter } from "react-router-dom";
import { RequireAuth, RequireGuest } from "@blk-auth-toolkit/react";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { UserPage } from "./pages/UserPage";
import AuthRedirect from "./pages/authRedirect";
import { PageLoader } from "./components/Loader";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <RequireGuest redirectTo="/">
        <LoginPage />
      </RequireGuest>
    ),
  },
  {
    path: "/admin",
    element: (
      <RequireAuth redirectTo="/login" loading={<PageLoader />}>
        <DashboardPage />
      </RequireAuth>
    ),
  },
  {
    path: "/",
    element: (
      <RequireAuth redirectTo="/login" loading={<PageLoader />}>
        <UserPage />
      </RequireAuth>
    ),
  },
  {
    path: "/auth-redirect",
    element: <AuthRedirect />,
  },
]);
