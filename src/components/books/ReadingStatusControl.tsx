import type { ReadingStatus } from "../../data/types";
import { useData } from "../../store/DataContext";
import { useAuth } from "../../store/AuthContext";
import { useLanguage } from "../../i18n";
import { Badge } from "../ui/Badge";

interface ReadingStatusControlProps {
  bookId: string;
  status: ReadingStatus;
  readonly?: boolean;
}

export function ReadingStatusControl({ bookId, status, readonly }: ReadingStatusControlProps) {
  const { t } = useLanguage();
  const { books, updateReadingStatus } = useData();
  const { currentUser } = useAuth();

  if (readonly) return <Badge variant={status} />;

  const book = books.find((b) => b.id === bookId);

  function handleChange(next: ReadingStatus) {
    const readerId = next === "reading" ? (book?.current_reader_id ?? currentUser?.id ?? null) : null;
    updateReadingStatus(bookId, next, readerId);
  }

  return (
    <select
      value={status}
      onChange={(e) => handleChange(e.target.value as ReadingStatus)}
      className="rounded-md border border-line bg-surface px-2 py-1 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-brand/40"
    >
      <option value="to_read">{t.enums.readingStatus.to_read}</option>
      <option value="reading">{t.enums.readingStatus.reading}</option>
      <option value="read">{t.enums.readingStatus.read}</option>
    </select>
  );
}
