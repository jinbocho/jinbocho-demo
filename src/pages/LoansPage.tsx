import { useMemo, useState } from "react";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { BookCover } from "../components/ui/BookCover";
import { PageHeader } from "../components/ui/PageHeader";
import { useData } from "../store/DataContext";
import { useAuth } from "../store/AuthContext";
import { useToast } from "../store/ToastContext";
import { useLanguage } from "../i18n";

type LoanUrgency = "overdue" | "warning" | "normal";

// A loan is "warning" within a week of its due date, "overdue" past it.
function loanUrgency(dueDate: string | null): LoanUrgency {
  if (!dueDate) return "normal";
  const due = new Date(dueDate);
  if (Number.isNaN(due.getTime())) return "normal";
  const daysUntilDue = (due.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
  if (daysUntilDue < 0) return "overdue";
  if (daysUntilDue <= 7) return "warning";
  return "normal";
}

const URGENCY_CLASS: Record<LoanUrgency, string> = {
  overdue: "font-semibold text-danger",
  warning: "font-medium text-amber",
  normal: "text-ink-soft",
};

export function LoansPage() {
  const { t } = useLanguage();
  const { loans, books, records, returnBook } = useData();
  const { hasRole } = useAuth();
  const toast = useToast();
  const canEdit = hasRole("admin", "editor");

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<LoanUrgency | "all">("all");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const enrichedLoans = useMemo(() => {
    return loans.map((loan) => {
      const book = books.find((b) => b.id === loan.book_id);
      const record = book ? records.find((r) => r.id === book.record_id) : null;
      return { ...loan, record };
    });
  }, [loans, books, records]);

  const activeLoans = enrichedLoans.filter((l) => l.returned_at === null);
  const returnedLoans = enrichedLoans.filter((l) => l.returned_at !== null);

  const overdueCount = useMemo(
    () => activeLoans.filter((l) => loanUrgency(l.due_date) === "overdue").length,
    [activeLoans],
  );

  const filteredActiveLoans = useMemo(() => {
    const q = query.trim().toLowerCase();
    return activeLoans.filter((loan) => {
      if (statusFilter !== "all" && loanUrgency(loan.due_date) !== statusFilter) return false;
      if (q) {
        const haystack = `${loan.borrower_name} ${loan.record?.title ?? ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [activeLoans, query, statusFilter]);

  const activeFilterCount = statusFilter !== "all" ? 1 : 0;

  function handleReturn(loanId: string) {
    returnBook(loanId);
    toast.success(t.loans.returnSuccess);
  }

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
        actions={overdueCount > 0 ? <Badge variant="danger">{t.loans.overdueBadge(overdueCount)}</Badge> : undefined}
      />

      {/* Active loans */}
      <div>
        <h3 className="text-lg font-medium text-ink mb-4">{t.loans.activeLoans}</h3>
        {activeLoans.length === 0 ? (
          <Card>
            <p className="text-center text-ink-soft py-6">{t.loans.noActiveLoans}</p>
          </Card>
        ) : (
          <div className="space-y-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="flex-1 min-w-[200px]">
                <Input label={t.loans.searchPlaceholder} placeholder={t.loans.searchPlaceholder} value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <Button variant="secondary" size="sm" onClick={() => setFiltersOpen((v) => !v)}>
                {t.loans.filtersToggle} {filtersOpen ? "▲" : "▼"}
                {activeFilterCount > 0 && (
                  <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand/15 px-1 text-xs font-semibold text-brand">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </div>

            {filtersOpen && (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <Select
                  label={t.loans.filterStatus}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as LoanUrgency | "all")}
                  options={[
                    { value: "all", label: t.catalog.statusAll },
                    { value: "overdue", label: t.loans.statusOverdue },
                    { value: "warning", label: t.loans.statusWarning },
                    { value: "normal", label: t.loans.statusNormal },
                  ]}
                />
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setStatusFilter("all")}
                    className="text-sm text-brand hover:underline sm:col-span-2 lg:col-span-3"
                  >
                    {t.loans.clearFilters}
                  </button>
                )}
              </div>
            )}

            {filteredActiveLoans.length === 0 ? (
              <p className="py-6 text-center text-sm text-ink-soft">{t.loans.noSearchResults}</p>
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
                      {canEdit && <th className="py-3 px-4" />}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredActiveLoans.map((loan) => {
                      const urgency = loanUrgency(loan.due_date);
                      return (
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
                          <td className={`py-3 px-4 ${URGENCY_CLASS[urgency]}`}>
                            {loan.due_date ? fmt(loan.due_date) : "—"}
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="info">{t.loans.statusOnLoan}</Badge>
                          </td>
                          {canEdit && (
                            <td className="py-3 px-4 text-right">
                              <Button variant="secondary" size="sm" onClick={() => handleReturn(loan.id)}>
                                {t.loans.markReturnedAction}
                              </Button>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
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
