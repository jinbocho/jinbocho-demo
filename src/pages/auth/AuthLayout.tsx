import type { ReactNode } from "react";
import { Card } from "../../components/ui/Card";

export function AuthLayout({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-paper px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <span className="font-display text-2xl font-semibold text-brand">Jinbocho</span>
          {subtitle && <p className="mt-1 text-sm text-ink-soft">{subtitle}</p>}
        </div>
        <Card className="p-6">
          <h1 className="mb-4 font-display text-lg font-semibold text-ink">{title}</h1>
          {children}
        </Card>
      </div>
    </div>
  );
}
