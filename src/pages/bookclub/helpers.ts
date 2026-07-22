import type { BookClubCycleStatus, BookRating, OwnedBook } from "../../data/types";

// Badge tone per cycle status — kept local to Book Club rather than extending
// the shared Badge component, which is hardcoded to ReadingStatus elsewhere.
export const STATUS_TONE: Record<BookClubCycleStatus, string> = {
  reading: "bg-brand/10 text-brand border border-brand/20",
  discussing: "bg-sage/20 text-sage border border-sage/30",
  archived: "bg-stone/20 text-stone border border-stone/30",
};

// A cycle only stores a record_id; rating (like the real app) reuses
// BookRating on whichever owned copy of that record exists, resolved here.
export function findOwnedBookForRecord(books: OwnedBook[], recordId: string): OwnedBook | null {
  return books.find((b) => b.record_id === recordId) ?? null;
}

export function ratingSummaryForRecord(
  books: OwnedBook[],
  ratings: BookRating[],
  recordId: string,
): { average: number | null; total: number } {
  const book = findOwnedBookForRecord(books, recordId);
  if (!book) return { average: null, total: 0 };
  const bookRatings = ratings.filter((r) => r.book_id === book.id);
  if (bookRatings.length === 0) return { average: null, total: 0 };
  const average = Math.round((bookRatings.reduce((sum, r) => sum + r.rating, 0) / bookRatings.length) * 100) / 100;
  return { average, total: bookRatings.length };
}
