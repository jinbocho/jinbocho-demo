import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { LocationPicker, type LocationValue } from "../../components/locations/LocationPicker";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { PageHeader } from "../../components/ui/PageHeader";
import { Spinner } from "../../components/ui/Spinner";
import { useData } from "../../store/DataContext";
import { useToast } from "../../store/ToastContext";
import { useLanguage } from "../../i18n";
import { ISBN_FIXTURES, type IsbnLookupResult } from "../../store/isbnFixtures";
import { readShelfLocation } from "./shelfDeeplink";
import type { BibliographicRecord, OwnedBook } from "../../data/types";

interface AuditResult {
  present: { book: OwnedBook; record: BibliographicRecord | null }[];
  missing: { book: OwnedBook; record: BibliographicRecord | null }[];
  unexpected: { key: string; title: string; author: string | null; fixture: IsbnLookupResult }[];
}

export function ShelfAuditPage() {
  const { t } = useLanguage();
  const toast = useToast();
  const { books, records, addRecordAndBook } = useData();

  const [searchParams] = useSearchParams();
  const [location, setLocation] = useState<LocationValue>(() => readShelfLocation(searchParams));
  const [auditing, setAuditing] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [addingKey, setAddingKey] = useState<string | null>(null);

  function handleAudit() {
    if (!location.shelf_id) return;
    setAuditing(true);
    setTimeout(() => {
      const onShelf = books
        .filter((b) => b.shelf_id === location.shelf_id)
        .map((b) => ({ book: b, record: records.find((r) => r.id === b.record_id) ?? null }));

      const missing = onShelf.filter(() => Math.random() < 0.2);
      const missingIds = new Set(missing.map((m) => m.book.id));
      const present = onShelf.filter((v) => !missingIds.has(v.book.id));

      const ownedIsbns = new Set(records.map((r) => r.isbn).filter(Boolean));
      const notOwned = ISBN_FIXTURES.filter((f) => !ownedIsbns.has(f.isbn));
      const unexpected =
        notOwned.length > 0 && Math.random() < 0.5
          ? [{ key: `u-${notOwned[0].isbn}`, title: notOwned[0].title, author: notOwned[0].main_author, fixture: notOwned[0] }]
          : [];

      setResult({ present, missing, unexpected });
      setAuditing(false);
    }, 1000);
  }

  function handleAddUnexpected(spine: AuditResult["unexpected"][number]) {
    if (!location.shelf_id) return;
    setAddingKey(spine.key);
    addRecordAndBook(
      {
        title: spine.fixture.title, main_author: spine.fixture.main_author, other_authors: spine.fixture.other_authors,
        isbn: spine.fixture.isbn, publisher: spine.fixture.publisher, publication_year: spine.fixture.publication_year,
        language: spine.fixture.language, genre: spine.fixture.genre, notes: null, cover_url: spine.fixture.cover_url,
      },
      {
        ...location, shelf_position: null, reading_status: "to_read", owner_id: null, tags: [], notes: null,
        condition: null, source: null, purchase_date: new Date().toISOString().slice(0, 10), purchase_price: null,
      },
      false,
    );
    toast.success(t.books.shelfAudit.addedUnexpected(spine.title));
    setResult((prev) => (prev ? { ...prev, unexpected: prev.unexpected.filter((u) => u.key !== spine.key) } : prev));
    setAddingKey(null);
  }

  if (result) {
    const clean = result.missing.length === 0 && result.unexpected.length === 0;
    return (
      <>
        <PageHeader
          title={t.books.shelfAudit.pageTitle}
          actions={
            <button type="button" onClick={() => setResult(null)} className="text-sm text-brand hover:underline">
              {t.books.shelfAudit.retakeLink}
            </button>
          }
        />

        {clean ? (
          <Card className="p-5">
            <p className="text-sm font-medium text-sage">{t.books.shelfAudit.allMatch}</p>
            <p className="mt-1 text-sm text-ink-soft">{t.books.shelfAudit.presentCount(result.present.length)}</p>
          </Card>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-ink-soft">{t.books.shelfAudit.presentCount(result.present.length)}</p>

            {result.missing.length > 0 && (
              <Card className="p-5">
                <h2 className="mb-1 font-display text-base font-semibold text-amber">{t.books.shelfAudit.missingTitle(result.missing.length)}</h2>
                <p className="mb-3 text-xs text-ink-soft">{t.books.shelfAudit.missingHint}</p>
                <ul className="divide-y divide-line">
                  {result.missing.map(({ book, record }) => (
                    <li key={book.id} className="flex items-center justify-between gap-3 py-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{record?.title ?? "—"}</p>
                        {record?.main_author && <p className="truncate text-xs text-ink-soft">{record.main_author}</p>}
                      </div>
                      <Link to={`/books/${book.id}`} className="shrink-0 text-xs text-brand hover:underline">
                        {t.books.shelfAudit.viewBook}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {result.unexpected.length > 0 && (
              <Card className="p-5">
                <h2 className="mb-1 font-display text-base font-semibold text-brand">{t.books.shelfAudit.unexpectedTitle(result.unexpected.length)}</h2>
                <p className="mb-3 text-xs text-ink-soft">{t.books.shelfAudit.unexpectedHint}</p>
                <ul className="divide-y divide-line">
                  {result.unexpected.map((spine) => (
                    <li key={spine.key} className="flex items-center justify-between gap-3 py-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{spine.title}</p>
                        {spine.author && <p className="truncate text-xs text-ink-soft">{spine.author}</p>}
                      </div>
                      <Button type="button" size="sm" variant="secondary" loading={addingKey === spine.key} onClick={() => handleAddUnexpected(spine)}>
                        {t.books.shelfAudit.addHere}
                      </Button>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <PageHeader title={t.books.shelfAudit.pageTitle} description={t.books.shelfAudit.subtitle} />
      <Card className="max-w-lg space-y-5 p-5">
        <div>
          <h2 className="mb-3 font-display text-base font-semibold">{t.books.shelfAudit.selectShelf}</h2>
          <LocationPicker value={location} onChange={setLocation} />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button type="button" disabled={!location.shelf_id} loading={auditing} onClick={handleAudit}>
            {t.books.shelfAudit.simulateCaptureButton}
          </Button>
          <Link to="/books">
            <Button type="button" variant="secondary">{t.common.cancel}</Button>
          </Link>
        </div>

        {auditing && (
          <p className="flex items-center gap-2 text-sm text-ink-soft">
            <Spinner className="h-4 w-4" /> {t.books.shelfAudit.reading}
          </p>
        )}
        {!location.shelf_id && <p className="text-xs text-ink-soft">{t.books.shelfAudit.setupHint}</p>}
      </Card>
    </>
  );
}
