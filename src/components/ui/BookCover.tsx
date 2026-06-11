import { useState } from "react";

const BG_COLORS = [
  "7C4B2A", "2A5C8C", "3D7A50", "7C2D5A",
  "6B5C2A", "8C3838", "5C3D7C", "2A7C6B",
  "1b3a5c", "8b4513", "2d5016", "4a0000",
];

function hashIndex(str: string, len: number): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h) % len;
}

interface BookCoverProps {
  url?: string | null;
  title?: string | null;
  className?: string;
}

export function BookCover({ url, title, className = "h-16 w-12" }: BookCoverProps) {
  const [failed, setFailed] = useState(false);

  const label = title ?? "?";
  const bg = BG_COLORS[hashIndex(label, BG_COLORS.length)];
  const text = encodeURIComponent(label.slice(0, 20));
  const fallbackUrl = `https://placehold.co/300x450/${bg}/ffffff?text=${text}`;

  return (
    <img
      src={failed || !url ? fallbackUrl : url}
      alt={title ? `Cover: ${title}` : "Book cover"}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`rounded-sm object-cover ${className}`}
    />
  );
}
