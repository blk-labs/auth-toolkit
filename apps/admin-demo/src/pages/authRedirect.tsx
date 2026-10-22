import { useAuth, useHasRole, type AuthUser } from '@auth-toolkit/react';
import { Navigate } from 'react-router-dom';

import { PageLoader } from '../components/Loader';

export default function AuthRedirect() {
  const { user, status } = useAuth<AuthUser>();
  const checkRole = useHasRole();


  console.log('user:', user, 'checkRole admin:', checkRole('admin'));

  if (status === 'loading') {
    return <PageLoader />;
  }

  if (!user) {
    return <Navigate to={'/login'} replace />;
  }

  if (checkRole('admin')) {
    return <Navigate to={'/admin'} replace />;
  }

  // return <Navigate to={'/'} replace />;
}
