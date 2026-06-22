import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Button } from "../components/ui/Button";
import { BookCover } from "../components/ui/BookCover";
import { PageHeader } from "../components/ui/PageHeader";
import { ExportMenu } from "../components/books/ExportMenu";
import { ReadingStatusControl } from "../components/books/ReadingStatusControl";
import { useData } from "../store/DataContext";
import { useAuth } from "../store/AuthContext";
import type { Genre, ReadingStatus } from "../data/types";
import { useLanguage } from "../i18n";

type StatusFilter = "all" | ReadingStatus;

export function CatalogPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { hasRole } = useAuth();
  const { books, records, rooms, users } = useData();
  const [params, setParams] = useSearchParams();

  const [search, setSearch] = useState(params.get("q") ?? "");
  const statusFilter = (params.get("status") as StatusFilter) ?? "all";
  const roomFilter = params.get("room") ?? "all";
  const ownerFilter = params.get("owner") ?? "all";
  const genreFilter = params.get("genre") ?? "all";

  useEffect(() => {
    const handle = setTimeout(() => {
      setParams((prev) => {
        const next = new URLSearchParams(prev);
        if (search) next.set("q", search);
        else next.delete("q");
        return next;
      }, { replace: true });
    }, 250);
    return () => clearTimeout(handle);
  }, [search, setParams]);

  function setFilter(key: string, value: string) {
    setParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value === "all") next.delete(key);
      else next.set(key, value);
      return next;
    });
  }

  const canEdit = hasRole("admin", "editor");

  const STATUS_FILTERS: { value: StatusFilter; label: string }[] = [
    { value: "all", label: t.catalog.statusAll },
    { value: "to_read", label: t.catalog.statusToRead },
    { value: "reading", label: t.catalog.statusReading },
    { value: "read", label: t.catalog.statusRead },
  ];

  const joinedBooks = useMemo(() => {
    return books.map((ob) => {
      const record = records.find((r) => r.id === ob.record_id);
      return { ...ob, record };
    }).filter((b) => b.record != null);
  }, [books, records]);

  const genresInLibrary = useMemo(() => {
    const set = new Set<Genre>();
    records.forEach((r) => r.genre && set.add(r.genre));
    return Array.from(set);
  }, [records]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return joinedBooks.filter((b) => {
      if (q && !b.record!.title.toLowerCase().includes(q) && !b.record!.main_author?.toLowerCase().includes(q)) {
        return false;
      }
      if (statusFilter !== "all" && b.reading_status !== statusFilter) return false;
      if (roomFilter !== "all" && b.room_id !== roomFilter) return false;
      if (ownerFilter !== "all" && b.owner_id !== ownerFilter) return false;
      if (genreFilter !== "all" && b.record!.genre !== genreFilter) return false;
      return true;
    });
  }, [joinedBooks, search, statusFilter, roomFilter, ownerFilter, genreFilter]);

  function clearFilters() {
    setSearch("");
    setParams({});
  }

  const hasActiveFilters = !!(search || statusFilter !== "all" || roomFilter !== "all" || ownerFilter !== "all" || genreFilter !== "all");

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.nav.books}
        description={t.catalog.booksInLibrary(books.length)}
        actions={
          <>
            <ExportMenu disabled={books.length === 0} />
            {canEdit && (
              <>
                <Button variant="secondary" size="sm" onClick={() => navigate("/catalog/add/shelf")}>{t.books.shelfAdd.pageTitle}</Button>
                <Button size="sm" onClick={() => navigate("/catalog/add")}>{t.books.add.pageTitle}</Button>
              </>
            )}
          </>
        }
      />

      {/* Filters */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <Input label={t.catalog.searchLabel} placeholder={t.catalog.searchPlaceholder} value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {STATUS_FILTERS.map((f) => (
            <Button
              key={f.value}
              variant={statusFilter === f.value ? "primary" : "secondary"}
              size="sm"
              onClick={() => setFilter("status", f.value)}
            >
              {f.label}
            </Button>
          ))}
        </div>
        <Select
          label={t.catalog.roomLabel}
          value={roomFilter}
          onChange={(e) => setFilter("room", e.target.value)}
          options={[{ value: "all", label: t.catalog.allRooms }, ...rooms.map((r) => ({ value: r.id, label: r.name }))]}
        />
        <Select
          label={t.filters.ownerLabel}
          value={ownerFilter}
          onChange={(e) => setFilter("owner", e.target.value)}
          options={[{ value: "all", label: t.filters.allOwners }, ...users.map((u) => ({ value: u.id, label: u.name }))]}
        />
        <Select
          label={t.filters.genreLabel}
          value={genreFilter}
          onChange={(e) => setFilter("genre", e.target.value)}
          options={[{ value: "all", label: t.filters.allGenres }, ...genresInLibrary.map((g) => ({ value: g, label: t.enums.genre[g] }))]}
        />
      </div>

      {hasActiveFilters && (
        <p className="text-sm text-ink-soft">
          {t.catalog.results(filtered.length)}
          {search && <> {t.catalog.resultsFor} "<span className="text-ink font-medium">{search}</span>"</>}
        </p>
      )}

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-5xl mb-4">📭</span>
          <p className="text-ink font-medium text-lg">{t.catalog.noResults}</p>
          <p className="text-ink-soft text-sm mt-1">{t.catalog.noResultsHint}</p>
          <Button variant="secondary" size="sm" className="mt-4" onClick={clearFilters}>{t.catalog.removeFilters}</Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((book) => (
            <div key={book.id} className="group cursor-pointer" onClick={() => navigate(`/books/${book.id}`)}>
              <div className="aspect-[2/3] mb-2">
                <BookCover url={book.record!.cover_url} title={book.record!.title} className="h-full w-full rounded-lg" />
              </div>
              <div>
                <p className="text-sm font-medium text-ink leading-snug line-clamp-2 group-hover:text-brand transition-colors">
                  {book.record!.title}
                </p>
                <p className="text-xs text-ink-soft mt-0.5 truncate">{book.record!.main_author}</p>
                <div className="mt-1.5" onClick={(e) => e.stopPropagation()}>
                  <ReadingStatusControl bookId={book.id} status={book.reading_status} readonly={!canEdit} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
