import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@blk-auth-toolkit/react";
import { navigateTo } from "../navigation";
import { Input } from "../components/Input";

const loginSchema = z.object({
  email: z.email("Enter a valid email address").min(1, "Email is required"),
  password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginPage() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    try {
      await login({ id: "user", name: "", email: data.email, role: "member" }, "demo-token");
      navigateTo("/user", true);
    } catch {
      // Error handled by auth provider
    }
  }

  return (
    <main className="login-screen">
      <div className="login-card">
        <div className="brand-mark brand-mark-large" aria-hidden="true">B</div>
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
            {...register("email")}
          />

          <Input
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="login-options">
            <label className="checkbox-wrapper">
              <input type="checkbox" className="checkbox" />
              <span className="checkbox-label">Remember me</span>
            </label>
            <a href="#" className="forgot-link">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="button button-primary button-wide"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in…" : "Sign in"}
            <span aria-hidden="true">→</span>
          </button>
        </form>

      </div>
    </main>
  );
}