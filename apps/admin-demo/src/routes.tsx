import { RequireAuth } from '@auth-toolkit/react';
import { createBrowserRouter } from 'react-router-dom';

import { PageLoader } from './components/Loader';
import AuthRedirect from './pages/authRedirect';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { UserPage } from './pages/UserPage';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
        <LoginPage />
    ),
  },
  {
    path: '/admin',
    element: (
      <RequireAuth redirectTo="/login" loading={<PageLoader />}>
        <DashboardPage />
      </RequireAuth>
    ),
  },
  {
    path: '/',
    element: (
      <RequireAuth redirectTo="/login" loading={<PageLoader />}>
        <UserPage />
      </RequireAuth>
    ),
  },
  {
    path: '/auth-redirect',
    element: <AuthRedirect />,
  },
]);
