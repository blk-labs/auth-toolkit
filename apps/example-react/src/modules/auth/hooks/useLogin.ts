import { useMutation, type UseMutateFunction } from '@tanstack/react-query';
import { AuthLogin } from '..';
import toast from 'react-hot-toast';
import type { LoginRequestBody, AuthResponse } from '../types';

export default function useLogin(): { login: UseMutateFunction<BaseBackendResponse<AuthResponse> | undefined, Error, LoginRequestBody>; isPending: boolean } {
  const { mutate, isPending } = useMutation({
    mutationFn: AuthLogin,

    onError: (err) => {
      toast.error(err.message || 'An error occurred');
    },
  });

  return { login: mutate, isPending };
}
