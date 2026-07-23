import type { PropsWithChildren } from 'react';
import QueryProvider from './providers/QueryProvider';
import { ThemeProvider } from '@/shared/theme/ThemeProvider';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorState from '@/shared/components/feedback/ErrorState';
import { Toaster } from 'react-hot-toast';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary
      onReset={() => {
        window.location.replace('/');
      }}
      FallbackComponent={ErrorState}
    >
      <QueryProvider>
        <ThemeProvider>
          {children}
          <Toaster
            gutter={12}
            containerStyle={{ margin: '2px' }}
            toastOptions={{
              success: {
                duration: 3000,
                style: {
                  background: '#4caf50',
                  color: 'white',
                },
              },
              error: {
                duration: 5000,
                style: {
                  background: '#ef4444',
                  color: 'white',
                },
              },
              style: {
                fontSize: '12px',
                maxWidth: '500px',
                padding: '16px 24px',
              },
            }}
          />
        </ThemeProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
}
