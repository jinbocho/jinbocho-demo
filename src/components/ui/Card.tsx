interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = "", onClick }: CardProps) {
  return (
    <div
      className={`bg-surface rounded-xl border border-line p-4 ${onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""} ${className}`}
      style={{ boxShadow: "var(--shadow-card)" }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
