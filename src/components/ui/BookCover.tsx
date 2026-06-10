import { useState } from "react";

interface BookCoverProps {
  url?: string | null;
  title?: string | null;
  className?: string;
}

export function BookCover({ url, title, className = "h-16 w-12" }: BookCoverProps) {
  const [failed, setFailed] = useState(false);
  const showImage = url && !failed;

  if (showImage) {
    return (
      <img
        src={url}
        alt={title ? `Cover: ${title}` : "Book cover"}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`rounded-sm object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`grid place-items-center rounded-sm bg-brand/10 text-brand ${className}`}
    >
      <span className="text-lg">📖</span>
    </div>
  );
}
