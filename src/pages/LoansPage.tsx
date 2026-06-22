import { useMemo } from "react";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { BookCover } from "../components/ui/BookCover";
import { PageHeader } from "../components/ui/PageHeader";
import { useData } from "../store/DataContext";
import { useLanguage } from "../i18n";

export function LoansPage() {
  const { t } = useLanguage();
  const { loans, books, records } = useData();

  const enrichedLoans = useMemo(() => {
    return loans.map((loan) => {
      const book = books.find((b) => b.id === loan.book_id);
      const record = book ? records.find((r) => r.id === book.record_id) : null;
      return { ...loan, record };
    });
  }, [loans, books, records]);

  const activeLoans = enrichedLoans.filter((l) => l.returned_at === null);
  const returnedLoans = enrichedLoans.filter((l) => l.returned_at !== null);

  function fmt(dateStr: string) {
    return new Date(dateStr).toLocaleDateString(t.locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={t.loans.title}
        description={t.loans.subtitle(activeLoans.length, returnedLoans.length)}
      />

      {/* Active loans */}
      <div>
        <h3 className="text-lg font-medium text-ink mb-4">{t.loans.activeLoans}</h3>
        {activeLoans.length === 0 ? (
          <Card>
            <p className="text-center text-ink-soft py-6">{t.loans.noActiveLoans}</p>
          </Card>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="text-left py-3 px-4 text-xs text-stone uppercase tracking-wide font-medium">
                    {t.loans.colBook}
                  </th>
                  <th className="text-left py-3 px-4 text-xs text-stone uppercase tracking-wide font-medium">
                    {t.loans.colLoanedTo}
                  </th>
                  <th className="text-left py-3 px-4 text-xs text-stone uppercase tracking-wide font-medium">
                    {t.loans.colFrom}
                  </th>
                  <th className="text-left py-3 px-4 text-xs text-stone uppercase tracking-wide font-medium">
                    {t.loans.colDue}
                  </th>
                  <th className="text-left py-3 px-4 text-xs text-stone uppercase tracking-wide font-medium">
                    {t.loans.colStatus}
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
                        <div className="w-8 h-11 shrink-0">
                          <BookCover url={loan.record?.cover_url} title={loan.record?.title} className="h-full w-full" />
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
                      <Badge variant="info">{t.loans.statusOnLoan}</Badge>
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
        <h3 className="text-lg font-medium text-ink mb-4">{t.loans.returnedLoans}</h3>
        {returnedLoans.length === 0 ? (
          <Card>
            <p className="text-center text-ink-soft py-6">{t.loans.noReturnedLoans}</p>
          </Card>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="text-left py-3 px-4 text-xs text-stone uppercase tracking-wide font-medium">
                    {t.loans.colBook}
                  </th>
                  <th className="text-left py-3 px-4 text-xs text-stone uppercase tracking-wide font-medium">
                    {t.loans.colLoanedTo}
                  </th>
                  <th className="text-left py-3 px-4 text-xs text-stone uppercase tracking-wide font-medium">
                    {t.loans.colFrom}
                  </th>
                  <th className="text-left py-3 px-4 text-xs text-stone uppercase tracking-wide font-medium">
                    {t.loans.colReturnedOn}
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
                        <div className="w-8 h-11 shrink-0">
                          <BookCover url={loan.record?.cover_url} title={loan.record?.title} className="h-full w-full" />
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
