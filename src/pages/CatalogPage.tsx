import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/Input";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { BookCover } from "../components/ui/BookCover";
import { PageHeader } from "../components/ui/PageHeader";
import { OWNED_BOOKS, RECORDS } from "../data/books";
import { ROOMS } from "../data/locations";
import type { ReadingStatus } from "../data/types";
import { useLanguage } from "../i18n";

type StatusFilter = "all" | ReadingStatus;

export function CatalogPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [roomFilter, setRoomFilter] = useState<string>("all");

  const STATUS_FILTERS: { value: StatusFilter; label: string }[] = [
    { value: "all", label: t.catalog.statusAll },
    { value: "to_read", label: t.catalog.statusToRead },
    { value: "reading", label: t.catalog.statusReading },
    { value: "read", label: t.catalog.statusRead },
  ];

  const joinedBooks = useMemo(() => {
    return OWNED_BOOKS.map((ob) => {
      const record = RECORDS.find((r) => r.id === ob.record_id);
      return { ...ob, record };
    }).filter((b) => b.record != null);
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return joinedBooks.filter((b) => {
      if (q && !b.record!.title.toLowerCase().includes(q) && !b.record!.main_author?.toLowerCase().includes(q)) {
        return false;
      }
      if (statusFilter !== "all" && b.reading_status !== statusFilter) return false;
      if (roomFilter !== "all" && b.room_id !== roomFilter) return false;
      return true;
    });
  }, [joinedBooks, search, statusFilter, roomFilter]);

  return (
    <div className="space-y-6">
      <PageHeader title={t.nav.books} description={t.catalog.booksInLibrary(OWNED_BOOKS.length)} />

      {/* Filters */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <div className="flex-1">
          <Input
            label={t.catalog.searchLabel}
            placeholder={t.catalog.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {STATUS_FILTERS.map((f) => (
            <Button
              key={f.value}
              variant={statusFilter === f.value ? "primary" : "secondary"}
              size="sm"
              onClick={() => setStatusFilter(f.value)}
            >
              {f.label}
            </Button>
          ))}
        </div>
        <div>
          <label htmlFor="room-filter" className="text-sm font-medium text-ink-soft block mb-1">
            {t.catalog.roomLabel}
          </label>
          <select
            id="room-filter"
            value={roomFilter}
            onChange={(e) => setRoomFilter(e.target.value)}
            className="rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40"
          >
            <option value="all">{t.catalog.allRooms}</option>
            {ROOMS.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      {search || statusFilter !== "all" || roomFilter !== "all" ? (
        <p className="text-sm text-ink-soft">
          {t.catalog.results(filtered.length)}
          {search && <> {t.catalog.resultsFor} "<span className="text-ink font-medium">{search}</span>"</>}
        </p>
      ) : null}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-5xl mb-4">📭</span>
          <p className="text-ink font-medium text-lg">{t.catalog.noResults}</p>
          <p className="text-ink-soft text-sm mt-1">{t.catalog.noResultsHint}</p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-4"
            onClick={() => {
              setSearch("");
              setStatusFilter("all");
              setRoomFilter("all");
            }}
          >
            {t.catalog.removeFilters}
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((book) => (
            <div
              key={book.id}
              className="group cursor-pointer"
              onClick={() => navigate(`/books/${book.id}`)}
            >
              <div className="aspect-[2/3] mb-2">
                <BookCover url={book.record!.cover_url} title={book.record!.title} className="h-full w-full rounded-lg" />
              </div>
              <div>
                <p className="text-sm font-medium text-ink leading-snug line-clamp-2 group-hover:text-brand transition-colors">
                  {book.record!.title}
                </p>
                <p className="text-xs text-ink-soft mt-0.5 truncate">{book.record!.main_author}</p>
                <div className="mt-1.5">
                  <Badge variant={book.reading_status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
