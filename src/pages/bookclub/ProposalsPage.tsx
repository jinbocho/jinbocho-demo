import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThumbsUp } from "lucide-react";
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
import type { BibliographicRecord, BookClubProposal } from "../../data/types";

function ProposalRow({ proposal, isManager }: { proposal: BookClubProposal; isManager: boolean }) {
  const { t } = useLanguage();
  const toast = useToast();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { records, bookClubVotes, toggleBookClubVote, promoteBookClubProposal } = useData();
  const record = records.find((r) => r.id === proposal.record_id);
  const votes = bookClubVotes.filter((v) => v.proposal_id === proposal.id);
  const votedByMe = votes.some((v) => v.user_id === currentUser?.id);

  function handleVote() {
    if (!currentUser) return;
    toggleBookClubVote(proposal.id, currentUser.id);
  }

  function handlePromote() {
    if (!currentUser) return;
    const cycle = promoteBookClubProposal(proposal.id, currentUser.id);
    if (!cycle) return;
    toast.success(t.bookClub.promoteSuccess);
    navigate(`/book-club/${cycle.id}`);
  }

  return (
    <Card className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <BookCover url={record?.cover_url} title={record?.title} className="h-14 w-10 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-ink">{record?.title ?? "—"}</p>
          <p className="truncate text-xs text-ink-soft">{record?.main_author}</p>
          {proposal.note && <p className="mt-1 truncate text-xs italic text-ink-soft">{proposal.note}</p>}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
        <Button variant={votedByMe ? "primary" : "secondary"} size="sm" onClick={handleVote}>
          <ThumbsUp size={14} /> {votes.length}
        </Button>
        {isManager && <Button variant="ghost" size="sm" onClick={handlePromote}>{t.bookClub.promoteButton}</Button>}
      </div>
    </Card>
  );
}

function ProposeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLanguage();
  const toast = useToast();
  const { currentUser } = useAuth();
  const { records, addBookClubProposal } = useData();
  const [query, setQuery] = useState("");
  const [note, setNote] = useState("");
  const [record, setRecord] = useState<BibliographicRecord | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return records.filter((r) => r.title.toLowerCase().includes(q) || (r.main_author ?? "").toLowerCase().includes(q)).slice(0, 8);
  }, [records, query]);

  function reset() {
    setQuery("");
    setNote("");
    setRecord(null);
  }

  function submit() {
    if (!record || !currentUser) return;
    addBookClubProposal(record.id, currentUser.id, note.trim() || null);
    toast.success(t.bookClub.createSuccess);
    reset();
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={() => { reset(); onClose(); }}
      title={t.bookClub.proposeBookButton}
      footer={
        <>
          <Button variant="secondary" onClick={() => { reset(); onClose(); }}>{t.common.cancel}</Button>
          <Button onClick={submit} disabled={!record}>{t.bookClub.proposeBookButton}</Button>
        </>
      }
    >
      <div className="space-y-4">
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
                      onClick={() => setRecord(r)}
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
        <Input label={t.bookClub.proposalNoteLabel} value={note} onChange={(e) => setNote(e.target.value)} placeholder={t.bookClub.proposalNotePlaceholder} />
      </div>
    </Modal>
  );
}

export function ProposalsPage() {
  const { t } = useLanguage();
  const { hasRole } = useAuth();
  const { bookClubProposals, bookClubVotes } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const isManager = hasRole("admin", "editor");

  const sorted = useMemo(
    () => [...bookClubProposals].sort((a, b) => bookClubVotes.filter((v) => v.proposal_id === b.id).length - bookClubVotes.filter((v) => v.proposal_id === a.id).length),
    [bookClubProposals, bookClubVotes],
  );

  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/book-club" className="mb-4 inline-block text-sm text-brand hover:underline">← {t.bookClub.backLink}</Link>

      <PageHeader
        title={t.bookClub.proposalsTitle}
        description={t.bookClub.proposalsSubtitle}
        actions={<Button onClick={() => setModalOpen(true)}>{t.bookClub.proposeBookButton}</Button>}
      />

      {sorted.length === 0 ? (
        <EmptyState title={t.bookClub.noProposals} description={t.bookClub.noProposalsDescription} />
      ) : (
        <div className="space-y-3">
          {sorted.map((p) => <ProposalRow key={p.id} proposal={p} isManager={isManager} />)}
        </div>
      )}

      <ProposeModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
