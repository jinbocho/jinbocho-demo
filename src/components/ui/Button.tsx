interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
  children: React.ReactNode;
}

const VARIANT_STYLES = {
  primary: "bg-brand text-white hover:bg-brand/90 active:bg-brand/80",
  secondary: "bg-surface border border-line text-ink hover:bg-paper active:bg-line",
  ghost: "text-ink-soft hover:text-ink hover:bg-paper active:bg-line",
  danger: "bg-danger text-white hover:bg-danger/90 active:bg-danger/80",
};

const SIZE_STYLES = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center gap-1.5 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 disabled:opacity-50 disabled:cursor-not-allowed ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
