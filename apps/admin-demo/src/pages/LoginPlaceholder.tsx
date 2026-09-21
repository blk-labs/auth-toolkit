import { useAuth } from "@blk-auth-toolkit/react";
import { demoAdmin, type AdminUser } from "../auth";
import { navigateTo } from "../navigation";

export function LoginPlaceholder() {
  const { login } = useAuth<AdminUser>();

  async function enterDemo() {
    await login(demoAdmin, "demo-access-token");
    navigateTo("/dashboard", true);
  }

  return (
    <main className="login-screen">
      <div className="login-card">
        <div className="brand-mark brand-mark-large" aria-hidden="true">B</div>
        <p className="eyebrow">Auth Toolkit · Demo app</p>
        <h1>Admin dashboard preview</h1>
        <p className="login-description">
          This is just a placeholder, joe you can replace this with your own login form .
        </p>
        <button type="button" className="button button-primary button-wide" onClick={enterDemo}>
          Enter as demo admin <span aria-hidden="true">→</span>
        </button>
        <p className="login-note">Demo access lives only in this browser tab and ends when you reload.</p>
      </div>
    </main>
  );
}
