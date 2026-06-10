import { useMemo, useState } from "react";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { LOANS } from "../data/loans";
import { OWNED_BOOKS, RECORDS } from "../data/books";

function CoverThumb({ src, title }: { src: string | null; title: string }) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-brand/10 text-brand font-display text-base">
        {title[0]}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={title}
      className="w-full h-full object-cover"
      onError={() => setErrored(true)}
    />
  );
}

export function LoansPage() {
  const enrichedLoans = useMemo(() => {
    return LOANS.map((loan) => {
      const book = OWNED_BOOKS.find((b) => b.id === loan.book_id);
      const record = book ? RECORDS.find((r) => r.id === book.record_id) : null;
      return { ...loan, record };
    });
  }, []);

  const activeLoans = enrichedLoans.filter((l) => l.returned_at === null);
  const returnedLoans = enrichedLoans.filter((l) => l.returned_at !== null);

  function fmt(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("it-IT", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div className="px-4 md:px-8 py-6 max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl text-ink">Prestiti</h2>
        <p className="text-ink-soft mt-1">
          {activeLoans.length} attiv{activeLoans.length === 1 ? "o" : "i"} · {returnedLoans.length} restituiti
        </p>
      </div>

      {/* Active loans */}
      <div>
        <h3 className="text-lg font-medium text-ink mb-4">Prestiti attivi</h3>
        {activeLoans.length === 0 ? (
          <Card>
            <p className="text-center text-ink-soft py-6">Nessun prestito attivo</p>
          </Card>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="text-left py-3 px-4 text-xs text-stone uppercase tracking-wide font-medium">
                    Libro
                  </th>
                  <th className="text-left py-3 px-4 text-xs text-stone uppercase tracking-wide font-medium">
                    Prestato a
                  </th>
                  <th className="text-left py-3 px-4 text-xs text-stone uppercase tracking-wide font-medium">
                    Dal
                  </th>
                  <th className="text-left py-3 px-4 text-xs text-stone uppercase tracking-wide font-medium">
                    Scadenza
                  </th>
                  <th className="text-left py-3 px-4 text-xs text-stone uppercase tracking-wide font-medium">
                    Stato
                  </th>
                </tr>
              </thead>
              <tbody>
                {activeLoans.map((loan) => (
                  <tr
                    key={loan.id}
                    className="border-b border-line/50 hover:bg-surface/50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-11 rounded overflow-hidden bg-line shrink-0">
                          {loan.record && (
                            <CoverThumb src={loan.record.cover_url} title={loan.record.title} />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-ink truncate max-w-40">
                            {loan.record?.title ?? "—"}
                          </p>
                          <p className="text-xs text-ink-soft truncate">
                            {loan.record?.main_author ?? ""}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-ink">{loan.borrower_name}</td>
                    <td className="py-3 px-4 text-ink-soft">{fmt(loan.loaned_at)}</td>
                    <td className="py-3 px-4 text-ink-soft">
                      {loan.due_date ? fmt(loan.due_date) : "—"}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="info">In prestito</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Returned loans */}
      <div>
        <h3 className="text-lg font-medium text-ink mb-4">Prestiti restituiti</h3>
        {returnedLoans.length === 0 ? (
          <Card>
            <p className="text-center text-ink-soft py-6">Nessun prestito restituito</p>
          </Card>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="text-left py-3 px-4 text-xs text-stone uppercase tracking-wide font-medium">
                    Libro
                  </th>
                  <th className="text-left py-3 px-4 text-xs text-stone uppercase tracking-wide font-medium">
                    Prestato a
                  </th>
                  <th className="text-left py-3 px-4 text-xs text-stone uppercase tracking-wide font-medium">
                    Dal
                  </th>
                  <th className="text-left py-3 px-4 text-xs text-stone uppercase tracking-wide font-medium">
                    Restituito il
                  </th>
                </tr>
              </thead>
              <tbody>
                {returnedLoans.map((loan) => (
                  <tr
                    key={loan.id}
                    className="border-b border-line/50 hover:bg-surface/50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-11 rounded overflow-hidden bg-line shrink-0">
                          {loan.record && (
                            <CoverThumb src={loan.record.cover_url} title={loan.record.title} />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-ink truncate max-w-40">
                            {loan.record?.title ?? "—"}
                          </p>
                          <p className="text-xs text-ink-soft truncate">
                            {loan.record?.main_author ?? ""}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-ink">{loan.borrower_name}</td>
                    <td className="py-3 px-4 text-ink-soft">{fmt(loan.loaned_at)}</td>
                    <td className="py-3 px-4 text-sage font-medium">
                      {loan.returned_at ? fmt(loan.returned_at) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
