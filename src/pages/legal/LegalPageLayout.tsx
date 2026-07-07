import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n";

export function LegalPageLayout({
  title,
  version,
  children,
}: {
  title: string;
  version: string;
  children: ReactNode;
}) {
  const { t } = useLanguage();
  return (
    <div className="min-h-dvh bg-paper px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <Link to="/login" className="text-sm text-brand hover:underline">
          {t.common.back}
        </Link>
        <div className="mt-4 rounded-lg border border-line bg-surface p-6 shadow-card">
          <div className="mb-4 rounded-md border border-amber/40 bg-amber/10 p-3 text-sm text-ink-soft">
            {t.legal.common.draftNotice(version)}
          </div>
          <h1 className="font-display text-2xl font-semibold text-ink">{title}</h1>
          <div className="prose prose-sm mt-4 max-w-none space-y-4 text-ink-soft">{children}</div>
        </div>
      </div>
    </div>
  );
}
