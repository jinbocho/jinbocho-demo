import { useState } from "react";
import { Modal } from "../ui/Modal";
import { StarRating } from "../ui/StarRating";
import { BookRatingForm } from "./BookRatingForm";
import { useData } from "../../store/DataContext";
import { useToast } from "../../store/ToastContext";
import { useLanguage } from "../../i18n";
import type { BookRating, User } from "../../data/types";

interface BookRatingsListProps {
  bookId: string;
  ratings: BookRating[];
  currentUserId: string | undefined;
  users: User[];
  canRate: boolean;
}

export function BookRatingsList({ bookId, ratings, currentUserId, users, canRate }: BookRatingsListProps) {
  const { t } = useLanguage();
  const toast = useToast();
  const { deleteRating } = useData();
  const [editing, setEditing] = useState<BookRating | null>(null);

  const nameOf = (userId: string) => users.find((u) => u.id === userId)?.name ?? t.bookDetail.ratings.familyMemberFallback;

  if (ratings.length === 0) {
    return <p className="text-sm text-ink-soft">{t.bookDetail.ratings.noReviews}</p>;
  }

  return (
    <>
      <ul className="space-y-4">
        {ratings.map((r) => {
          const isOwn = r.user_id === currentUserId;
          return (
            <li key={r.id} className="border-b border-line pb-4 last:border-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-ink">{nameOf(r.user_id)}</span>
                  <StarRating value={r.rating} readOnly size="sm" />
                </div>
                <span className="shrink-0 text-xs text-ink-soft">
                  {new Date(r.created_at).toLocaleDateString(t.locale, { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </div>
              {r.review && <p className="mt-2 text-sm text-ink">{r.review}</p>}
              {isOwn && canRate && (
                <div className="mt-2 flex gap-2">
                  <button type="button" className="text-xs text-brand hover:underline" onClick={() => setEditing(r)}>
                    {t.bookDetail.ratings.edit}
                  </button>
                  <button
                    type="button"
                    className="text-xs text-danger hover:underline"
                    onClick={() => {
                      deleteRating(r.id);
                      toast.success(t.bookDetail.ratings.deleteSuccess);
                    }}
                  >
                    {t.bookDetail.ratings.delete}
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <Modal open={editing !== null} title={t.bookDetail.ratings.editModalTitle} onClose={() => setEditing(null)}>
        {editing && <BookRatingForm bookId={bookId} existing={editing} onDone={() => setEditing(null)} />}
      </Modal>
    </>
  );
}
