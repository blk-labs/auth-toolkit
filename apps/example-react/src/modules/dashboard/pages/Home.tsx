import useAuth from '@/modules/auth/hooks/useAuth';
import { PageHeader } from '@/shared/components/layout';

export function Home() {
  const { state } = useAuth();

  return (
    <section className="w-full">
      <PageHeader title={`Welcome ${state.user?.firstName ?? "User"}`} />
    </section>
  );
}
