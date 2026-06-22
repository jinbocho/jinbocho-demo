interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Checkbox({ label, className = "", id, ...props }: CheckboxProps) {
  const checkboxId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <label htmlFor={checkboxId} className="flex cursor-pointer items-center gap-2 text-sm text-ink">
      <input
        id={checkboxId}
        type="checkbox"
        className={`h-4 w-4 rounded border-line text-brand focus:ring-2 focus:ring-brand/40 ${className}`}
        {...props}
      />
      {label}
    </label>
  );
}
