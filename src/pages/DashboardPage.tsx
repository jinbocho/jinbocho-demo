import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { BookCover } from "../components/ui/BookCover";
import { PageHeader } from "../components/ui/PageHeader";
import { OWNED_BOOKS, RECORDS } from "../data/books";
import { USERS } from "../data/users";
import { LOANS } from "../data/loans";
import { READS } from "../data/reads";

function fmt(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" });
}

export function DashboardPage() {
  const [pickSeed, setPickSeed] = useState(() => Math.floor(Math.random() * 1000));

  const stats = useMemo(() => ({
    total: OWNED_BOOKS.length,
    read: OWNED_BOOKS.filter((b) => b.reading_status === "read").length,
    reading: OWNED_BOOKS.filter((b) => b.reading_status === "reading").length,
    toRead: OWNED_BOOKS.filter((b) => b.reading_status === "to_read").length,
  }), []);

  const userMap = useMemo(() => new Map(USERS.map((u) => [u.id, u])), []);

  const currentlyReading = useMemo(() =>
    OWNED_BOOKS.filter((b) => b.reading_status === "reading").map((b) => ({
      book: b,
      record: RECORDS.find((r) => r.id === b.record_id) ?? null,
    })),
  []);

  const toReadBooks = useMemo(() =>
    OWNED_BOOKS.filter((b) => b.reading_status === "to_read").map((b) => ({
      book: b,
      record: RECORDS.find((r) => r.id === b.record_id) ?? null,
    })),
  []);

  const pick = toReadBooks.length > 0 ? toReadBooks[pickSeed % toReadBooks.length] : null;

  const activeLoans = useMemo(() =>
    LOANS.filter((l) => l.returned_at === null).map((l) => {
      const book = OWNED_BOOKS.find((b) => b.id === l.book_id);
      return { loan: l, record: book ? RECORDS.find((r) => r.id === book.record_id) ?? null : null };
    }),
  []);

  const recentlyAdded = useMemo(() =>
    [...OWNED_BOOKS].slice(-5).reverse().map((b) => ({
      book: b,
      record: RECORDS.find((r) => r.id === b.record_id) ?? null,
    })),
  []);

  const readBookIds = useMemo(() => new Set(READS.map((r) => r.book_id)), []);
  const unreadByAnyone = useMemo(
    () => OWNED_BOOKS.filter((b) => !readBookIds.has(b.id)).length,
    [readBookIds],
  );

  const sharedFavorites = useMemo(() => {
    const usersByBook = new Map<string, Set<string>>();
    for (const r of READS) {
      const s = usersByBook.get(r.book_id) ?? new Set<string>();
      s.add(r.user_id);
      usersByBook.set(r.book_id, s);
    }
    return OWNED_BOOKS
      .filter((b) => (usersByBook.get(b.id)?.size ?? 0) >= 2)
      .map((b) => ({ book: b, record: RECORDS.find((r) => r.id === b.record_id) ?? null, readCount: usersByBook.get(b.id)!.size }))
      .sort((a, b) => b.readCount - a.readCount)
      .slice(0, 5);
  }, []);

  const recentReads = useMemo(() =>
    [...READS]
      .sort((a, b) => b.read_at.localeCompare(a.read_at))
      .slice(0, 6)
      .map((r) => {
        const user = USERS.find((u) => u.id === r.user_id);
        const book = OWNED_BOOKS.find((b) => b.id === r.book_id);
        const record = book ? RECORDS.find((rec) => rec.id === book.record_id) : null;
        return { ...r, user, record };
      })
      .filter((r) => r.user && r.record),
  []);

  const goalDone = stats.read;
  const goalTarget = 20;
  const goalPct = Math.min(100, Math.round((goalDone / goalTarget) * 100));

  const now = new Date();

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Una panoramica della tua biblioteca di famiglia." />

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Totale libri", value: stats.total, tone: "" },
          { label: "Letti", value: stats.read, tone: "text-sage" },
          { label: "In lettura", value: stats.reading, tone: "text-amber" },
          { label: "Da leggere", value: stats.toRead, tone: "text-stone" },
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
          <h2 className="mb-4 font-display text-lg font-semibold">In lettura</h2>
          {currentlyReading.length === 0 ? (
            <p className="text-sm text-ink-soft">Nessun libro in lettura</p>
          ) : (
            <ul className="space-y-3">
              {currentlyReading.map(({ book, record }) => (
                <li key={book.id} className="flex min-w-0 items-center gap-3">
                  <BookCover url={record?.cover_url} title={record?.title} className="h-12 w-9 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <Link to={`/books/${book.id}`} className="block truncate font-medium text-ink hover:text-brand">
                      {record?.title ?? "Senza titolo"}
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
            <h2 className="font-display text-lg font-semibold">In prestito</h2>
            {activeLoans.length > 0 && (
              <Link to="/loans" className="text-xs text-brand hover:underline">Vedi tutti →</Link>
            )}
          </div>
          {activeLoans.length === 0 ? (
            <p className="text-sm text-ink-soft">Tutti i libri sono in casa</p>
          ) : (
            <ul className="space-y-3">
              {activeLoans.map(({ loan, record }) => {
                const isOverdue = loan.due_date && new Date(loan.due_date) < now;
                return (
                  <li key={loan.id} className="flex min-w-0 items-center gap-3">
                    <BookCover url={record?.cover_url} title={record?.title} className="h-12 w-9 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <Link to={`/books/${loan.book_id}`} className="block truncate font-medium text-ink hover:text-brand">
                        {record?.title ?? "Senza titolo"}
                      </Link>
                      <p className="truncate text-sm text-ink-soft">{loan.borrower_name}</p>
                      {loan.due_date && (
                        <p className={`text-xs ${isOverdue ? "font-medium text-amber" : "text-ink-soft"}`}>
                          {isOverdue ? "Scaduto" : "Scade"}: {fmt(loan.due_date)}
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
          <h2 className="mb-4 font-display text-lg font-semibold">Aggiunti di recente</h2>
          <ul className="space-y-3">
            {recentlyAdded.map(({ book, record }) => (
              <li key={book.id} className="flex min-w-0 items-center gap-3">
                <BookCover url={record?.cover_url} title={record?.title} className="h-12 w-9 shrink-0" />
                <div className="min-w-0 flex-1">
                  <Link to={`/books/${book.id}`} className="block truncate font-medium text-ink hover:text-brand">
                    {record?.title ?? "Senza titolo"}
                  </Link>
                  {record?.main_author && <p className="truncate text-sm text-ink-soft">{record.main_author}</p>}
                </div>
                <Badge variant={book.reading_status} />
              </li>
            ))}
          </ul>
        </Card>

        {/* Next read pick */}
        <Card className="min-w-0 p-5">
          <h2 className="mb-4 font-display text-lg font-semibold">Cosa leggere dopo?</h2>
          {pick ? (
            <div className="flex gap-4">
              <BookCover url={pick.record?.cover_url} title={pick.record?.title} className="h-28 w-20 shrink-0" />
              <div className="min-w-0 flex-1">
                <Link to={`/books/${pick.book.id}`} className="block font-medium leading-snug text-ink hover:text-brand">
                  {pick.record?.title ?? "Senza titolo"}
                </Link>
                {pick.record?.main_author && <p className="mt-1 text-sm text-ink-soft">{pick.record.main_author}</p>}
                {pick.record?.genre && <p className="mt-1 text-xs text-ink-soft/70">{pick.record.genre}</p>}
                <button
                  onClick={() => setPickSeed((s) => s + 1)}
                  className="mt-3 text-xs text-brand hover:underline"
                >
                  🎲 Un altro
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-ink-soft">Nessun libro nella lista da leggere</p>
          )}
        </Card>

        {/* Unread by anyone */}
        <Card className="min-w-0 p-5">
          <h2 className="mb-2 font-display text-lg font-semibold">Non letti da nessuno</h2>
          <p className="font-display text-3xl font-semibold text-amber">{unreadByAnyone}</p>
          <p className="mt-1 text-sm text-ink-soft">
            {unreadByAnyone === 1 ? "libro" : "libri"} che nessun membro ha ancora letto
          </p>
        </Card>

        {/* Family favorites */}
        <Card className="min-w-0 p-5">
          <h2 className="mb-4 font-display text-lg font-semibold">Preferiti di famiglia</h2>
          {sharedFavorites.length === 0 ? (
            <p className="text-sm text-ink-soft">Nessun libro letto da più di un membro</p>
          ) : (
            <ul className="space-y-3">
              {sharedFavorites.map(({ book, record, readCount }) => (
                <li key={book.id} className="flex min-w-0 items-center gap-3">
                  <BookCover url={record?.cover_url} title={record?.title} className="h-12 w-9 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <Link to={`/books/${book.id}`} className="block truncate font-medium text-ink hover:text-brand">
                      {record?.title ?? "Senza titolo"}
                    </Link>
                    {record?.main_author && <p className="truncate text-sm text-ink-soft">{record.main_author}</p>}
                  </div>
                  <span className="shrink-0 text-xs font-medium text-sage">{readCount} membri</span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Reading goal */}
        <Card className="min-w-0 p-5 lg:col-span-2">
          <h2 className="mb-4 font-display text-lg font-semibold">
            Obiettivo di lettura {new Date().getFullYear()}
          </h2>
          <div className="mb-1 flex justify-between text-sm">
            <span className="text-ink">Carmelo</span>
            <span className="text-ink-soft">{goalDone} / {goalTarget} libri ({goalPct}%)</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-paper">
            <div
              className={`h-full rounded-full transition-all ${goalPct >= 100 ? "bg-sage" : "bg-brand"}`}
              style={{ width: `${goalPct}%` }}
            />
          </div>
        </Card>

        {/* Attività famiglia */}
        <Card className="min-w-0 p-5 lg:col-span-2">
          <h2 className="mb-4 font-display text-lg font-semibold">Attività famiglia</h2>
          <ul className="space-y-2">
            {recentReads.map((read) => (
              <li key={read.id} className="flex items-center gap-3 rounded-md bg-paper px-3 py-2.5">
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: read.user?.avatar_color ?? "#a85a38" }}
                >
                  {read.user?.name?.[0] ?? "?"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-ink">
                    <span className="font-medium">{read.user?.name}</span> ha letto{" "}
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
