import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { BookCover } from "../../components/ui/BookCover";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { EmptyState } from "../../components/feedback/EmptyState";
import { PageHeader } from "../../components/ui/PageHeader";
import { SearchInput } from "../../components/ui/SearchInput";
import { Select } from "../../components/ui/Select";
import { useData } from "../../store/DataContext";
import { useAuth } from "../../store/AuthContext";
import { useToast } from "../../store/ToastContext";
import { useLanguage } from "../../i18n";
import type { WishlistItem } from "../../data/types";

const PRIORITY_STRIPE: Record<number, string> = {
  1: "bg-danger/35",
  2: "bg-amber/35",
  3: "bg-sage/35",
};

const PRIORITY_LABEL_CLASS: Record<number, string> = {
  1: "text-danger/70",
  2: "text-amber/80",
  3: "text-sage/80",
};

export function WishlistPage() {
  const { t } = useLanguage();
  const toast = useToast();
  const navigate = useNavigate();
  const { currentUser, hasRole } = useAuth();
  const { users, wishlist, removeWishlistItem } = useData();

  const [pendingRemove, setPendingRemove] = useState<WishlistItem | null>(null);
  const [query, setQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [memberFilter, setMemberFilter] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const activeFilterCount = [priorityFilter, memberFilter].filter(Boolean).length;

  const priorityLabel: Record<number, string> = {
    1: t.wishlist.priorityHigh,
    2: t.wishlist.priorityMedium,
    3: t.wishlist.priorityLow,
  };

  function memberName(userId: string) {
    if (userId === currentUser?.id) return t.common.you;
    return users.find((u) => u.id === userId)?.name ?? "…";
  }

  function canRemove(item: WishlistItem) {
    return item.user_id === currentUser?.id || hasRole("admin");
  }

  const memberOptions = useMemo(() => {
    const seen = new Set<string>();
    const opts: { value: string; label: string }[] = [];
    for (const item of wishlist) {
      if (!seen.has(item.user_id)) {
        seen.add(item.user_id);
        opts.push({ value: item.user_id, label: memberName(item.user_id) });
      }
    }
    return opts;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishlist, users, currentUser?.id]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return wishlist.filter((item) => {
      if (priorityFilter) {
        const p = Number(priorityFilter);
        if (p === 0 ? item.priority !== null : item.priority !== p) return false;
      }
      if (memberFilter && item.user_id !== memberFilter) return false;
      if (q) {
        const hay = `${item.record.title} ${item.record.main_author ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [wishlist, query, priorityFilter, memberFilter]);

  function clearFilters() {
    setPriorityFilter("");
    setMemberFilter("");
  }

  function onConfirmRemove() {
    if (!pendingRemove) return;
    removeWishlistItem(pendingRemove.id);
    toast.success(t.wishlist.removeSuccess);
    setPendingRemove(null);
  }

  return (
    <>
      <PageHeader
        title={t.wishlist.title}
        description={t.wishlist.booksCount(wishlist.length)}
        actions={
          <Button size="sm" onClick={() => navigate("/wishlist/add")}>
            {t.wishlist.addButton}
          </Button>
        }
      />

      {wishlist.length === 0 ? (
        <EmptyState
          icon={<Bookmark size={44} strokeWidth={1.5} />}
          title={t.wishlist.emptyTitle}
          description={t.wishlist.emptyDescription}
          action={<Button onClick={() => navigate("/wishlist/add")}>{t.wishlist.addButton}</Button>}
        />
      ) : (
        <div className="space-y-3">
          <div className="flex gap-3">
            <SearchInput
              label={t.wishlist.searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <Button
              type="button"
              variant="secondary"
              aria-expanded={filtersOpen}
              onClick={() => setFiltersOpen((v) => !v)}
              className="shrink-0"
            >
              {t.wishlist.filtersToggle} {filtersOpen ? "▴" : "▾"}
              {activeFilterCount > 0 && (
                <span className="ml-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-brand/10 px-1 text-[10px] font-bold text-brand">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>

          {filtersOpen && (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Select
                aria-label={t.wishlist.filterPriority}
                placeholder={t.wishlist.filterPriority}
                value={priorityFilter}
                options={[
                  { value: "1", label: t.wishlist.priorityHigh },
                  { value: "2", label: t.wishlist.priorityMedium },
                  { value: "3", label: t.wishlist.priorityLow },
                  { value: "0", label: t.wishlist.priorityNone },
                ]}
                onChange={(e) => setPriorityFilter(e.target.value)}
              />
              {memberOptions.length > 1 && (
                <Select
                  aria-label={t.wishlist.filterMember}
                  placeholder={t.wishlist.filterMember}
                  value={memberFilter}
                  options={memberOptions}
                  onChange={(e) => setMemberFilter(e.target.value)}
                />
              )}
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm text-brand hover:underline sm:col-span-2 lg:col-span-4"
                >
                  {t.wishlist.clearFilters}
                </button>
              )}
            </div>
          )}

          {filtered.length === 0 ? (
            <p className="py-6 text-center text-sm text-ink-soft">{t.wishlist.noSearchResults}</p>
          ) : (
            <ul className="space-y-3">
              {filtered.map((item) => (
                <li key={item.id}>
                  <Card className="flex overflow-hidden p-0">
                    {item.priority && (
                      <div aria-hidden="true" className={`w-1 shrink-0 ${PRIORITY_STRIPE[item.priority]}`} />
                    )}
                    <div className="min-w-0 flex-1 p-3">
                      <div className="flex items-start gap-3">
                        <BookCover url={item.record.cover_url} title={item.record.title} className="h-16 w-12 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 font-medium leading-snug text-ink">{item.record.title}</p>
                          {item.record.main_author && (
                            <p className="mt-0.5 truncate text-sm text-ink-soft">{item.record.main_author}</p>
                          )}
                          <p className="mt-1 text-xs text-stone">{t.wishlist.wantedBy} {memberName(item.user_id)}</p>
                          {item.notes && <p className="mt-0.5 line-clamp-1 text-xs italic text-ink-soft">{item.notes}</p>}
                        </div>
                        {item.priority && (
                          <span className={`shrink-0 text-xs font-medium ${PRIORITY_LABEL_CLASS[item.priority]}`}>
                            {priorityLabel[item.priority]}
                          </span>
                        )}
                      </div>

                      <div className="mt-3 flex items-center justify-end gap-5 border-t border-line/50 pt-2">
                        {canRemove(item) && (
                          <button
                            type="button"
                            className="text-xs text-stone transition-colors hover:text-danger"
                            onClick={() => setPendingRemove(item)}
                          >
                            {t.wishlist.remove}
                          </button>
                        )}
                        <button
                          type="button"
                          className="text-sm font-medium text-brand transition-colors hover:text-brand-soft"
                          onClick={() => navigate("/books/add", { state: { wishlistPrefill: item.record, fromWishlistId: item.id } })}
                        >
                          {t.wishlist.acquire} →
                        </button>
                      </div>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <ConfirmDialog
        open={pendingRemove !== null}
        title={t.wishlist.confirmRemoveTitle}
        message={t.wishlist.confirmRemoveDescription(pendingRemove?.record.title ?? "")}
        confirmLabel={t.wishlist.remove}
        onConfirm={onConfirmRemove}
        onClose={() => setPendingRemove(null)}
      />
    </>
  );
}
