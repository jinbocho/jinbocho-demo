import { useRef, useState } from "react";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { useData } from "../../store/DataContext";
import { useToast } from "../../store/ToastContext";
import { useLanguage } from "../../i18n";
import { ISBN_FIXTURES } from "../../store/isbnFixtures";

interface GoodreadsRow {
  isbn: string;
  title: string;
  main_author: string | null;
  status: "new" | "already_owned";
  selected: boolean;
}

export function GoodreadsImportDialog() {
  const { t } = useLanguage();
  const toast = useToast();
  const { records, addRecordAndBook } = useData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [rows, setRows] = useState<GoodreadsRow[] | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    // Demo simulation: the CSV content itself isn't parsed — we build a
    // realistic-looking preview from the same fixture pool used for ISBN
    // lookups, cross-checked against what's already in the catalog.
    const ownedIsbns = new Set(records.map((r) => r.isbn).filter(Boolean));
    const preview: GoodreadsRow[] = ISBN_FIXTURES.map((fixture) => {
      const alreadyOwned = ownedIsbns.has(fixture.isbn);
      return {
        isbn: fixture.isbn,
        title: fixture.title,
        main_author: fixture.main_author,
        status: alreadyOwned ? "already_owned" : "new",
        selected: !alreadyOwned,
      };
    });
    if (preview.length === 0) {
      toast.error(t.settings.goodreads.emptyFile);
      return;
    }
    setRows(preview);
  }

  function toggleRow(index: number) {
    setRows((prev) => prev!.map((r, i) => (i === index ? { ...r, selected: !r.selected } : r)));
  }

  function handleConfirm() {
    if (!rows) return;
    const selected = rows.filter((r) => r.selected);
    if (selected.length === 0) {
      toast.error(t.settings.goodreads.nothingSelected);
      return;
    }
    for (const row of selected) {
      const fixture = ISBN_FIXTURES.find((f) => f.isbn === row.isbn)!;
      addRecordAndBook(
        {
          title: fixture.title, main_author: fixture.main_author, other_authors: fixture.other_authors,
          isbn: fixture.isbn, publisher: fixture.publisher, publication_year: fixture.publication_year,
          language: fixture.language, genre: fixture.genre, notes: null, cover_url: fixture.cover_url,
        },
        {
          room_id: null, bookcase_id: null, section_id: null, shelf_id: null, shelf_position: null,
          reading_status: "read", owner_id: null, tags: [], notes: null,
          condition: null, source: null, purchase_date: null, purchase_price: null,
        },
        false,
      );
    }
    toast.success(t.settings.goodreads.confirmed(selected.length));
    setRows(null);
  }

  const selectedCount = rows?.filter((r) => r.selected).length ?? 0;

  return (
    <>
      <input ref={fileInputRef} type="file" accept=".csv,text/csv" className="hidden" onChange={handleFileChange} />
      <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()}>
        {t.settings.goodreadsImportButton}
      </Button>

      <Modal
        open={!!rows}
        onClose={() => setRows(null)}
        title={t.settings.goodreads.reviewTitle}
        size="xl"
        footer={
          <>
            <Button variant="secondary" onClick={() => setRows(null)}>{t.common.cancel}</Button>
            <Button disabled={selectedCount === 0} onClick={handleConfirm}>
              {t.settings.goodreads.confirmButton(selectedCount)}
            </Button>
          </>
        }
      >
        {rows && (
          <div className="space-y-3">
            <p className="text-sm text-ink-soft">{t.settings.goodreads.reviewCount(rows.length, selectedCount)}</p>
            <ul className="max-h-[50vh] space-y-2 overflow-y-auto pr-1">
              {rows.map((row, index) => (
                <li
                  key={row.isbn}
                  className={`flex items-start gap-3 rounded-md border p-3 ${
                    row.selected ? "border-brand bg-surface" : "border-line bg-paper"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={row.selected}
                    onChange={() => toggleRow(index)}
                    className="mt-1 h-4 w-4 shrink-0 accent-brand"
                  />
                  <div className="min-w-0 flex-1 space-y-1">
                    <span
                      className={`inline-block rounded px-1.5 py-0.5 text-xs font-medium ${
                        row.status === "new" ? "bg-sage/15 text-sage" : "bg-stone/15 text-ink-soft"
                      }`}
                    >
                      {row.status === "new" ? t.settings.goodreads.statusNew : t.settings.goodreads.statusAlreadyOwned}
                    </span>
                    <p className="truncate text-sm font-medium text-ink">{row.title}</p>
                    {row.main_author && <p className="truncate text-xs text-ink-soft">{row.main_author}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </>
  );
}
