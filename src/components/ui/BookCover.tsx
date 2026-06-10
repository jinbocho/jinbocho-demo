import { useState } from "react";

const SPINES = [
  ["#7C4B2A", "#5A3319"],
  ["#2A5C8C", "#1A3F63"],
  ["#3D7A50", "#285438"],
  ["#7C2D5A", "#571E3E"],
  ["#6B5C2A", "#4D4019"],
  ["#2A4F7C", "#1A3357"],
  ["#8C3838", "#632424"],
  ["#3A5C7C", "#263F57"],
  ["#5C3D7C", "#3E2857"],
  ["#2A7C6B", "#1A574A"],
] as const;

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

  const label = title ?? "?";
  const [top, bottom] = SPINES[hashIndex(label, SPINES.length)];
  const initial = label[0].toUpperCase();
  const shortTitle = label.length > 18 ? label.slice(0, 16) + "…" : label;

  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-sm select-none ${className}`}
      style={{ background: `linear-gradient(175deg, ${top} 0%, ${bottom} 100%)` }}
    >
      {/* right-edge depth stripe */}
      <div className="absolute inset-y-0 right-0 w-1.5 bg-black/20" />

      {/* initial */}
      <div className="flex flex-1 items-center justify-center px-2">
        <span
          className="font-serif font-bold leading-none text-white/90"
          style={{ fontSize: "clamp(1.25rem, 35%, 2.5rem)" }}
        >
          {initial}
        </span>
      </div>

      {/* title strip at bottom */}
      <div
        className="w-full px-1.5 py-1"
        style={{ background: "rgba(0,0,0,0.35)" }}
      >
        <p
          className="text-center font-sans font-medium leading-tight text-white/90"
          style={{ fontSize: "clamp(0.45rem, 15%, 0.65rem)" }}
        >
          {shortTitle}
        </p>
      </div>
    </div>
  );
}
