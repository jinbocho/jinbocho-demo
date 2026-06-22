import type { BibliographicRecord } from "../../data/types";
import type { DuplicateReason } from "../../store/DataContext";
import { useLanguage } from "../../i18n";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";

interface DuplicateBookDialogProps {
  open: boolean;
  reason: DuplicateReason;
  record: BibliographicRecord;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DuplicateBookDialog({ open, reason, record, loading, onConfirm, onCancel }: DuplicateBookDialogProps) {
  const { t } = useLanguage();
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={t.books.duplicateTitle}
      footer={
        <>
          <Button variant="secondary" onClick={onCancel} disabled={loading}>{t.common.cancel}</Button>
          <Button onClick={onConfirm} disabled={loading}>{t.books.duplicateConfirm}</Button>
        </>
      }
    >
      <p className="mb-3 text-sm text-ink-soft">
        {reason === "isbn_match" ? t.books.duplicateIsbnReason : t.books.duplicateTitleReason}
      </p>
      <div className="rounded-md bg-paper p-3">
        <p className="font-medium text-ink">{record.title}</p>
        {record.main_author && <p className="text-sm text-ink-soft">{record.main_author}</p>}
      </div>
    </Modal>
  );
}
