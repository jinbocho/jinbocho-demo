import { useMemo } from "react";
import { useData } from "../../store/DataContext";
import { useLanguage } from "../../i18n";

// Shared read-only summary of one child's Kids Mode activity — reused by
// both the child's own "My Reading" page and the parent dashboard, so the
// two views can never drift apart on what counts as a session/quiz/entry.
export function ChildReadingCard({ childId }: { childId: string }) {
  const { t } = useLanguage();
  const { books, records, readingSessions, quizQuestions, quizAttempts, journalEntries, readingPaths } = useData();

  const recordMap = useMemo(() => new Map(records.map((r) => [r.id, r])), [records]);
  const bookMap = useMemo(() => new Map(books.map((b) => [b.id, b])), [books]);
  const bookTitle = (bookId: string) => {
    const book = bookMap.get(bookId);
    return (book && recordMap.get(book.record_id)?.title) ?? "?";
  };

  function fmt(dateStr: string) {
    return new Date(dateStr).toLocaleDateString(t.locale, { day: "numeric", month: "short" });
  }

  const sessions = useMemo(
    () => readingSessions.filter((s) => s.child_id === childId).sort((a, b) => b.created_at.localeCompare(a.created_at)),
    [readingSessions, childId],
  );

  const attempts = useMemo(() => quizAttempts.filter((a) => a.child_id === childId), [quizAttempts, childId]);
  const quizBookIds = useMemo(() => new Set(quizQuestions.map((q) => q.book_id)), [quizQuestions]);

  const entries = useMemo(
    () => journalEntries.filter((j) => j.child_id === childId).sort((a, b) => b.created_at.localeCompare(a.created_at)),
    [journalEntries, childId],
  );

  const path = readingPaths[0] ?? null;
  const pathDone = path ? path.book_ids.filter((id) => bookMap.get(id)?.reading_status === "read").length : 0;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Card title={t.kids.sessionsTitle}>
        {sessions.length === 0 ? (
          <p className="text-sm text-ink-soft">{t.kids.sessionsEmpty}</p>
        ) : (
          <ul className="space-y-2">
            {sessions.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="min-w-0 flex-1 truncate text-ink">{bookTitle(s.book_id)}</span>
                <span className="shrink-0 text-xs text-ink-soft">
                  {fmt(s.created_at)} · {s.logged_by_parent ? t.kids.loggedByParent : t.kids.loggedByChild}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card title={t.kids.quizTitle}>
        {attempts.length === 0 && quizBookIds.size === 0 ? (
          <p className="text-sm text-ink-soft">{t.kids.quizEmpty}</p>
        ) : (
          <ul className="space-y-2">
            {attempts.map((a) => (
              <li key={a.id} className="text-sm">
                <span className="font-medium text-ink">{bookTitle(a.book_id)}</span>
                <p className="text-ink-soft">{t.kids.quizResult(a.score, a.total)}</p>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card title={t.kids.journalTitle}>
        {entries.length === 0 ? (
          <p className="text-sm text-ink-soft">{t.kids.journalEmpty}</p>
        ) : (
          <ul className="space-y-2">
            {entries.map((j) => (
              <li key={j.id} className="text-sm">
                <span className="text-ink">{j.emoji ? `${j.emoji} ` : ""}{t.kids.journalText[j.id] ?? ""}</span>
                <p className="text-xs text-ink-soft">{bookTitle(j.book_id)} · {fmt(j.created_at)}</p>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {path && (
        <Card title={t.kids.pathTitle}>
          <p className="text-sm font-medium text-ink">{t.kids.pathText[path.id]?.title ?? ""}</p>
          <p className="mt-1 text-xs text-ink-soft">{t.kids.pathProgress(pathDone, path.book_ids.length)}</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-paper">
            <div
              className="h-full rounded-full bg-brand transition-all"
              style={{ width: `${Math.round((pathDone / path.book_ids.length) * 100)}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-brand">{t.kids.pathBadge(t.kids.pathText[path.id]?.badgeName ?? "")}</p>
        </Card>
      )}
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-4 shadow-card">
      <h3 className="mb-3 text-sm font-semibold text-ink">{title}</h3>
      {children}
    </div>
  );
}
