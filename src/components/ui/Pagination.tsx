import { Button } from "./Button";
import { useLanguage } from "../../i18n";

interface PaginationProps {
  offset: number;
  limit: number;
  count: number;
  onChange: (offset: number) => void;
}

export function Pagination({ offset, limit, count, onChange }: PaginationProps) {
  const { t } = useLanguage();
  const page = Math.floor(offset / limit) + 1;
  return (
    <div className="flex items-center justify-between gap-3">
      <Button variant="secondary" size="sm" disabled={offset === 0} onClick={() => onChange(Math.max(0, offset - limit))}>
        {t.pagination.prev}
      </Button>
      <span className="text-xs text-ink-soft">{t.pagination.page(page)}</span>
      <Button variant="secondary" size="sm" disabled={count < limit} onClick={() => onChange(offset + limit)}>
        {t.pagination.next}
      </Button>
    </div>
  );
}
