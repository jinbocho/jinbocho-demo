import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, ChevronRight, Vote } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Modal } from "../../components/ui/Modal";
import { BookCover } from "../../components/ui/BookCover";
import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyState } from "../../components/feedback/EmptyState";
import { useData } from "../../store/DataContext";
import { useAuth } from "../../store/AuthContext";
import { useToast } from "../../store/ToastContext";
import { useLanguage } from "../../i18n";
import { ratingSummaryForRecord, STATUS_TONE } from "./helpers";
import type { BibliographicRecord, BookClubCycle } from "../../data/types";

const ACTIVE_STATUSES = ["reading", "discussing"] as const;

function StatusPill({ status }: { status: BookClubCycle["status"] }) {
  const { t } = useLanguage();
  const label = { reading: t.bookClub.statusReading, discussing: t.bookClub.statusDiscussing, archived: t.bookClub.statusArchived }[status];
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_TONE[status]}`}>{label}</span>;
}

function CurrentReadCard({ cycle, record }: { cycle: BookClubCycle; record: BibliographicRecord | undefined }) {
  const { t } = useLanguage();
  return (
    <Link to={`/book-club/${cycle.id}`} className="block">
      <Card className="flex gap-4 border-brand/30 bg-brand/5 p-5 transition-colors hover:bg-brand/10">
        <BookCover url={record?.cover_url} title={record?.title} className="h-28 w-20 shrink-0" />
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">{t.bookClub.currentReadLabel}</span>
          <p className="mt-1 truncate font-display text-lg font-semibold text-ink">{cycle.title}</p>
          <p className="truncate text-sm text-ink-soft">{record?.title}{record?.main_author ? ` · ${record.main_author}` : ""}</p>
          <div className="mt-auto pt-3"><StatusPill status={cycle.status} /></div>
        </div>
        <ChevronRight className="self-center text-stone" size={20} />
      </Card>
    </Link>
  );
}

function CycleRow({ cycle, record }: { cycle: BookClubCycle; record: BibliographicRecord | undefined }) {
  return (
    <Link to={`/book-club/${cycle.id}`}>
      <Card className="flex items-center gap-4 p-4 transition-colors hover:bg-paper">
        <BookCover url={record?.cover_url} title={record?.title} className="h-14 w-10 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-ink">{cycle.title}</p>
          <p className="truncate text-xs text-ink-soft">{record?.title}</p>
        </div>
        <StatusPill status={cycle.status} />
      </Card>
    </Link>
  );
}

function HistoryRow({ cycle, record }: { cycle: BookClubCycle; record: BibliographicRecord | undefined }) {
  const { t } = useLanguage();
  const { books, ratings, bookClubParticipants } = useData();
  const summary = ratingSummaryForRecord(books, ratings, cycle.record_id);
  const participantCount = bookClubParticipants.filter((p) => p.cycle_id === cycle.id).length;
  return (
    <Link to={`/book-club/${cycle.id}`}>
      <Card className="flex items-center gap-4 p-4 transition-colors hover:bg-paper">
        <BookCover url={record?.cover_url} title={record?.title} className="h-14 w-10 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-ink">{cycle.title}</p>
          <p className="mt-1 text-xs text-ink-soft">
            {t.bookClub.participantsCount(participantCount)}
            {summary.average != null ? ` · ${t.bookClub.ratingLabel(summary.average, summary.total)}` : ""}
          </p>
        </div>
        <ChevronRight className="text-stone" size={18} />
      </Card>
    </Link>
  );
}

function StartCycleModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLanguage();
  const toast = useToast();
  const { currentUser } = useAuth();
  const { records } = useData();
  const { addBookClubCycle } = useData();
  const [query, setQuery] = useState("");
  const [record, setRecord] = useState<BibliographicRecord | null>(null);
  const [title, setTitle] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return records.filter((r) => r.title.toLowerCase().includes(q) || (r.main_author ?? "").toLowerCase().includes(q)).slice(0, 8);
  }, [records, query]);

  function reset() {
    setQuery("");
    setRecord(null);
    setTitle("");
  }

  function submit() {
    if (!record || !currentUser) return;
    addBookClubCycle(record.id, title.trim() || record.title, currentUser.id, null, null);
    toast.success(t.bookClub.createSuccess);
    reset();
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={() => { reset(); onClose(); }}
      title={t.bookClub.startCycleButton}
      footer={
        <>
          <Button variant="secondary" onClick={() => { reset(); onClose(); }}>{t.common.cancel}</Button>
          <Button onClick={submit} disabled={!record}>{t.bookClub.startCycleButton}</Button>
        </>
      }
    >
      <div className="space-y-4">
        <p className="text-sm text-ink-soft">{t.bookClub.startCycleHelp}</p>
        {record ? (
          <div className="flex items-center gap-3 rounded-md border border-line p-2">
            <BookCover url={record.cover_url} title={record.title} className="h-12 w-9" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">{record.title}</p>
              <p className="truncate text-xs text-ink-soft">{record.main_author}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setRecord(null)}>{t.common.edit}</Button>
          </div>
        ) : (
          <div>
            <Input label={t.bookClub.pickBookLabel} value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.bookClub.searchPlaceholder} />
            {results.length > 0 && (
              <ul className="mt-2 max-h-52 space-y-1 overflow-y-auto">
                {results.map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => { setRecord(r); if (!title) setTitle(r.title); }}
                      className="flex w-full items-center gap-3 rounded-md p-2 text-left hover:bg-paper"
                    >
                      <BookCover url={r.cover_url} title={r.title} className="h-10 w-7" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm text-ink">{r.title}</p>
                        <p className="truncate text-xs text-ink-soft">{r.main_author}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        <Input label={t.bookClub.cycleTitleLabel} value={title} onChange={(e) => setTitle(e.target.value)} placeholder={record?.title ?? ""} />
      </div>
    </Modal>
  );
}

export function BookClubPage() {
  const { t } = useLanguage();
  const { hasRole } = useAuth();
  const { bookClubCycles, records } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const isManager = hasRole("admin", "editor");

  const recordById = useMemo(() => new Map(records.map((r) => [r.id, r])), [records]);

  const active = useMemo(() => bookClubCycles.filter((c) => (ACTIVE_STATUSES as readonly string[]).includes(c.status)), [bookClubCycles]);
  const current = useMemo(() => active.find((c) => c.status === "reading" || c.status === "discussing"), [active]);
  const others = useMemo(() => active.filter((c) => c.id !== current?.id), [active, current]);
  const history = useMemo(() => bookClubCycles.filter((c) => c.status === "archived"), [bookClubCycles]);

  const isEmpty = active.length === 0 && history.length === 0;

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title={t.bookClub.title}
        description={t.bookClub.subtitle}
        actions={
          <>
            <Button variant="secondary" onClick={() => navigate("/book-club/proposals")}>
              <Vote size={16} /> {t.bookClub.proposalsLink}
            </Button>
            {isManager && (
              <Button onClick={() => setModalOpen(true)}>
                <BookOpen size={16} /> {t.bookClub.startCycleButton}
              </Button>
            )}
          </>
        }
      />

      {isEmpty ? (
        <EmptyState
          icon={<BookOpen size={44} strokeWidth={1.5} />}
          title={t.bookClub.emptyTitle}
          description={t.bookClub.emptyDescription}
          action={isManager ? <Button onClick={() => setModalOpen(true)}>{t.bookClub.startCycleButton}</Button> : undefined}
        />
      ) : (
        <div className="space-y-8">
          {current && <CurrentReadCard cycle={current} record={recordById.get(current.record_id)} />}

          {others.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-brand">
                {current ? t.bookClub.alsoActiveLabel : t.bookClub.activeLabel}
              </h2>
              {others.map((c) => <CycleRow key={c.id} cycle={c} record={recordById.get(c.record_id)} />)}
            </section>
          )}

          {history.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-brand">{t.bookClub.historyLabel}</h2>
              <p className="text-xs text-ink-soft">{t.bookClub.historyHint}</p>
              {history.map((c) => <HistoryRow key={c.id} cycle={c} record={recordById.get(c.record_id)} />)}
            </section>
          )}
        </div>
      )}

      <StartCycleModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
