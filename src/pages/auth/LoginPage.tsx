import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthLayout } from "./AuthLayout";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { AuthError, useAuth } from "../../store/AuthContext";
import { useLanguage } from "../../i18n";

export function LoginPage() {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      login(email, password);
      const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? "/";
      navigate(from, { replace: true });
    } catch (err) {
      if (err instanceof AuthError && err.message === "inactive_account") setError(t.auth.inactiveAccount);
      else setError(t.auth.invalidCredentials);
    }
  }

  return (
    <AuthLayout title={t.auth.loginTitle} subtitle={t.auth.loginSubtitle}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input label={t.common.email} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input label={t.common.password} type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="text-sm text-danger">{error}</p>}
        <Button type="submit" className="w-full justify-center">{t.auth.loginButton}</Button>
      </form>
      <div className="mt-4 rounded-md bg-paper px-3 py-2 text-xs text-ink-soft">
        <p className="font-medium text-ink">{t.auth.demoHintTitle}</p>
        <p>{t.auth.demoHintBody}</p>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs">
        <Link to="/forgot-password" className="text-ink-soft hover:text-brand transition-colors">{t.auth.forgotPasswordLink}</Link>
        <Link to="/register" className="text-brand hover:underline">{t.auth.registerLink}</Link>
      </div>
    </AuthLayout>
  );
}
