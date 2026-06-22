import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { LocationPicker, type LocationValue } from "../../components/locations/LocationPicker";
import { DuplicateBookDialog } from "../../components/books/DuplicateBookDialog";
import { useData, type RecordDraft, type BookDraft } from "../../store/DataContext";
import { useAddBookWithDuplicateCheck } from "../../store/useAddBookWithDuplicateCheck";
import { lookupIsbn, normalizeIsbn, randomIsbnFixture } from "../../store/isbnFixtures";
import { useToast } from "../../store/ToastContext";
import { useLanguage } from "../../i18n";
import type { Genre, ReadingStatus } from "../../data/types";

const EMPTY_DRAFT: RecordDraft = {
  title: "", main_author: null, other_authors: [], isbn: null, publisher: null,
  publication_year: null, language: "it", genre: null, notes: null, cover_url: null,
};

export function AddBookPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const toast = useToast();
  const { users } = useData();
  const { conflict, submit, confirmDuplicate, cancelDuplicate } = useAddBookWithDuplicateCheck();

  const [step, setStep] = useState<"lookup" | "form">("lookup");
  const [tab, setTab] = useState<"type" | "scan">("type");
  const [isbnInput, setIsbnInput] = useState("");
  const [notFound, setNotFound] = useState(false);

  const [draft, setDraft] = useState<RecordDraft>(EMPTY_DRAFT);
  const [placement, setPlacement] = useState<LocationValue>({ room_id: null, bookcase_id: null, section_id: null, shelf_id: null });
  const [readingStatus, setReadingStatus] = useState<ReadingStatus>("to_read");
  const [ownerId, setOwnerId] = useState<string>("");
  const [formError, setFormError] = useState<string | null>(null);

  function startManual(prefillIsbn?: string) {
    setDraft({ ...EMPTY_DRAFT, isbn: prefillIsbn ?? null });
    setStep("form");
  }

  function handleLookup(e: FormEvent) {
    e.preventDefault();
    setNotFound(false);
    const result = lookupIsbn(isbnInput);
    if (!result) {
      setNotFound(true);
      return;
    }
    setDraft({ ...result, other_authors: result.other_authors, notes: null });
    setStep("form");
  }

  function handleSimulateScan() {
    const result = randomIsbnFixture();
    setDraft({ ...result, notes: null });
    setStep("form");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!draft.title.trim()) {
      setFormError(t.validation.titleRequired);
      return;
    }
    const bookDraft: BookDraft = {
      ...placement,
      shelf_position: null,
      reading_status: readingStatus,
      owner_id: ownerId || null,
      tags: [],
      notes: null,
      condition: "good",
      source: "purchased",
      purchase_date: new Date().toISOString().slice(0, 10),
      purchase_price: null,
    };
    const created = submit(draft, bookDraft);
    if (created) {
      toast.success(t.books.add.successToast);
      navigate(`/books/${created.id}`);
    }
  }

  function handleConfirmDuplicate() {
    const created = confirmDuplicate();
    if (created) {
      toast.success(t.books.add.successToast);
      navigate(`/books/${created.id}`);
    }
  }

  const genreOptions = (Object.keys(t.enums.genre) as Genre[]).map((g) => ({ value: g, label: t.enums.genre[g] }));

  return (
    <div className="space-y-6">
      <PageHeader title={t.books.add.pageTitle} />

      {step === "lookup" && (
        <Card className="max-w-lg space-y-4 p-5">
          <div className="flex gap-2 border-b border-line">
            <button
              onClick={() => setTab("type")}
              className={`px-3 py-2 text-sm font-medium transition-colors ${tab === "type" ? "border-b-2 border-brand text-brand" : "text-ink-soft hover:text-ink"}`}
            >
              {t.books.add.typeTab}
            </button>
            <button
              onClick={() => setTab("scan")}
              className={`px-3 py-2 text-sm font-medium transition-colors ${tab === "scan" ? "border-b-2 border-brand text-brand" : "text-ink-soft hover:text-ink"}`}
            >
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
                  <Button type="button" variant="secondary" onClick={() => startManual(normalizeIsbn(isbnInput))}>
                    {t.books.add.manualEntryButton}
                  </Button>
                )}
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-ink-soft">{t.books.add.simulateScanButton}</p>
              <Button onClick={handleSimulateScan}>{t.books.add.simulateScanButton}</Button>
            </div>
          )}

          <button onClick={() => startManual()} className="text-xs text-ink-soft hover:text-brand">
            {t.books.add.manualEntryButton}
          </button>
        </Card>
      )}

      {step === "form" && (
        <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
          <Card className="space-y-3 p-5">
            <h2 className="font-display text-base font-semibold text-ink">{t.books.add.formTitle}</h2>
            <Input label={t.books.add.titleLabel} value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} required />
            <Input label={t.books.add.authorLabel} value={draft.main_author ?? ""} onChange={(e) => setDraft({ ...draft, main_author: e.target.value || null })} />
            <div className="grid grid-cols-2 gap-3">
              <Input label={t.books.add.isbnFieldLabel} value={draft.isbn ?? ""} onChange={(e) => setDraft({ ...draft, isbn: e.target.value || null })} />
              <Input
                label={t.books.add.yearLabel}
                type="number"
                value={draft.publication_year ?? ""}
                onChange={(e) => setDraft({ ...draft, publication_year: e.target.value ? Number(e.target.value) : null })}
              />
            </div>
            <Input label={t.books.add.publisherLabel} value={draft.publisher ?? ""} onChange={(e) => setDraft({ ...draft, publisher: e.target.value || null })} />
            <Select
              label={t.books.add.genreLabel}
              placeholder={t.placement.selectPlaceholder}
              value={draft.genre ?? ""}
              onChange={(e) => setDraft({ ...draft, genre: (e.target.value || null) as Genre | null })}
              options={genreOptions}
            />
            {formError && <p className="text-sm text-danger">{formError}</p>}
          </Card>

          <Card className="space-y-3 p-5">
            <h2 className="font-display text-base font-semibold text-ink">{t.books.add.placementTitle}</h2>
            <LocationPicker value={placement} onChange={setPlacement} />
            <div className="grid grid-cols-2 gap-3">
              <Select
                label={t.books.add.readingStatusLabel}
                value={readingStatus}
                onChange={(e) => setReadingStatus(e.target.value as ReadingStatus)}
                options={[
                  { value: "to_read", label: t.enums.readingStatus.to_read },
                  { value: "reading", label: t.enums.readingStatus.reading },
                  { value: "read", label: t.enums.readingStatus.read },
                ]}
              />
              <Select
                label={t.books.add.ownerLabel}
                placeholder={t.books.add.noOwner}
                value={ownerId}
                onChange={(e) => setOwnerId(e.target.value)}
                options={users.map((u) => ({ value: u.id, label: u.name }))}
              />
            </div>
          </Card>

          <div className="flex gap-2">
            <Button type="button" variant="secondary" onClick={() => navigate("/catalog")}>{t.common.back}</Button>
            <Button type="submit">{t.books.add.submitButton}</Button>
          </div>
        </form>
      )}

      {conflict && (
        <DuplicateBookDialog
          open
          reason={conflict.reason}
          record={conflict.record}
          onConfirm={handleConfirmDuplicate}
          onCancel={cancelDuplicate}
        />
      )}
    </div>
  );
}
