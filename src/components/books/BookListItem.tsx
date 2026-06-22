import { useNavigate } from "react-router-dom";
import type { BibliographicRecord, OwnedBook } from "../../data/types";
import { useLanguage } from "../../i18n";
import { BookCover } from "../ui/BookCover";
import { Badge } from "../ui/Badge";
import { ReadingStatusControl } from "./ReadingStatusControl";

interface BookListItemProps {
  book: OwnedBook;
  record: BibliographicRecord | null;
  roomName?: string | null;
  readerNames?: string[];
  onLoanBorrower?: string | null;
  canEdit: boolean;
}

export function BookListItem({ book, record, roomName, readerNames, onLoanBorrower, canEdit }: BookListItemProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => navigate(`/books/${book.id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter") navigate(`/books/${book.id}`);
      }}
      className="flex cursor-pointer items-center gap-3 rounded-md border border-line bg-surface p-3 transition-colors hover:border-brand/40"
    >
      <BookCover url={record?.cover_url} title={record?.title} className="h-16 w-12 shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-ink">{record?.title ?? t.dashboard.untitled}</p>
        {record?.main_author && <p className="truncate text-sm text-ink-soft">{record.main_author}</p>}
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-ink-soft">
          {roomName && <span>{roomName}</span>}
          {readerNames && readerNames.length > 0 && <span>· {t.bookDetail.readBy(readerNames.length)}</span>}
          {onLoanBorrower && <Badge variant="info">{t.loans.statusOnLoan}</Badge>}
        </div>
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <ReadingStatusControl bookId={book.id} status={book.reading_status} readonly={!canEdit} />
      </div>
    </div>
  );
}
