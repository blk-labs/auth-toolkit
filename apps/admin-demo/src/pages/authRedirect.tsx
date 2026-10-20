import { useAuth } from '@auth-toolkit/react';
import { Navigate } from 'react-router-dom';

import { PageLoader } from '../components/Loader';

export default function AuthRedirect() {
  const { user, status } = useAuth<User>();

  if (status === 'loading') {
    return <PageLoader />;
  }

  if (!user) {
    return <Navigate to={'/login'} replace />;
  }

  if (user.role === 'admin') {
    return <Navigate to={'/admin'} replace />;
  }

  return <Navigate to={'/user'} replace />;
}
