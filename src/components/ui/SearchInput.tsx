interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function SearchInput({ label, className = "", id, ...props }: SearchInputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-ink-soft">
          {label}
        </label>
      )}
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone" aria-hidden="true">🔎</span>
        <input
          id={inputId}
          type="search"
          className={`w-full rounded-lg border border-line bg-surface py-2 pl-9 pr-3 text-sm text-ink placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand/60 transition-colors ${className}`}
          {...props}
        />
      </div>
    </div>
  );
}
