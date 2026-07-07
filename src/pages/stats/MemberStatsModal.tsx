import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "../../components/ui/Avatar";
import { BookCover } from "../../components/ui/BookCover";
import { Card } from "../../components/ui/Card";
import { Modal } from "../../components/ui/Modal";
import { useData } from "../../store/DataContext";
import { useLanguage } from "../../i18n";
import type { BibliographicRecord, BookRead, Genre, OwnedBook, User } from "../../data/types";

interface MemberStatsModalProps {
  user: User | null;
  onClose: () => void;
}

interface ReadingHistogramYear {
  year: number;
  months: number[];
}

function computeMemberStats(userId: string, reads: BookRead[], books: OwnedBook[], records: BibliographicRecord[]) {
  const recordByBookId = new Map(books.map((b) => [b.id, records.find((r) => r.id === b.record_id) ?? null]));
  const myReads = reads.filter((r) => r.user_id === userId);
  const currentYear = new Date().getFullYear();

  const totalReads = myReads.length;
  const readThisYear = myReads.filter((r) => new Date(r.read_at).getFullYear() === currentYear).length;

  const histogramMap = new Map<number, number[]>();
  for (const r of myReads) {
    const d = new Date(r.read_at);
    const y = d.getFullYear();
    const m = d.getMonth();
    if (!histogramMap.has(y)) histogramMap.set(y, Array(12).fill(0) as number[]);
    const bucket = histogramMap.get(y)!;
    bucket[m] = (bucket[m] ?? 0) + 1;
  }
  const readingHistogram: ReadingHistogramYear[] = [...histogramMap.entries()]
    .sort(([a], [b]) => a - b)
    .map(([year, months]) => ({ year, months }));

  const genreCounts = new Map<Genre, number>();
  for (const r of myReads) {
    const genre = recordByBookId.get(r.book_id)?.genre;
    if (genre) genreCounts.set(genre, (genreCounts.get(genre) ?? 0) + 1);
  }
  const genreTotal = [...genreCounts.values()].reduce((s, c) => s + c, 0) || 1;
  const favoriteGenres = [...genreCounts.entries()]
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([genre, count]) => ({ genre, count, pct: Math.round((count / genreTotal) * 100) }));

  const readAuthorCounts = new Map<string, number>();
  for (const r of myReads) {
    const author = recordByBookId.get(r.book_id)?.main_author;
    if (author) readAuthorCounts.set(author, (readAuthorCounts.get(author) ?? 0) + 1);
  }
  const topAuthorsRead = [...readAuthorCounts.entries()]
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([author, count]) => ({ author, count }));

  const ownedAuthorCounts = new Map<string, number>();
  for (const b of books) {
    if (b.owner_id !== userId) continue;
    const author = recordByBookId.get(b.id)?.main_author;
    if (author) ownedAuthorCounts.set(author, (ownedAuthorCounts.get(author) ?? 0) + 1);
  }
  const topAuthorsOwned = [...ownedAuthorCounts.entries()]
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([author, count]) => ({ author, count }));

  const currentlyReading = books.filter((b) => b.current_reader_id === userId);

  const recentlyRead = [...myReads]
    .sort((a, b) => b.read_at.localeCompare(a.read_at))
    .slice(0, 5)
    .flatMap((r) => {
      const book = books.find((b) => b.id === r.book_id);
      const record = book ? recordByBookId.get(book.id) : null;
      return book ? [{ book, record: record ?? null, readAt: r.read_at }] : [];
    });

  return { totalReads, readThisYear, readingHistogram, favoriteGenres, topAuthorsRead, topAuthorsOwned, currentlyReading, recentlyRead, recordByBookId };
}

export function MemberStatsModal({ user, onClose }: MemberStatsModalProps) {
  const { t } = useLanguage();
  const { reads, books, records } = useData();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const stats = useMemo(() => {
    if (!user) return null;
    return computeMemberStats(user.id, reads, books, records);
  }, [user, reads, books, records]);

  const histogramYears = stats?.readingHistogram.map((h) => h.year) ?? [];
  const defaultYear = histogramYears[histogramYears.length - 1] ?? null;
  const activeYear = selectedYear ?? defaultYear;
  const activeHistogram = stats?.readingHistogram.find((h) => h.year === activeYear);
  const histogramMax = activeHistogram ? Math.max(...activeHistogram.months, 1) : 1;
  const goal = user?.annual_reading_goal ?? null;

  return (
    <Modal open={!!user} onClose={onClose} title={user?.name ?? ""} size="xl">
      {user && stats && (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar name={user.name} color={user.avatar_color} size="lg" />
            <div>
              <p className="text-xs text-stone capitalize">{t.enums.role[user.role]}</p>
              <p className="mt-1 text-sm text-ink-soft">
                <span className="font-semibold text-ink">{stats.totalReads}</span> {t.stats.memberModal.totalReads}
              </p>
            </div>
          </div>

          {goal && (
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">{t.stats.memberModal.goalsSection}</p>
              <Card className="p-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-ink-soft">{t.stats.memberModal.goalBooksLabel}</span>
                  <span className={`font-semibold ${stats.readThisYear >= goal ? "text-sage" : "text-ink"}`}>
                    {stats.readThisYear}/{goal}
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-line">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${stats.readThisYear >= goal ? "bg-sage" : "bg-brand"}`}
                    style={{ width: `${Math.min(100, Math.round((stats.readThisYear / goal) * 100))}%` }}
                  />
                </div>
              </Card>
            </div>
          )}

          {stats.currentlyReading.length > 0 && (
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">{t.stats.memberModal.currentlyReadingSection}</p>
              <Card className="p-4">
                <ul className="space-y-3">
                  {stats.currentlyReading.map((book) => {
                    const record = stats.recordByBookId.get(book.id);
                    return (
                      <li key={book.id} className="flex min-w-0 items-center gap-3">
                        <BookCover url={record?.cover_url} title={record?.title} className="h-10 w-8 shrink-0" />
                        <Link to={`/books/${book.id}`} onClick={onClose} className="block truncate text-sm font-medium text-ink hover:text-brand">
                          {record?.title ?? "—"}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </Card>
            </div>
          )}

          {stats.readingHistogram.length > 0 && (
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">{t.stats.memberModal.readingHistogramSection}</p>
              <Card className="p-4">
                {histogramYears.length > 1 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {[...histogramYears].reverse().map((year) => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                          year === activeYear ? "bg-brand text-paper" : "bg-line text-ink-soft hover:text-ink"
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                )}
                {activeHistogram ? (
                  <div className="flex h-28 items-end gap-1">
                    {activeHistogram.months.map((count, monthIndex) => {
                      const label = new Date(activeYear!, monthIndex).toLocaleDateString(t.locale, { month: "short" });
                      const barHeight = Math.round((count / histogramMax) * 96);
                      return (
                        <div key={monthIndex} className="flex flex-1 flex-col items-center gap-1">
                          {count > 0 && <span className="text-[9px] font-medium leading-none text-brand">{count}</span>}
                          <div className="flex w-full items-end" style={{ height: "96px" }}>
                            <div
                              className="w-full rounded-t bg-brand transition-all duration-500"
                              style={{ height: barHeight > 0 ? `${barHeight}px` : "2px", opacity: barHeight > 0 ? 1 : 0.15 }}
                            />
                          </div>
                          <span className="text-[9px] capitalize leading-none text-ink-soft">{label}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-ink-soft">{t.stats.memberModal.readingHistogramNoReads}</p>
                )}
              </Card>
            </div>
          )}

          {stats.recentlyRead.length > 0 && (
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">{t.stats.memberModal.recentlyRead}</p>
              <Card className="p-4">
                <ul className="space-y-3">
                  {stats.recentlyRead.map(({ book, record, readAt }) => (
                    <li key={book.id} className="flex min-w-0 items-center gap-3">
                      <BookCover url={record?.cover_url} title={record?.title} className="h-10 w-8 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <Link to={`/books/${book.id}`} onClick={onClose} className="block truncate text-sm font-medium text-ink hover:text-brand">
                          {record?.title ?? "—"}
                        </Link>
                        <p className="text-xs text-ink-soft">{new Date(readAt).toLocaleDateString(t.locale, { year: "numeric", month: "short", day: "numeric" })}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          )}

          {stats.totalReads === 0 && <p className="text-sm text-ink-soft">{t.stats.memberModal.noReads}</p>}

          {stats.favoriteGenres.length > 0 && (
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">{t.stats.memberModal.genreSection}</p>
              <Card className="p-4">
                <div className="space-y-3">
                  {stats.favoriteGenres.map(({ genre, count, pct }) => (
                    <div key={genre}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="font-medium text-ink">{t.enums.genre[genre]}</span>
                        <span className="text-ink-soft">{count} · {pct}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-line">
                        <div className="h-full rounded-full bg-brand transition-all duration-500" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {stats.topAuthorsRead.length > 0 && (
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">{t.stats.memberModal.topAuthorsReadSection}</p>
              <Card className="p-4">
                <div className="space-y-2">
                  {stats.topAuthorsRead.map(({ author, count }, idx) => (
                    <div key={author} className="flex items-center gap-3 text-sm">
                      <span className="w-4 shrink-0 text-center font-display text-base text-ink-soft/50">{idx + 1}</span>
                      <span className="min-w-0 flex-1 truncate font-medium text-ink">{author}</span>
                      <span className="shrink-0 text-ink-soft">{count}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {stats.topAuthorsOwned.length > 0 && (
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">{t.stats.memberModal.topAuthorsOwnedSection}</p>
              <Card className="p-4">
                <div className="space-y-2">
                  {stats.topAuthorsOwned.map(({ author, count }, idx) => (
                    <div key={author} className="flex items-center gap-3 text-sm">
                      <span className="w-4 shrink-0 text-center font-display text-base text-ink-soft/50">{idx + 1}</span>
                      <span className="min-w-0 flex-1 truncate font-medium text-ink">{author}</span>
                      <span className="shrink-0 text-ink-soft">{count}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          <div className="pt-1 text-center">
            <Link to={`/stats/books?filter=read&user=${user.id}`} onClick={onClose} className="text-sm text-brand hover:underline">
              {t.stats.memberModal.viewAll} →
            </Link>
          </div>
        </div>
      )}
    </Modal>
  );
}
