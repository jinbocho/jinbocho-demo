import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { BookCover } from "../components/ui/BookCover";
import { Avatar } from "../components/ui/Avatar";
import { Card } from "../components/ui/Card";
import { Modal } from "../components/ui/Modal";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Textarea } from "../components/ui/Textarea";
import { LocationPicker, type LocationValue } from "../components/locations/LocationPicker";
import { useData, type RecordDraft } from "../store/DataContext";
import { useAuth } from "../store/AuthContext";
import { useToast } from "../store/ToastContext";
import { useLanguage } from "../i18n";
import type { BookCondition, BookSource, Genre } from "../data/types";

const EMPTY_RECORD_DRAFT: RecordDraft = {
  title: "", main_author: null, other_authors: [], isbn: null, publisher: null,
  publication_year: null, language: "it", genre: null, notes: null, cover_url: null,
};

const EMPTY_LOCATION: LocationValue = { room_id: null, bookcase_id: null, section_id: null, shelf_id: null };

const AI_INCIPIT_POOL = [
  "Quella mattina la luce entrava obliqua tra le persiane, e per un istante la stanza sembrò sospesa fuori dal tempo.",
  "Nessuno avrebbe potuto prevedere come quella semplice decisione avrebbe cambiato tutto il resto della storia.",
  "C'era una quiete strana nell'aria, come se ogni cosa stesse trattenendo il fiato in attesa di qualcosa.",
  "Il viaggio cominciò senza una meta precisa, ma con la certezza che nulla sarebbe stato come prima.",
];

export function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const toast = useToast();
  const { hasRole } = useAuth();
  const {
    books, records, users, loans, reads, history, incipits,
    rooms, bookcases, sections, shelves,
    updateRecord, updateBook, moveBook, deleteBook,
    markRead, unmarkRead, lendBook, returnBook, setIncipit,
  } = useData();

  const canEdit = hasRole("admin", "editor");

  const [editOpen, setEditOpen] = useState(false);
  const [moveOpen, setMoveOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingPresentation, setEditingPresentation] = useState(false);
  const [presentationDraft, setPresentationDraft] = useState("");
  const [generatingAi, setGeneratingAi] = useState(false);
  const [borrowerName, setBorrowerName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [editDraft, setEditDraft] = useState<RecordDraft>(EMPTY_RECORD_DRAFT);
  const [editTags, setEditTags] = useState("");
  const [editCondition, setEditCondition] = useState<BookCondition | "">("");
  const [editSource, setEditSource] = useState<BookSource | "">("");
  const [editOwnerId, setEditOwnerId] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [movePlacement, setMovePlacement] = useState<LocationValue>(EMPTY_LOCATION);

  function fmtLong(dateStr: string) {
    return new Date(dateStr).toLocaleDateString(t.locale, { day: "numeric", month: "long", year: "numeric" });
  }
  function fmtShort(dateStr: string) {
    return new Date(dateStr).toLocaleDateString(t.locale, { day: "numeric", month: "short", year: "numeric" });
  }

  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <span className="text-5xl mb-4">📕</span>
        <p className="text-ink font-medium text-lg">{t.bookDetail.notFound}</p>
        <Button variant="secondary" className="mt-4" onClick={() => navigate("/catalog")}>{t.bookDetail.backToCatalog}</Button>
      </div>
    );
  }

  const record = records.find((r) => r.id === book.record_id);

  if (!record) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <span className="text-5xl mb-4">📕</span>
        <p className="text-ink font-medium text-lg">{t.bookDetail.recordNotFound}</p>
        <Button variant="secondary" className="mt-4" onClick={() => navigate("/catalog")}>{t.bookDetail.backToCatalog}</Button>
      </div>
    );
  }

  const owner = users.find((u) => u.id === book.owner_id);
  const currentReader = book.current_reader_id ? users.find((u) => u.id === book.current_reader_id) : null;
  const bookLoans = loans.filter((l) => l.book_id === book.id).sort((a, b) => b.loaned_at.localeCompare(a.loaned_at));
  const activeLoan = bookLoans.find((l) => l.returned_at === null) ?? null;
  const bookReads = reads.filter((r) => r.book_id === book.id);
  const readerUserIds = new Set(bookReads.map((r) => r.user_id));
  const bookHistory = history.filter((h) => h.book_id === book.id).sort((a, b) => b.created_at.localeCompare(a.created_at));
  const incipit = incipits.find((i) => i.record_id === record.id) ?? null;

  const room = book.room_id ? rooms.find((r) => r.id === book.room_id) : null;
  const bookcase = book.bookcase_id ? bookcases.find((b2) => b2.id === book.bookcase_id) : null;
  const section = book.section_id ? sections.find((s) => s.id === book.section_id) : null;
  const shelf = book.shelf_id ? shelves.find((s) => s.id === book.shelf_id) : null;

  const b = book;
  const r = record;

  function openEdit() {
    setEditDraft({ ...r });
    setEditTags(b.tags.join(", "));
    setEditCondition(b.condition ?? "");
    setEditSource(b.source ?? "");
    setEditOwnerId(b.owner_id ?? "");
    setEditNotes(b.notes ?? "");
    setEditOpen(true);
  }

  function handleSaveEdit() {
    updateRecord(r.id, editDraft);
    updateBook(b.id, {
      tags: editTags.split(",").map((tg) => tg.trim()).filter(Boolean),
      condition: editCondition || null,
      source: editSource || null,
      owner_id: editOwnerId || null,
      notes: editNotes || null,
    });
    setEditOpen(false);
    toast.success(t.common.save);
  }

  function openMove() {
    setMovePlacement({ room_id: b.room_id, bookcase_id: b.bookcase_id, section_id: b.section_id, shelf_id: b.shelf_id });
    setMoveOpen(true);
  }

  function handleSaveMove() {
    moveBook(b.id, { ...movePlacement, shelf_position: null });
    setMoveOpen(false);
  }

  function handleDelete() {
    deleteBook(b.id);
    toast.success(t.bookDetail.deleteButton);
    navigate("/catalog");
  }

  function handleLend() {
    if (!borrowerName.trim()) return;
    lendBook(b.id, borrowerName.trim(), dueDate || null);
    setBorrowerName("");
    setDueDate("");
  }

  function handleGenerateAi() {
    setGeneratingAi(true);
    setTimeout(() => {
      const text = AI_INCIPIT_POOL[Math.floor(Math.random() * AI_INCIPIT_POOL.length)];
      setIncipit(r.id, text, "ai");
      setGeneratingAi(false);
    }, 800);
  }

  function openEditPresentation() {
    setPresentationDraft(incipit?.text ?? "");
    setEditingPresentation(true);
  }

  function handleSavePresentation() {
    setIncipit(r.id, presentationDraft.trim(), "manual");
    setEditingPresentation(false);
  }

  const genreOptions = (Object.keys(t.enums.genre) as Genre[]).map((g) => ({ value: g, label: t.enums.genre[g] }));
  const conditionOptions = (Object.keys(t.enums.condition) as BookCondition[]).map((c) => ({ value: c, label: t.enums.condition[c] }));
  const sourceOptions = (Object.keys(t.enums.source) as BookSource[]).map((s) => ({ value: s, label: t.enums.source[s] }));

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <Button variant="ghost" size="sm" onClick={() => navigate("/catalog")}>{t.bookDetail.backToCatalog}</Button>
        {canEdit && (
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={openEdit}>{t.bookDetail.editButton}</Button>
            <Button variant="secondary" size="sm" onClick={openMove}>{t.bookDetail.moveButton}</Button>
            <Button variant="danger" size="sm" onClick={() => setDeleteOpen(true)}>{t.bookDetail.deleteButton}</Button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="shrink-0 md:w-48">
          <BookCover url={record.cover_url} title={record.title} className="h-64 w-full rounded-lg md:h-72" />
        </div>

        <div className="flex-1 space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl text-ink leading-tight">{record.title}</h2>
            {record.main_author && <p className="text-lg text-ink-soft mt-1">{record.main_author}</p>}
            <div className="mt-3">
              <Badge variant={book.reading_status} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            {record.publication_year && (
              <div><p className="text-xs text-stone uppercase tracking-wide">{t.bookDetail.fieldYear}</p><p className="text-sm text-ink font-medium">{record.publication_year}</p></div>
            )}
            {record.publisher && (
              <div><p className="text-xs text-stone uppercase tracking-wide">{t.bookDetail.fieldPublisher}</p><p className="text-sm text-ink font-medium">{record.publisher}</p></div>
            )}
            {record.isbn && (
              <div><p className="text-xs text-stone uppercase tracking-wide">{t.bookDetail.fieldIsbn}</p><p className="text-sm text-ink font-medium font-mono">{record.isbn}</p></div>
            )}
            {record.genre && (
              <div><p className="text-xs text-stone uppercase tracking-wide">{t.bookDetail.fieldGenre}</p><p className="text-sm text-ink font-medium">{t.enums.genre[record.genre]}</p></div>
            )}
            {book.purchase_year && (
              <div><p className="text-xs text-stone uppercase tracking-wide">{t.bookDetail.fieldPurchased}</p><p className="text-sm text-ink font-medium">{book.purchase_year}</p></div>
            )}
            {book.condition && (
              <div><p className="text-xs text-stone uppercase tracking-wide">{t.bookDetail.conditionLabel}</p><p className="text-sm text-ink font-medium">{t.enums.condition[book.condition]}</p></div>
            )}
            {book.source && (
              <div><p className="text-xs text-stone uppercase tracking-wide">{t.bookDetail.sourceLabel}</p><p className="text-sm text-ink font-medium">{t.enums.source[book.source]}</p></div>
            )}
          </div>

          {(room || bookcase || section || shelf) && (
            <div className="bg-paper rounded-lg border border-line px-4 py-3">
              <p className="text-xs text-stone uppercase tracking-wide mb-2">{t.bookDetail.position}</p>
              <div className="flex items-center gap-2 flex-wrap text-sm">
                {room && <span className="font-medium text-ink">{room.name}</span>}
                {bookcase && (
                  <>
                    <span className="text-stone">›</span>
                    <span className="text-brand hover:underline cursor-pointer" onClick={() => navigate(`/map/${bookcase.id}`)}>{bookcase.name}</span>
                  </>
                )}
                {section && (
                  <>
                    <span className="text-stone">›</span>
                    <span className="text-ink-soft">{section.label ?? t.bookDetail.sectionLabel(section.section_index)}</span>
                  </>
                )}
                {shelf && (
                  <>
                    <span className="text-stone">›</span>
                    <span className="text-ink-soft">{t.bookDetail.shelfLabel(shelf.shelf_index)}</span>
                  </>
                )}
                {book.shelf_position != null && (
                  <>
                    <span className="text-stone">›</span>
                    <span className="text-ink-soft">{t.bookDetail.posLabel} {book.shelf_position}</span>
                  </>
                )}
              </div>
            </div>
          )}

          {owner && (
            <div className="flex items-center gap-3">
              <p className="text-xs text-stone uppercase tracking-wide">{t.bookDetail.owner}</p>
              <div className="flex items-center gap-2">
                <Avatar name={owner.name} color={owner.avatar_color} size="sm" />
                <span className="text-sm font-medium text-ink">{owner.name}</span>
                <span className="text-xs text-stone capitalize">{t.enums.role[owner.role]}</span>
              </div>
            </div>
          )}

          {currentReader && (
            <div className="flex items-center gap-3">
              <p className="text-xs text-stone uppercase tracking-wide">{t.bookDetail.readingBy}</p>
              <div className="flex items-center gap-2">
                <Avatar name={currentReader.name} color={currentReader.avatar_color} size="sm" />
                <span className="text-sm font-medium text-amber">{currentReader.name}</span>
              </div>
            </div>
          )}

          {book.notes && (
            <div>
              <p className="text-xs text-stone uppercase tracking-wide mb-1">{t.bookDetail.notes}</p>
              <p className="text-sm text-ink-soft italic">{book.notes}</p>
            </div>
          )}

          {book.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {book.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-paper border border-line rounded-full text-xs text-ink-soft">#{tag}</span>
              ))}
            </div>
          )}

          {/* Presentation / Incipit */}
          <Card className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs text-stone uppercase tracking-wide">{t.bookDetail.presentationTitle}</p>
              {incipit?.source && (
                <span className="text-xs text-ink-soft">
                  {incipit.source === "ai" ? t.bookDetail.sourceAi : incipit.source === "manual" ? t.bookDetail.sourceManual : t.bookDetail.sourceEditorial}
                </span>
              )}
            </div>
            {editingPresentation ? (
              <div className="space-y-2">
                <Textarea rows={4} value={presentationDraft} onChange={(e) => setPresentationDraft(e.target.value)} />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSavePresentation}>{t.common.save}</Button>
                  <Button size="sm" variant="secondary" onClick={() => setEditingPresentation(false)}>{t.common.cancel}</Button>
                </div>
              </div>
            ) : incipit?.text ? (
              <p className="text-sm italic text-ink-soft">{incipit.text}</p>
            ) : (
              <p className="text-sm text-ink-soft">{t.bookDetail.presentationEmpty}</p>
            )}
            {canEdit && !editingPresentation && (
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="secondary" onClick={openEditPresentation}>{t.bookDetail.editPresentationButton}</Button>
                <Button size="sm" variant="secondary" disabled={generatingAi} onClick={handleGenerateAi}>
                  {generatingAi ? t.bookDetail.generatingAi : t.bookDetail.generateAiButton}
                </Button>
              </div>
            )}
          </Card>

          {/* Who's read it */}
          <Card className="p-4">
            <p className="mb-2 text-xs text-stone uppercase tracking-wide">{t.bookDetail.whoReadTitle}</p>
            <ul className="space-y-2">
              {users.map((u) => {
                const hasRead = readerUserIds.has(u.id);
                const readEntry = bookReads.find((r) => r.user_id === u.id);
                return (
                  <li key={u.id} className="flex items-center gap-3">
                    <Avatar name={u.name} color={u.avatar_color} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-ink">{u.name}</p>
                      {hasRead && readEntry && <p className="text-xs text-stone">{fmtShort(readEntry.read_at)}</p>}
                    </div>
                    {canEdit ? (
                      <button
                        onClick={() => (hasRead ? unmarkRead(book.id, u.id) : markRead(book.id, u.id))}
                        className={`text-xs hover:underline ${hasRead ? "text-ink-soft" : "text-brand"}`}
                      >
                        {hasRead ? t.bookDetail.markUnread : t.bookDetail.markRead}
                      </button>
                    ) : (
                      hasRead && <Badge variant="read" />
                    )}
                  </li>
                );
              })}
            </ul>
          </Card>

          {/* Loans */}
          <Card className="p-4">
            <p className="mb-2 text-xs text-stone uppercase tracking-wide">{t.bookDetail.loanStatus}</p>
            {activeLoan ? (
              <div className="rounded-lg border border-brand/20 bg-brand/5 px-4 py-3">
                <p className="text-sm text-ink">
                  {t.bookDetail.loanedTo} <span className="font-semibold">{activeLoan.borrower_name}</span> {t.bookDetail.loanedFrom} {fmtLong(activeLoan.loaned_at)}
                </p>
                {activeLoan.due_date && <p className="mt-0.5 text-xs text-ink-soft">{t.bookDetail.dueDate} {fmtLong(activeLoan.due_date)}</p>}
                {canEdit && (
                  <Button size="sm" className="mt-3" onClick={() => returnBook(activeLoan.id)}>{t.bookDetail.returnButton}</Button>
                )}
              </div>
            ) : canEdit ? (
              <div className="space-y-2">
                <p className="text-sm text-ink-soft">{t.bookDetail.lendTitle}</p>
                <div className="grid grid-cols-2 gap-3">
                  <Input label={t.bookDetail.borrowerLabel} value={borrowerName} onChange={(e) => setBorrowerName(e.target.value)} />
                  <Input label={t.bookDetail.dueDateLabel} type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </div>
                <Button size="sm" disabled={!borrowerName.trim()} onClick={handleLend}>{t.bookDetail.lendButton}</Button>
              </div>
            ) : (
              <p className="text-sm text-ink-soft">{t.dashboard.allBooksHome}</p>
            )}

            {bookLoans.length > 0 && (
              <div className="mt-4 border-t border-line pt-3">
                <p className="mb-2 text-xs text-stone uppercase tracking-wide">{t.bookDetail.loanHistoryTitle}</p>
                <ul className="space-y-1.5">
                  {bookLoans.map((l) => (
                    <li key={l.id} className="text-xs text-ink-soft">
                      {l.borrower_name} — {fmtShort(l.loaned_at)} {l.returned_at ? `→ ${fmtShort(l.returned_at)}` : `(${t.loans.statusOnLoan})`}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>

          {/* History */}
          <Card className="p-4">
            <p className="mb-2 text-xs text-stone uppercase tracking-wide">{t.bookDetail.historyTitle}</p>
            {bookHistory.length === 0 ? (
              <p className="text-sm text-ink-soft">{t.bookDetail.noHistory}</p>
            ) : (
              <ul className="space-y-1.5">
                {bookHistory.map((h) => (
                  <li key={h.id} className="flex justify-between gap-3 text-xs text-ink-soft">
                    <span>{h.description}</span>
                    <span className="shrink-0 text-stone">{fmtShort(h.created_at)}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title={t.bookDetail.editModalTitle} footer={
        <>
          <Button variant="secondary" onClick={() => setEditOpen(false)}>{t.common.cancel}</Button>
          <Button onClick={handleSaveEdit}>{t.common.save}</Button>
        </>
      }>
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-stone">{t.bookDetail.editRecordSection}</p>
            <div className="space-y-3">
              <Input label={t.books.add.titleLabel} value={editDraft.title} onChange={(e) => setEditDraft({ ...editDraft, title: e.target.value })} />
              <Input label={t.books.add.authorLabel} value={editDraft.main_author ?? ""} onChange={(e) => setEditDraft({ ...editDraft, main_author: e.target.value || null })} />
              <div className="grid grid-cols-2 gap-3">
                <Input label={t.books.add.isbnFieldLabel} value={editDraft.isbn ?? ""} onChange={(e) => setEditDraft({ ...editDraft, isbn: e.target.value || null })} />
                <Input label={t.books.add.yearLabel} type="number" value={editDraft.publication_year ?? ""} onChange={(e) => setEditDraft({ ...editDraft, publication_year: e.target.value ? Number(e.target.value) : null })} />
              </div>
              <Input label={t.books.add.publisherLabel} value={editDraft.publisher ?? ""} onChange={(e) => setEditDraft({ ...editDraft, publisher: e.target.value || null })} />
              <Select label={t.books.add.genreLabel} placeholder={t.placement.selectPlaceholder} value={editDraft.genre ?? ""} onChange={(e) => setEditDraft({ ...editDraft, genre: (e.target.value || null) as Genre | null })} options={genreOptions} />
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-stone">{t.bookDetail.editCopySection}</p>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Select label={t.bookDetail.conditionLabel} placeholder={t.placement.selectPlaceholder} value={editCondition} onChange={(e) => setEditCondition(e.target.value as BookCondition)} options={conditionOptions} />
                <Select label={t.bookDetail.sourceLabel} placeholder={t.placement.selectPlaceholder} value={editSource} onChange={(e) => setEditSource(e.target.value as BookSource)} options={sourceOptions} />
              </div>
              <Select label={t.books.add.ownerLabel} placeholder={t.books.add.noOwner} value={editOwnerId} onChange={(e) => setEditOwnerId(e.target.value)} options={users.map((u) => ({ value: u.id, label: u.name }))} />
              <Input label={t.bookDetail.tagsLabel} value={editTags} onChange={(e) => setEditTags(e.target.value)} placeholder={t.bookDetail.tagsHint} />
              <Textarea label={t.bookDetail.notes} rows={2} value={editNotes} onChange={(e) => setEditNotes(e.target.value)} />
            </div>
          </div>
        </div>
      </Modal>

      <Modal open={moveOpen} onClose={() => setMoveOpen(false)} title={t.bookDetail.moveModalTitle} footer={
        <>
          <Button variant="secondary" onClick={() => setMoveOpen(false)}>{t.common.cancel}</Button>
          <Button onClick={handleSaveMove}>{t.common.save}</Button>
        </>
      }>
        <LocationPicker value={movePlacement} onChange={setMovePlacement} />
      </Modal>

      <ConfirmDialog
        open={deleteOpen}
        title={t.bookDetail.deleteConfirmTitle}
        message={t.bookDetail.deleteConfirmMessage}
        destructive
        confirmLabel={t.bookDetail.deleteButton}
        onConfirm={handleDelete}
        onClose={() => setDeleteOpen(false)}
      />
    </div>
  );
}
