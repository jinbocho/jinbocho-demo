import { useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { BookListItem } from "../../components/books/BookListItem";
import { useData } from "../../store/DataContext";
import { useAuth } from "../../store/AuthContext";
import { useLanguage } from "../../i18n";

type Filter = "unread" | "read" | "owned";

export function StatsBookListPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { hasRole } = useAuth();
  const { books, records, rooms, reads, users } = useData();
  const [params] = useSearchParams();

  const filter = (params.get("filter") as Filter) ?? "unread";
  const userId = params.get("user");
  const canEdit = hasRole("admin", "editor");
  const user = users.find((u) => u.id === userId);

  const joined = useMemo(() => books.map((b) => ({ book: b, record: records.find((r) => r.id === b.record_id) ?? null })), [books, records]);

  const filteredBooks = useMemo(() => {
    if (filter === "unread") {
      const readBookIds = new Set(reads.map((r) => r.book_id));
      return joined.filter((b) => !readBookIds.has(b.book.id));
    }
    if (filter === "read" && userId) {
      const readBookIds = new Set(reads.filter((r) => r.user_id === userId).map((r) => r.book_id));
      return joined.filter((b) => readBookIds.has(b.book.id));
    }
    if (filter === "owned" && userId) {
      return joined.filter((b) => b.book.owner_id === userId);
    }
    return [];
  }, [filter, userId, joined, reads]);

  const title =
    filter === "unread" ? t.stats.bookListTitleUnread
    : filter === "read" ? t.stats.bookListTitleRead(user?.name ?? "")
    : t.stats.bookListTitleOwned(user?.name ?? "");

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" size="sm" onClick={() => navigate("/stats")} className="mb-2">{t.stats.backToStats}</Button>
        <h1 className="font-display text-2xl font-semibold text-ink">{title}</h1>
        <p className="mt-1 text-sm text-ink-soft">{t.catalog.results(filteredBooks.length)}</p>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-5xl mb-4">📭</span>
          <p className="text-ink font-medium text-lg">{t.stats.noMatches}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredBooks.map(({ book, record }) => (
            <BookListItem
              key={book.id}
              book={book}
              record={record}
              roomName={rooms.find((r) => r.id === book.room_id)?.name ?? null}
              canEdit={canEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
