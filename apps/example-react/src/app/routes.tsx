import { Login } from '@/modules/auth';
import { Home, Admin } from '@/modules/dashboard';
import { NotFound } from '@/modules/errors';
import { AppLayout } from '@/shared/components/layout';
import { createBrowserRouter, Outlet } from 'react-router-dom';

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'admin',
        element: <Admin />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
