import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { LocationPicker, type LocationValue } from "../../components/locations/LocationPicker";
import { DuplicateBookDialog } from "../../components/books/DuplicateBookDialog";
import { useData, type RecordDraft } from "../../store/DataContext";
import { useAddBookWithDuplicateCheck } from "../../store/useAddBookWithDuplicateCheck";
import { lookupIsbn, normalizeIsbn, randomIsbnFixture } from "../../store/isbnFixtures";
import { useLanguage } from "../../i18n";
import type { Genre } from "../../data/types";

const EMPTY_DRAFT: RecordDraft = {
  title: "", main_author: null, other_authors: [], isbn: null, publisher: null,
  publication_year: null, language: "it", genre: null, notes: null, cover_url: null,
};

export function ShelfAddPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { users, bookcases, deleteBook } = useData();
  const { conflict, submit, confirmDuplicate, cancelDuplicate } = useAddBookWithDuplicateCheck();

  const [phase, setPhase] = useState<"setup" | "scan">("setup");
  const [placement, setPlacement] = useState<LocationValue>({ room_id: null, bookcase_id: null, section_id: null, shelf_id: null });
  const [ownerId, setOwnerId] = useState<string>("");
  const [sessionBooks, setSessionBooks] = useState<{ bookId: string; title: string }[]>([]);

  const [tab, setTab] = useState<"type" | "scan">("type");
  const [isbnInput, setIsbnInput] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [reviewDraft, setReviewDraft] = useState<RecordDraft | null>(null);
  const [manualDraft, setManualDraft] = useState<RecordDraft | null>(null);

  function resetScanState() {
    setIsbnInput("");
    setNotFound(false);
    setReviewDraft(null);
    setManualDraft(null);
  }

  function handleLookup(e: FormEvent) {
    e.preventDefault();
    const result = lookupIsbn(isbnInput);
    if (!result) {
      setNotFound(true);
      setReviewDraft(null);
      return;
    }
    setNotFound(false);
    setReviewDraft({ ...result, notes: null });
  }

  function handleSimulateScan() {
    const result = randomIsbnFixture();
    setNotFound(false);
    setReviewDraft({ ...result, notes: null });
  }

  function addDraft(draft: RecordDraft) {
    const created = submit(draft, {
      ...placement,
      shelf_position: null,
      reading_status: "to_read",
      owner_id: ownerId || null,
      tags: [],
      notes: null,
      condition: "good",
      source: "purchased",
      purchase_date: new Date().toISOString().slice(0, 10),
      purchase_price: null,
    });
    if (created) {
      setSessionBooks((s) => [...s, { bookId: created.id, title: draft.title }]);
      resetScanState();
    }
  }

  function handleConfirmDuplicate() {
    const title = conflict?.record.title ?? "";
    const created = confirmDuplicate();
    if (created) {
      setSessionBooks((s) => [...s, { bookId: created.id, title }]);
      resetScanState();
    }
  }

  function handleUndo(bookId: string) {
    deleteBook(bookId);
    setSessionBooks((s) => s.filter((b) => b.bookId !== bookId));
  }

  function handleDone() {
    if (placement.bookcase_id) navigate(`/map/${placement.bookcase_id}`);
    else navigate("/catalog");
  }

  const genreOptions = (Object.keys(t.enums.genre) as Genre[]).map((g) => ({ value: g, label: t.enums.genre[g] }));
  const placementLabel = bookcases.find((bc) => bc.id === placement.bookcase_id)?.name ?? "—";

  if (phase === "setup") {
    return (
      <div className="space-y-6">
        <PageHeader title={t.books.shelfAdd.pageTitle} />
        <Card className="max-w-lg space-y-4 p-5">
          <p className="text-sm text-ink-soft">{t.books.shelfAdd.setupHint}</p>
          <LocationPicker value={placement} onChange={setPlacement} />
          <Select
            label={t.books.add.ownerLabel}
            placeholder={t.books.add.noOwner}
            value={ownerId}
            onChange={(e) => setOwnerId(e.target.value)}
            options={users.map((u) => ({ value: u.id, label: u.name }))}
          />
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => navigate("/catalog")}>{t.common.cancel}</Button>
            <Button disabled={!placement.shelf_id} onClick={() => setPhase("scan")}>{t.books.shelfAdd.startButton}</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-10 -mx-4 flex flex-wrap items-center justify-between gap-3 border-b border-line bg-paper px-4 py-3">
        <div className="text-sm text-ink-soft">
          <span className="font-medium text-ink">{placementLabel}</span> · {t.books.shelfAdd.countLabel(sessionBooks.length)}
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => setPhase("setup")}>{t.books.shelfAdd.changePositionButton}</Button>
          <Button size="sm" onClick={handleDone}>{t.books.shelfAdd.doneButton}</Button>
        </div>
      </div>

      {!reviewDraft && !manualDraft && (
        <Card className="max-w-lg space-y-4 p-5">
          <div className="flex gap-2 border-b border-line">
            <button onClick={() => setTab("type")} className={`px-3 py-2 text-sm font-medium transition-colors ${tab === "type" ? "border-b-2 border-brand text-brand" : "text-ink-soft hover:text-ink"}`}>
              {t.books.add.typeTab}
            </button>
            <button onClick={() => setTab("scan")} className={`px-3 py-2 text-sm font-medium transition-colors ${tab === "scan" ? "border-b-2 border-brand text-brand" : "text-ink-soft hover:text-ink"}`}>
              {t.books.add.scanTab}
            </button>
          </div>
          {tab === "type" ? (
            <form onSubmit={handleLookup} className="space-y-3">
              <Input label={t.books.add.isbnLabel} value={isbnInput} onChange={(e) => setIsbnInput(e.target.value)} placeholder="978..." />
              {notFound && <p className="text-sm text-amber">{t.books.add.notFoundMessage}</p>}
              <div className="flex gap-2">
                <Button type="submit">{t.books.add.lookupButton}</Button>
                {notFound && (
                  <Button type="button" variant="secondary" onClick={() => setManualDraft({ ...EMPTY_DRAFT, isbn: normalizeIsbn(isbnInput) })}>
                    {t.books.add.manualEntryButton}
                  </Button>
                )}
              </div>
            </form>
          ) : (
            <Button onClick={handleSimulateScan}>{t.books.add.simulateScanButton}</Button>
          )}
        </Card>
      )}

      {reviewDraft && (
        <Card className="max-w-lg space-y-3 p-5">
          <p className="font-medium text-ink">{reviewDraft.title}</p>
          {reviewDraft.main_author && <p className="text-sm text-ink-soft">{reviewDraft.main_author}</p>}
          {reviewDraft.isbn && <p className="text-xs text-stone">{reviewDraft.isbn}</p>}
          <div className="flex gap-2">
            <Button size="sm" onClick={() => addDraft(reviewDraft)}>{t.books.shelfAdd.addButton}</Button>
            <Button size="sm" variant="secondary" onClick={() => setManualDraft(reviewDraft)}>{t.books.shelfAdd.editButton}</Button>
            <Button size="sm" variant="ghost" onClick={resetScanState}>{t.books.shelfAdd.skipButton}</Button>
          </div>
        </Card>
      )}

      {manualDraft && (
        <Card className="max-w-lg space-y-3 p-5">
          <Input label={t.books.add.titleLabel} value={manualDraft.title} onChange={(e) => setManualDraft({ ...manualDraft, title: e.target.value })} />
          <Input label={t.books.add.authorLabel} value={manualDraft.main_author ?? ""} onChange={(e) => setManualDraft({ ...manualDraft, main_author: e.target.value || null })} />
          <div className="grid grid-cols-2 gap-3">
            <Input label={t.books.add.isbnFieldLabel} value={manualDraft.isbn ?? ""} onChange={(e) => setManualDraft({ ...manualDraft, isbn: e.target.value || null })} />
            <Input
              label={t.books.add.yearLabel}
              type="number"
              value={manualDraft.publication_year ?? ""}
              onChange={(e) => setManualDraft({ ...manualDraft, publication_year: e.target.value ? Number(e.target.value) : null })}
            />
          </div>
          <Input label={t.books.add.publisherLabel} value={manualDraft.publisher ?? ""} onChange={(e) => setManualDraft({ ...manualDraft, publisher: e.target.value || null })} />
          <Select
            label={t.books.add.genreLabel}
            placeholder={t.placement.selectPlaceholder}
            value={manualDraft.genre ?? ""}
            onChange={(e) => setManualDraft({ ...manualDraft, genre: (e.target.value || null) as Genre | null })}
            options={genreOptions}
          />
          <div className="flex gap-2">
            <Button size="sm" disabled={!manualDraft.title.trim()} onClick={() => addDraft(manualDraft)}>{t.books.shelfAdd.addButton}</Button>
            <Button size="sm" variant="ghost" onClick={resetScanState}>{t.books.shelfAdd.skipButton}</Button>
          </div>
        </Card>
      )}

      <Card className="max-w-lg space-y-2 p-5">
        <h2 className="font-display text-base font-semibold text-ink">{t.books.shelfAdd.sessionTitle}</h2>
        {sessionBooks.length === 0 ? (
          <p className="text-sm text-ink-soft">{t.books.shelfAdd.noSessionBooks}</p>
        ) : (
          <ul className="space-y-2">
            {sessionBooks.map((b) => (
              <li key={b.bookId} className="flex items-center justify-between gap-3 text-sm">
                <span className="truncate text-ink">{b.title}</span>
                <button onClick={() => handleUndo(b.bookId)} className="shrink-0 text-xs text-danger hover:underline">{t.books.shelfAdd.undoButton}</button>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {conflict && (
        <DuplicateBookDialog open reason={conflict.reason} record={conflict.record} onConfirm={handleConfirmDuplicate} onCancel={cancelDuplicate} />
      )}
    </div>
  );
}
