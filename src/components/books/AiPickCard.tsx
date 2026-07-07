import { useState } from "react";
import { Link } from "react-router-dom";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { BookCover } from "../ui/BookCover";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { IconButton } from "../ui/IconButton";
import { useData } from "../../store/DataContext";
import { useAuth } from "../../store/AuthContext";
import { useToast } from "../../store/ToastContext";
import { useLanguage } from "../../i18n";
import type { BibliographicRecord, Genre, OwnedBook } from "../../data/types";

interface Pick {
  book: OwnedBook;
  record: BibliographicRecord | null;
  reason: string;
}

export function AiPickCard() {
  const { t } = useLanguage();
  const toast = useToast();
  const { currentUser } = useAuth();
  const { books, records, reads } = useData();
  const [requested, setRequested] = useState(false);
  const [loading, setLoading] = useState(false);
  const [picks, setPicks] = useState<Pick[]>([]);

  function reasonFor(record: BibliographicRecord | null, favoriteGenre: Genre | null): string {
    if (record?.genre && record.genre === favoriteGenre) {
      return `${t.stats.favoriteGenreLabel}: ${t.enums.genre[record.genre]}.`;
    }
    if (record?.main_author) return `${record.main_author}.`;
    return "";
  }

  function handleAsk() {
    setRequested(true);
    setLoading(true);
    setTimeout(() => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      const myReadBookIds = new Set(reads.filter((r) => r.user_id === currentUser.id).map((r) => r.book_id));
      const genreCounts = new Map<Genre, number>();
      for (const r of reads) {
        if (r.user_id !== currentUser.id) continue;
        const book = books.find((b) => b.id === r.book_id);
        const genre = book ? records.find((rec) => rec.id === book.record_id)?.genre : null;
        if (genre) genreCounts.set(genre, (genreCounts.get(genre) ?? 0) + 1);
      }
      const favoriteGenre = [...genreCounts.entries()].sort(([, a], [, b]) => b - a)[0]?.[0] ?? null;

      const unread = books
        .filter((b) => !myReadBookIds.has(b.id))
        .map((b) => ({ book: b, record: records.find((r) => r.id === b.record_id) ?? null }))
        .filter((v) => v.record);

      const sorted = [...unread].sort((a, b) => {
        const aMatch = a.record!.genre === favoriteGenre ? 1 : 0;
        const bMatch = b.record!.genre === favoriteGenre ? 1 : 0;
        return bMatch - aMatch;
      });

      const chosen = sorted.slice(0, 3).map((v) => ({
        book: v.book,
        record: v.record,
        reason: reasonFor(v.record, favoriteGenre),
      }));

      setPicks(chosen);
      setLoading(false);
    }, 900);
  }

  function react(bookId: string, accepted: boolean) {
    setPicks((prev) => prev.filter((p) => p.book.id !== bookId));
    if (accepted) toast.success(t.dashboard.aiPickFeedbackSaved);
  }

  return (
    <Card className="min-w-0 p-5">
      <div className="mb-4 flex items-center gap-2">
        <h2 className="font-display text-lg font-semibold">{t.dashboard.aiPickTitle}</h2>
        <span className="rounded-full bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand">{t.dashboard.aiPickBadge}</span>
      </div>

      {!requested ? (
        <div>
          <p className="mb-3 text-sm text-ink-soft">{t.dashboard.aiPickPrompt}</p>
          <Button size="sm" variant="secondary" onClick={handleAsk}>{t.dashboard.aiPickAskButton}</Button>
        </div>
      ) : loading ? (
        <div>
          <p className="mb-2 text-sm text-ink-soft">{t.dashboard.aiPickLoading}</p>
          <div role="progressbar" aria-label={t.dashboard.aiPickLoading} className="h-1.5 overflow-hidden rounded-full bg-brand/15">
            <div className="h-full w-1/3 animate-pulse rounded-full bg-brand" />
          </div>
        </div>
      ) : picks.length > 0 ? (
        <ul className="space-y-4">
          {picks.map(({ book, record, reason }) => (
            <li key={book.id} className="flex min-w-0 gap-3">
              <BookCover url={record?.cover_url} title={record?.title} className="h-16 w-12 shrink-0" />
              <div className="min-w-0 flex-1">
                <Link to={`/books/${book.id}`} className="block truncate font-medium text-ink hover:text-brand">
                  {record?.title ?? "—"}
                </Link>
                {record?.main_author && <p className="truncate text-sm text-ink-soft">{record.main_author}</p>}
                {reason && <p className="mt-1 text-xs text-ink-soft">{reason}</p>}
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <IconButton label={t.dashboard.aiPickLike} onClick={() => react(book.id, true)}>
                  <ThumbsUp size={15} />
                </IconButton>
                <IconButton label={t.dashboard.aiPickDislike} onClick={() => react(book.id, false)}>
                  <ThumbsDown size={15} />
                </IconButton>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-ink-soft">{t.dashboard.aiPickEmpty}</p>
      )}
    </Card>
  );
}
