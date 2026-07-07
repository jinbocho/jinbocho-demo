import { useState } from "react";
import { Button } from "../ui/Button";
import { StarRating } from "../ui/StarRating";
import { Textarea } from "../ui/Textarea";
import { useData } from "../../store/DataContext";
import { useAuth } from "../../store/AuthContext";
import { useToast } from "../../store/ToastContext";
import { useLanguage } from "../../i18n";
import type { BookRating } from "../../data/types";

interface BookRatingFormProps {
  bookId: string;
  existing?: BookRating;
  onDone: () => void;
}

export function BookRatingForm({ bookId, existing, onDone }: BookRatingFormProps) {
  const { t } = useLanguage();
  const toast = useToast();
  const { currentUser } = useAuth();
  const { addRating, updateRating } = useData();
  const [stars, setStars] = useState(existing?.rating ?? 0);
  const [review, setReview] = useState(existing?.review ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (stars < 1) {
      toast.error(t.bookDetail.ratings.selectStarError);
      return;
    }
    if (existing) {
      updateRating(existing.id, { rating: stars, review: review.trim() || null });
      toast.success(t.bookDetail.ratings.updateSuccess);
    } else if (currentUser) {
      addRating(bookId, currentUser.id, stars, review.trim() || null);
      toast.success(t.bookDetail.ratings.addSuccess);
    }
    onDone();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-xs font-medium uppercase text-ink-soft">
          {t.bookDetail.ratings.ratingLabel}
        </label>
        <StarRating value={stars} onChange={setStars} size="lg" />
      </div>

      <Textarea
        label={t.bookDetail.ratings.reviewLabel}
        rows={4}
        maxLength={4000}
        placeholder={t.bookDetail.ratings.reviewPlaceholder}
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onDone}>
          {t.bookDetail.ratings.cancel}
        </Button>
        <Button type="submit">
          {existing ? t.bookDetail.ratings.update : t.bookDetail.ratings.save}
        </Button>
      </div>
    </form>
  );
}
