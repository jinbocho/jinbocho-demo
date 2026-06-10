interface AvatarProps {
  name: string;
  color: string;
  size?: "sm" | "md" | "lg";
}

const SIZE_STYLES = {
  sm: "w-7 h-7 text-xs",
  md: "w-9 h-9 text-sm",
  lg: "w-12 h-12 text-base",
};

export function Avatar({ name, color, size = "md" }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full font-semibold text-white flex-shrink-0 ${SIZE_STYLES[size]}`}
      style={{ backgroundColor: color }}
      title={name}
    >
      {initials}
    </div>
  );
}
