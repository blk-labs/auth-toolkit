import { AuthProvider } from '@auth-toolkit/react';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';

import { authManager } from './auth';
import QueryProvider from './providers/QueryProvider';
import { router } from './routes';

export function App() {
  return (
    <AuthProvider authManager={authManager}>
      <QueryProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </QueryProvider>
    </AuthProvider>
  );
}
