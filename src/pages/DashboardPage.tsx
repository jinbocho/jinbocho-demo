import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Avatar } from "../components/ui/Avatar";
import { OWNED_BOOKS, RECORDS } from "../data/books";
import { USERS } from "../data/users";
import { LOANS } from "../data/loans";
import { READS } from "../data/reads";
import { ROOMS, BOOKCASES } from "../data/locations";

export function DashboardPage() {
  const navigate = useNavigate();

  const stats = useMemo(() => {
    const total = OWNED_BOOKS.length;
    const read = OWNED_BOOKS.filter((b) => b.reading_status === "read").length;
    const reading = OWNED_BOOKS.filter((b) => b.reading_status === "reading").length;
    const toRead = OWNED_BOOKS.filter((b) => b.reading_status === "to_read").length;
    return { total, read, reading, toRead };
  }, []);

  const recentBooks = useMemo(() => {
    return OWNED_BOOKS.slice(-5)
      .reverse()
      .map((ob) => {
        const record = RECORDS.find((r) => r.id === ob.record_id);
        return { ...ob, record };
      })
      .filter((b) => b.record != null);
  }, []);

  const recentReads = useMemo(() => {
    return [...READS]
      .sort((a, b) => b.read_at.localeCompare(a.read_at))
      .slice(0, 6)
      .map((read) => {
        const user = USERS.find((u) => u.id === read.user_id);
        const book = OWNED_BOOKS.find((b) => b.id === read.book_id);
        const record = book ? RECORDS.find((r) => r.id === book.record_id) : null;
        return { ...read, user, record };
      })
      .filter((r) => r.user && r.record);
  }, []);

  const activeLoans = useMemo(() => {
    return LOANS.filter((l) => l.returned_at === null).map((loan) => {
      const book = OWNED_BOOKS.find((b) => b.id === loan.book_id);
      const record = book ? RECORDS.find((r) => r.id === book.record_id) : null;
      return { ...loan, record };
    });
  }, []);

  const yearProgress = { done: stats.read, goal: 20 };
  const progressPct = Math.min(100, Math.round((yearProgress.done / yearProgress.goal) * 100));

  function getRoomName(roomId: string | null): string {
    if (!roomId) return "";
    return ROOMS.find((r) => r.id === roomId)?.name ?? "";
  }

  function getBookcaseName(bookcaseId: string | null): string {
    if (!bookcaseId) return "";
    return BOOKCASES.find((b) => b.id === bookcaseId)?.name ?? "";
  }

  return (
    <div className="px-4 md:px-8 py-6 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl text-ink">Ciao, Carmelo 👋</h2>
        <p className="text-ink-soft mt-1">Ecco la tua biblioteca</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Totale libri", value: stats.total, color: "text-ink" },
          { label: "Letti", value: stats.read, color: "text-sage" },
          { label: "In lettura", value: stats.reading, color: "text-amber" },
          { label: "Da leggere", value: stats.toRead, color: "text-stone" },
        ].map((s) => (
          <Card key={s.label}>
            <p className="text-xs text-ink-soft mb-1">{s.label}</p>
            <p className={`text-3xl font-display font-semibold ${s.color}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      {/* Obiettivo annuale */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-medium text-ink">Obiettivo annuale</h3>
          <span className="text-sm text-ink-soft">
            {yearProgress.done}/{yearProgress.goal} libri letti
          </span>
        </div>
        <div className="w-full bg-line rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-sage rounded-full transition-all duration-700"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="text-xs text-ink-soft mt-2">
          {progressPct}% completato — ancora{" "}
          <strong className="text-ink">{yearProgress.goal - yearProgress.done}</strong> libri al traguardo
        </p>
      </Card>

      {/* Ultimi aggiunti */}
      <div>
        <h3 className="text-lg font-medium text-ink mb-3">Ultimi aggiunti</h3>
        <div className="grid gap-3">
          {recentBooks.map((book) => (
            <Card
              key={book.id}
              onClick={() => navigate(`/books/${book.id}`)}
              className="flex items-center gap-4"
            >
              {/* Cover */}
              <div className="w-10 h-14 rounded overflow-hidden shrink-0 bg-line">
                {book.record?.cover_url ? (
                  <img
                    src={book.record.cover_url}
                    alt={book.record.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-brand/10 text-brand font-display text-lg">
                    {book.record?.title?.[0] ?? "?"}
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-ink truncate">{book.record?.title}</p>
                <p className="text-sm text-ink-soft truncate">{book.record?.main_author}</p>
                <p className="text-xs text-stone mt-0.5">
                  {getRoomName(book.room_id)}
                  {book.bookcase_id ? ` · ${getBookcaseName(book.bookcase_id)}` : ""}
                </p>
              </div>
              <Badge variant={book.reading_status} />
            </Card>
          ))}
        </div>
      </div>

      {/* Attività famiglia */}
      <div>
        <h3 className="text-lg font-medium text-ink mb-3">Attività famiglia</h3>
        <div className="grid gap-2">
          {recentReads.map((read) => (
            <div
              key={read.id}
              className="flex items-center gap-3 bg-surface border border-line rounded-lg px-4 py-3"
            >
              {read.user && (
                <Avatar name={read.user.name} color={read.user.avatar_color} size="sm" />
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm text-ink truncate">
                  <span className="font-medium">{read.user?.name}</span> ha letto{" "}
                  <span className="italic">{read.record?.title}</span>
                </p>
              </div>
              <span className="text-xs text-stone shrink-0">
                {new Date(read.read_at).toLocaleDateString("it-IT", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Prestiti attivi */}
      {activeLoans.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-ink mb-3">In prestito</h3>
          <div className="grid gap-3">
            {activeLoans.map((loan) => (
              <Card key={loan.id} className="flex items-center gap-4">
                <div className="w-10 h-14 rounded overflow-hidden shrink-0 bg-line">
                  {loan.record?.cover_url ? (
                    <img
                      src={loan.record.cover_url}
                      alt={loan.record.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-brand/10 text-brand font-display text-lg">
                      {loan.record?.title?.[0] ?? "?"}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-ink truncate">{loan.record?.title}</p>
                  <p className="text-sm text-ink-soft">
                    Prestato a <span className="font-medium">{loan.borrower_name}</span>
                  </p>
                  <p className="text-xs text-stone mt-0.5">
                    Dal{" "}
                    {new Date(loan.loaned_at).toLocaleDateString("it-IT", {
                      day: "numeric",
                      month: "long",
                    })}
                    {loan.due_date && (
                      <>
                        {" "}· scadenza{" "}
                        {new Date(loan.due_date).toLocaleDateString("it-IT", {
                          day: "numeric",
                          month: "long",
                        })}
                      </>
                    )}
                  </p>
                </div>
                <Badge variant="info">In prestito</Badge>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
