import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "./AuthLayout";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { AuthError, useAuth } from "../../store/AuthContext";
import { useLanguage } from "../../i18n";

export function RegisterPage() {
  const { t } = useLanguage();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [familyName, setFamilyName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      register(familyName, fullName, email, password);
      navigate("/", { replace: true });
    } catch (err) {
      if (err instanceof AuthError) {
        const map: Record<string, string> = {
          family_name_required: t.validation.familyNameRequired,
          full_name_required: t.validation.required,
          invalid_email: t.validation.invalidEmail,
          password_too_short: t.validation.minChars8,
        };
        setError(map[err.message] ?? t.auth.genericError);
      } else {
        setError(t.auth.genericError);
      }
    }
  }

  return (
    <AuthLayout title={t.auth.registerTitle} subtitle={t.auth.registerSubtitle}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input label={t.common.familyName} value={familyName} onChange={(e) => setFamilyName(e.target.value)} required />
        <Input label={t.common.fullName} value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        <Input label={t.common.email} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input label={t.common.password} type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="text-sm text-danger">{error}</p>}
        <p className="text-xs text-ink-soft">{t.auth.registerWipeHint}</p>
        <Button type="submit" className="w-full justify-center">{t.auth.registerButton}</Button>
      </form>
      <div className="mt-4 text-center text-xs">
        <Link to="/login" className="text-brand hover:underline">{t.auth.haveAccountLink}</Link>
      </div>
    </AuthLayout>
  );
}
