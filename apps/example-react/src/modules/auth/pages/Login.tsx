import { z } from 'zod';
import Button from '@/shared/components/Button';
import Input from '@/shared/components/Input';
import FormInput from '@/shared/components/common/FormInput';
import useLogin from '../hooks/useLogin';

const loginSchema = z.object({
  email: z.email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function Login() {
  const { isPending, login } = useLogin();

  const handleLogin = (data: LoginFormValues) => {
    login(data);
  };

  return (
    <section className="w-full flex-center h-screen fading-grid bg-secondary text-white">
      <div className="p-6 pb-10 ring bg-black ring-gray flex items-center flex-col rounded-lg w-full max-w-md gap-4">
        <h2 className="font-medium text-2xl mb-5">Sign In</h2>
        <FormInput
          schema={loginSchema}
          onsubmit={handleLogin}
          config={{ className: 'flex flex-col gap-5 w-full' }}
        >
          {({ register, formState: { errors, isValid } }) => (
            <>
              <Input
                type="email"
                placeholder="Email Address"
                {...register('email')}
                error={errors.email?.message}
              />
              <Input
                type="password"
                placeholder="Password"
                {...register('password')}
                error={errors.password?.message}
              />
              <Button
                loading={isPending}
                type="submit"
                className="mt-2 w-full"
                disabled={!isValid || isPending}
              >
                Login
              </Button>
            </>
          )}
        </FormInput>
      </div>
    </section>
  );
}
