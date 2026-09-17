import type { PropsWithChildren } from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import Loader from '@/shared/components/feedback/Loader';

export default function AuthGuard({ children }: PropsWithChildren) {
  const { state } = useAuth();

  if (state.status === 'loading') return <Loader />;
  if (state.status === 'unauthenticated') return <Navigate to="/login" replace />;

  return <>{children}</>;
}
