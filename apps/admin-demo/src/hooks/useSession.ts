import { useApi, useAuth } from "@blk-auth-toolkit/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthLogin } from "../api/login";
import { toast } from "react-hot-toast";
import { navigateTo } from "../navigation";

export default function useSession() {
  const { get } = useApi();
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["user-session"],
    queryFn: () => get<BaseBackendResponse<User>>("/api/session"),
  });

  const session = data;

  return { session, isLoading, refetch, error };
}

export function useLogin() {
  const { login } = useAuth();
  const { mutate, isPending } = useMutation({
    mutationFn: AuthLogin,

    onSuccess: async (data) => {
      const res = data.data;
      await login(res.user, res.accessToken);
      navigateTo("/auth-redirect", true);
    },

    onError: (err) => toast.error(err.message),
  });

  return { mutate, isPending };
}
