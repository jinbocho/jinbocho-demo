import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { LocationPicker, type LocationValue } from "../../components/locations/LocationPicker";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { PageHeader } from "../../components/ui/PageHeader";
import { Spinner } from "../../components/ui/Spinner";
import { useData } from "../../store/DataContext";
import { useToast } from "../../store/ToastContext";
import { useLanguage } from "../../i18n";
import { ISBN_FIXTURES, type IsbnLookupResult } from "../../store/isbnFixtures";
import { readShelfLocation } from "./shelfDeeplink";

interface ScanCandidate {
  key: string;
  title: string;
  author: string;
  fixture: IsbnLookupResult;
  status: "matched" | "uncertain";
  selected: boolean;
}

function simulateScan(): ScanCandidate[] {
  const shuffled = [...ISBN_FIXTURES].sort(() => Math.random() - 0.5);
  const count = 3 + Math.floor(Math.random() * 2);
  return shuffled.slice(0, count).map((fixture, i) => ({
    key: `${fixture.isbn}-${i}`,
    title: fixture.title,
    author: fixture.main_author ?? "",
    fixture,
    status: Math.random() < 0.75 ? "matched" : "uncertain",
    selected: true,
  }));
}

export function ShelfScanPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const toast = useToast();
  const { addRecordAndBook } = useData();

  const [searchParams] = useSearchParams();
  const [location, setLocation] = useState<LocationValue>(() => readShelfLocation(searchParams));
  const [scanning, setScanning] = useState(false);
  const [items, setItems] = useState<ScanCandidate[] | null>(null);
  const [confirming, setConfirming] = useState(false);

  function handleScan() {
    if (!location.shelf_id) return;
    setScanning(true);
    setTimeout(() => {
      setItems(simulateScan());
      setScanning(false);
    }, 1000);
  }

  function handleConfirm() {
    if (!items || !location.shelf_id) return;
    const selected = items.filter((it) => it.selected && it.title.trim());
    if (selected.length === 0) {
      toast.error(t.books.shelfScan.nothingSelected);
      return;
    }
    setConfirming(true);
    for (const item of selected) {
      addRecordAndBook(
        {
          title: item.title.trim(), main_author: item.author.trim() || null, other_authors: item.fixture.other_authors,
          isbn: item.fixture.isbn, publisher: item.fixture.publisher, publication_year: item.fixture.publication_year,
          language: item.fixture.language, genre: item.fixture.genre, notes: null, cover_url: item.fixture.cover_url,
        },
        {
          ...location, shelf_position: null, reading_status: "to_read", owner_id: null, tags: [], notes: null,
          condition: null, source: null, purchase_date: new Date().toISOString().slice(0, 10), purchase_price: null,
        },
        false,
      );
    }
    setConfirming(false);
    toast.success(t.books.shelfScan.confirmed(selected.length));
    if (location.bookcase_id) navigate(`/map/${location.bookcase_id}`);
    else navigate("/books");
  }

  if (items) {
    const selectedCount = items.filter((it) => it.selected && it.title.trim()).length;
    return (
      <>
        <PageHeader
          title={t.books.shelfScan.pageTitle}
          description={t.books.shelfScan.reviewSubtitle}
          actions={
            <button type="button" onClick={() => setItems(null)} className="text-sm text-brand hover:underline">
              {t.books.shelfScan.retakeLink}
            </button>
          }
        />
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-md bg-surface px-4 py-2 shadow-card">
          <p className="text-sm text-ink-soft">{t.books.shelfScan.reviewCount(items.length, selectedCount)}</p>
          <Button type="button" loading={confirming} disabled={selectedCount === 0} onClick={handleConfirm}>
            {t.books.shelfScan.confirmButton(selectedCount)}
          </Button>
        </div>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={item.key}
              className={`rounded-md border p-3 shadow-card transition-colors ${
                item.selected ? "border-brand bg-surface" : "border-line bg-paper"
              }`}
            >
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => setItems((prev) => prev!.map((it, i) => (i === index ? { ...it, selected: !it.selected } : it)))}
                  className="mt-1 h-4 w-4 shrink-0 accent-brand"
                />
                <div className="min-w-0 flex-1 space-y-2">
                  <span
                    className={`inline-block rounded px-1.5 py-0.5 text-xs font-medium ${
                      item.status === "matched" ? "bg-sage/15 text-sage" : "bg-amber/15 text-amber"
                    }`}
                  >
                    {item.status === "matched" ? t.books.shelfScan.statusMatched : t.books.shelfScan.statusUncertain}
                  </span>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <Input
                      value={item.title}
                      onChange={(e) => setItems((prev) => prev!.map((it, i) => (i === index ? { ...it, title: e.target.value } : it)))}
                    />
                    <Input
                      value={item.author}
                      onChange={(e) => setItems((prev) => prev!.map((it, i) => (i === index ? { ...it, author: e.target.value } : it)))}
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      <PageHeader title={t.books.shelfScan.pageTitle} description={t.books.shelfScan.subtitle} />
      <Card className="max-w-lg space-y-5 p-5">
        <div>
          <h2 className="mb-3 font-display text-base font-semibold">{t.books.shelfScan.selectShelf}</h2>
          <LocationPicker value={location} onChange={setLocation} />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button type="button" disabled={!location.shelf_id} loading={scanning} onClick={handleScan}>
            {t.books.shelfScan.simulateCaptureButton}
          </Button>
          <Link to="/books/add">
            <Button type="button" variant="secondary">{t.common.cancel}</Button>
          </Link>
        </div>

        {scanning && (
          <p className="flex items-center gap-2 text-sm text-ink-soft">
            <Spinner className="h-4 w-4" /> {t.books.shelfScan.reading}
          </p>
        )}
        {!location.shelf_id && <p className="text-xs text-ink-soft">{t.books.shelfScan.setupHint}</p>}
      </Card>
    </>
  );
}
