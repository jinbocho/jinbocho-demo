import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "./AuthLayout";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { AuthError, useAuth } from "../../store/AuthContext";
import { useLanguage } from "../../i18n";

export function ForgotPasswordPage() {
  const { t } = useLanguage();
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(err instanceof AuthError ? t.validation.invalidEmail : t.auth.genericError);
    }
  }

  if (sent) {
    return (
      <AuthLayout title={t.auth.forgotTitle}>
        <p className="text-sm text-ink-soft">{t.auth.forgotSuccess}</p>
        <Link to="/login" className="mt-4 block text-center text-sm text-brand hover:underline">{t.auth.backToLoginLink}</Link>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title={t.auth.forgotTitle} subtitle={t.auth.forgotSubtitle}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input label={t.common.email} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        {error && <p className="text-sm text-danger">{error}</p>}
        <Button type="submit" className="w-full justify-center">{t.auth.forgotButton}</Button>
      </form>
      <div className="mt-4 text-center text-xs">
        <Link to="/login" className="text-brand hover:underline">{t.auth.backToLoginLink}</Link>
      </div>
    </AuthLayout>
  );
}
