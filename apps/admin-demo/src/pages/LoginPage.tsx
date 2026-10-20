import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Input } from '../components/Input';
import { InlineLoader } from '../components/Loader';
import { useLogin } from '../hooks/useSession';

const loginSchema = z.object({
  email: z.email('Enter a valid email address').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginPage() {
  const { isPending, mutate } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(data: LoginFormData) {
    mutate(data);
  }

  return (
    <main className="login-screen">
      <div className="login-card">
        <div className="brand-mark brand-mark-large" aria-hidden="true">
          B
        </div>
        <p className="eyebrow">Auth Toolkit · Demo app</p>
        <h1>Sign in to your account</h1>
        <p className="login-description">Enter your credentials to access the admin dashboard.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="login-form" noValidate>
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />

          <div className="login-options">
            <label className="checkbox-wrapper">
              <input type="checkbox" className="checkbox" />
              <span className="checkbox-label">Remember me</span>
            </label>
            <a href="#" className="forgot-link">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="button button-primary button-wide"
            disabled={isSubmitting || isPending}
          >
            {isSubmitting || isPending ? <InlineLoader color="white" /> : 'Sign in'}
            <span aria-hidden="true">→</span>
          </button>
        </form>
      </div>
    </main>
  );
}
