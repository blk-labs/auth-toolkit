import { useAuth, useAuthRedirect } from '@auth-toolkit/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { AuthLogin } from '../api/login';
import { navigate } from '../navigation';

import useFetch from './useFetch';

export default function useSession() {
  const { get } = useFetch();
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ['user-session'],
    queryFn: async () => {
      const res = await get('/api/session');
      return res.json() as Promise<BaseBackendResponse<User>>;
    },
  });

  const session = data;

  console.log({ data });

  return { session, isLoading, refetch, error };
}

export function useLogin() {
  const { login } = useAuth();
  const { consumeReturnTo } = useAuthRedirect();
  const { mutate, isPending } = useMutation({
    mutationFn: AuthLogin,

    onSuccess: async (data) => {
      const res = data.data;
      await login(res.user, res.accessToken);
      const returnTo = consumeReturnTo();
      navigate(returnTo || '/', true);
    },

    onError: (err) => toast.error(err.message),
  });

  return { mutate, isPending };
}
