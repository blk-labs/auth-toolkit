import { AuthProvider } from '@auth-toolkit/react';
import { RouterProvider } from 'react-router-dom';

import { authManager } from './auth';
import QueryProvider from './providers/QueryProvider';
import { router } from './routes';

export function App() {
  return (
    <AuthProvider authManager={authManager}>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </AuthProvider>
  );
}
