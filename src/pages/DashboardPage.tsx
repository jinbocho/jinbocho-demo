import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { BookCover } from "../components/ui/BookCover";
import { PageHeader } from "../components/ui/PageHeader";
import { Avatar } from "../components/ui/Avatar";
import { useData } from "../store/DataContext";
import { useLanguage } from "../i18n";

export function DashboardPage() {
  const { t } = useLanguage();
  const { books, records, users, loans, reads } = useData();
  const [pickSeed, setPickSeed] = useState(() => Math.floor(Math.random() * 1000));

  function fmt(dateStr: string) {
    return new Date(dateStr).toLocaleDateString(t.locale, { day: "numeric", month: "short", year: "numeric" });
  }

  const recordMap = useMemo(() => new Map(records.map((r) => [r.id, r])), [records]);
  const userMap = useMemo(() => new Map(users.map((u) => [u.id, u])), [users]);

  const stats = useMemo(() => ({
    total: books.length,
    read: books.filter((b) => b.reading_status === "read").length,
    reading: books.filter((b) => b.reading_status === "reading").length,
    toRead: books.filter((b) => b.reading_status === "to_read").length,
  }), [books]);

  const currentlyReading = useMemo(() =>
    books.filter((b) => b.reading_status === "reading").map((b) => ({ book: b, record: recordMap.get(b.record_id) ?? null })),
  [books, recordMap]);

  const toReadBooks = useMemo(() =>
    books.filter((b) => b.reading_status === "to_read").map((b) => ({ book: b, record: recordMap.get(b.record_id) ?? null })),
  [books, recordMap]);

  const pick = toReadBooks.length > 0 ? toReadBooks[pickSeed % toReadBooks.length] : null;

  const activeLoans = useMemo(() =>
    loans.filter((l) => l.returned_at === null).map((l) => {
      const book = books.find((b) => b.id === l.book_id);
      return { loan: l, record: book ? recordMap.get(book.record_id) ?? null : null };
    }),
  [loans, books, recordMap]);

  const recentlyAdded = useMemo(() =>
    [...books].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 5).map((b) => ({ book: b, record: recordMap.get(b.record_id) ?? null })),
  [books, recordMap]);

  const readBookIds = useMemo(() => new Set(reads.map((r) => r.book_id)), [reads]);
  const unreadByAnyone = useMemo(() => books.filter((b) => !readBookIds.has(b.id)).length, [books, readBookIds]);

  const sharedFavorites = useMemo(() => {
    const usersByBook = new Map<string, Set<string>>();
    for (const r of reads) {
      const s = usersByBook.get(r.book_id) ?? new Set<string>();
      s.add(r.user_id);
      usersByBook.set(r.book_id, s);
    }
    return books
      .filter((b) => (usersByBook.get(b.id)?.size ?? 0) >= 2)
      .map((b) => ({ book: b, record: recordMap.get(b.record_id) ?? null, readCount: usersByBook.get(b.id)!.size }))
      .sort((a, b) => b.readCount - a.readCount)
      .slice(0, 5);
  }, [books, reads, recordMap]);

  const recentReads = useMemo(() =>
    [...reads]
      .sort((a, b) => b.read_at.localeCompare(a.read_at))
      .slice(0, 6)
      .map((r) => {
        const user = userMap.get(r.user_id);
        const book = books.find((b) => b.id === r.book_id);
        const record = book ? recordMap.get(book.record_id) : null;
        return { ...r, user, record };
      })
      .filter((r) => r.user && r.record),
  [reads, userMap, books, recordMap]);

  const currentYear = new Date().getFullYear();
  const goalProgress = useMemo(() =>
    users
      .filter((u) => u.annual_reading_goal && u.annual_reading_goal > 0)
      .map((u) => {
        const readThisYear = reads.filter((r) => r.user_id === u.id && new Date(r.read_at).getFullYear() === currentYear).length;
        return { user: u, readThisYear, goal: u.annual_reading_goal as number };
      }),
  [users, reads, currentYear]);

  const now = new Date();

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description={t.dashboard.description} />

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: t.dashboard.statTotal, value: stats.total, tone: "" },
          { label: t.dashboard.statRead, value: stats.read, tone: "text-sage" },
          { label: t.dashboard.statReading, value: stats.reading, tone: "text-amber" },
          { label: t.dashboard.statToRead, value: stats.toRead, tone: "text-stone" },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <p className="text-sm text-ink-soft">{s.label}</p>
            <p className={`mt-1 font-display text-2xl font-semibold ${s.tone || "text-ink"}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Currently reading */}
        <Card className="min-w-0 p-5">
          <h2 className="mb-4 font-display text-lg font-semibold">{t.dashboard.currentlyReading}</h2>
          {currentlyReading.length === 0 ? (
            <p className="text-sm text-ink-soft">{t.dashboard.noCurrentlyReading}</p>
          ) : (
            <ul className="space-y-3">
              {currentlyReading.map(({ book, record }) => (
                <li key={book.id} className="flex min-w-0 items-center gap-3">
                  <BookCover url={record?.cover_url} title={record?.title} className="h-12 w-9 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <Link to={`/books/${book.id}`} className="block truncate font-medium text-ink hover:text-brand">
                      {record?.title ?? t.dashboard.untitled}
                    </Link>
                    {record?.main_author && <p className="truncate text-sm text-ink-soft">{record.main_author}</p>}
                    {book.current_reader_id && (
                      <p className="truncate text-xs text-brand">
                        {userMap.get(book.current_reader_id)?.name}
                      </p>
                    )}
                  </div>
                  <Badge variant={book.reading_status} />
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* On loan */}
        <Card className="min-w-0 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">{t.dashboard.onLoan}</h2>
            {activeLoans.length > 0 && (
              <Link to="/loans" className="text-xs text-brand hover:underline">{t.dashboard.seeAll}</Link>
            )}
          </div>
          {activeLoans.length === 0 ? (
            <p className="text-sm text-ink-soft">{t.dashboard.allBooksHome}</p>
          ) : (
            <ul className="space-y-3">
              {activeLoans.map(({ loan, record }) => {
                const isOverdue = loan.due_date && new Date(loan.due_date) < now;
                return (
                  <li key={loan.id} className="flex min-w-0 items-center gap-3">
                    <BookCover url={record?.cover_url} title={record?.title} className="h-12 w-9 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <Link to={`/books/${loan.book_id}`} className="block truncate font-medium text-ink hover:text-brand">
                        {record?.title ?? t.dashboard.untitled}
                      </Link>
                      <p className="truncate text-sm text-ink-soft">{loan.borrower_name}</p>
                      {loan.due_date && (
                        <p className={`text-xs ${isOverdue ? "font-medium text-amber" : "text-ink-soft"}`}>
                          {isOverdue ? t.dashboard.overdue : t.dashboard.due}: {fmt(loan.due_date)}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        {/* Recently added */}
        <Card className="min-w-0 p-5">
          <h2 className="mb-4 font-display text-lg font-semibold">{t.dashboard.recentlyAdded}</h2>
          {recentlyAdded.length === 0 ? (
            <p className="text-sm text-ink-soft">{t.dashboard.noRecentlyAdded}</p>
          ) : (
            <ul className="space-y-3">
              {recentlyAdded.map(({ book, record }) => (
                <li key={book.id} className="flex min-w-0 items-center gap-3">
                  <BookCover url={record?.cover_url} title={record?.title} className="h-12 w-9 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <Link to={`/books/${book.id}`} className="block truncate font-medium text-ink hover:text-brand">
                      {record?.title ?? t.dashboard.untitled}
                    </Link>
                    {record?.main_author && <p className="truncate text-sm text-ink-soft">{record.main_author}</p>}
                  </div>
                  <Badge variant={book.reading_status} />
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Next read pick */}
        <Card className="min-w-0 p-5">
          <h2 className="mb-4 font-display text-lg font-semibold">{t.dashboard.nextRead}</h2>
          {pick ? (
            <div className="flex gap-4">
              <BookCover url={pick.record?.cover_url} title={pick.record?.title} className="h-28 w-20 shrink-0" />
              <div className="min-w-0 flex-1">
                <Link to={`/books/${pick.book.id}`} className="block font-medium leading-snug text-ink hover:text-brand">
                  {pick.record?.title ?? t.dashboard.untitled}
                </Link>
                {pick.record?.main_author && <p className="mt-1 text-sm text-ink-soft">{pick.record.main_author}</p>}
                {pick.record?.genre && <p className="mt-1 text-xs text-ink-soft/70">{t.enums.genre[pick.record.genre]}</p>}
                <button
                  onClick={() => setPickSeed((s) => s + 1)}
                  className="mt-3 text-xs text-brand hover:underline"
                >
                  {t.dashboard.another}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-ink-soft">{t.dashboard.noNextRead}</p>
          )}
        </Card>

        {/* Unread by anyone */}
        <Card className="min-w-0 p-5">
          <h2 className="mb-2 font-display text-lg font-semibold">{t.dashboard.unreadTitle}</h2>
          <p className="font-display text-3xl font-semibold text-amber">{unreadByAnyone}</p>
          <Link to="/stats/books?filter=unread" className="mt-1 block text-sm text-ink-soft hover:text-brand">
            {t.dashboard.unreadDesc(unreadByAnyone)}
          </Link>
        </Card>

        {/* Family favorites */}
        <Card className="min-w-0 p-5">
          <h2 className="mb-4 font-display text-lg font-semibold">{t.dashboard.familyFavorites}</h2>
          {sharedFavorites.length === 0 ? (
            <p className="text-sm text-ink-soft">{t.dashboard.noFamilyFavorites}</p>
          ) : (
            <ul className="space-y-3">
              {sharedFavorites.map(({ book, record, readCount }) => (
                <li key={book.id} className="flex min-w-0 items-center gap-3">
                  <BookCover url={record?.cover_url} title={record?.title} className="h-12 w-9 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <Link to={`/books/${book.id}`} className="block truncate font-medium text-ink hover:text-brand">
                      {record?.title ?? t.dashboard.untitled}
                    </Link>
                    {record?.main_author && <p className="truncate text-sm text-ink-soft">{record.main_author}</p>}
                  </div>
                  <span className="shrink-0 text-xs font-medium text-sage">{t.dashboard.members(readCount)}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Reading goals */}
        {goalProgress.length > 0 && (
          <Card className="min-w-0 space-y-4 p-5 lg:col-span-2">
            <h2 className="font-display text-lg font-semibold">{t.dashboard.readingGoal(currentYear)}</h2>
            {goalProgress.map(({ user, readThisYear, goal }) => {
              const pct = Math.min(100, Math.round((readThisYear / goal) * 100));
              return (
                <div key={user.id}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-ink">
                      <Avatar name={user.name} color={user.avatar_color} size="sm" />
                      {user.name}
                    </span>
                    <span className="text-ink-soft">{readThisYear} / {goal} ({pct}%)</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-paper">
                    <div className={`h-full rounded-full transition-all ${pct >= 100 ? "bg-sage" : "bg-brand"}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </Card>
        )}

        {/* Family activity */}
        <Card className="min-w-0 p-5 lg:col-span-2">
          <h2 className="mb-4 font-display text-lg font-semibold">{t.dashboard.activityTitle}</h2>
          <ul className="space-y-2">
            {recentReads.map((read) => (
              <li key={read.id} className="flex items-center gap-3 rounded-md bg-paper px-3 py-2.5">
                <Avatar name={read.user?.name ?? "?"} color={read.user?.avatar_color ?? "#bc002d"} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-ink">
                    <span className="font-medium">{read.user?.name}</span>{" "}
                    {t.dashboard.activityVerb}{" "}
                    <span className="italic">{read.record?.title}</span>
                  </p>
                </div>
                <span className="shrink-0 text-xs text-stone">{fmt(read.read_at)}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
