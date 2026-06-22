import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "./AuthLayout";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { AuthError, useAuth } from "../../store/AuthContext";
import { useLanguage } from "../../i18n";

export function ResetPasswordPage() {
  const { t } = useLanguage();
  const { resetPassword } = useAuth();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      resetPassword(password, confirm);
      setDone(true);
    } catch (err) {
      if (err instanceof AuthError && err.message === "passwords_mismatch") setError(t.validation.passwordsMismatch);
      else setError(t.validation.minChars8);
    }
  }

  if (done) {
    return (
      <AuthLayout title={t.auth.resetTitle}>
        <p className="text-sm text-ink-soft">{t.auth.resetSuccess}</p>
        <Link to="/login" className="mt-4 block">
          <Button className="w-full justify-center">{t.auth.goToLoginButton}</Button>
        </Link>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title={t.auth.resetTitle} subtitle={t.auth.resetSubtitle}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input label={t.auth.newPasswordLabel} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Input label={t.auth.confirmPasswordLabel} type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
        {error && <p className="text-sm text-danger">{error}</p>}
        <Button type="submit" className="w-full justify-center">{t.auth.resetButton}</Button>
      </form>
    </AuthLayout>
  );
}
