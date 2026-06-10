import type { ReadingStatus } from "../../data/types";

type BadgeVariant = ReadingStatus | "info" | "danger";

const STYLES: Record<BadgeVariant, string> = {
  read: "bg-sage/20 text-sage border border-sage/30",
  reading: "bg-amber/20 text-amber border border-amber/30",
  to_read: "bg-stone/20 text-stone border border-stone/30",
  info: "bg-brand/10 text-brand border border-brand/20",
  danger: "bg-danger/10 text-danger border border-danger/20",
};

const LABELS: Record<BadgeVariant, string> = {
  read: "Letto",
  reading: "In lettura",
  to_read: "Da leggere",
  info: "Info",
  danger: "Attenzione",
};

interface BadgeProps {
  variant: BadgeVariant;
  children?: React.ReactNode;
}

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${STYLES[variant]}`}
    >
      {children ?? LABELS[variant]}
    </span>
  );
}
