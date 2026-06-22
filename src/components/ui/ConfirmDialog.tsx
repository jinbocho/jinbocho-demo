import { Modal } from "./Modal";
import { Button } from "./Button";
import { useLanguage } from "../../i18n";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmDialog({ open, title, message, confirmLabel, cancelLabel, destructive, loading, onConfirm, onClose }: ConfirmDialogProps) {
  const { t } = useLanguage();
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>{cancelLabel ?? t.common.cancel}</Button>
          <Button variant={destructive ? "danger" : "primary"} onClick={onConfirm} disabled={loading}>
            {confirmLabel ?? t.common.confirm}
          </Button>
        </>
      }
    >
      <p className="text-sm text-ink-soft">{message}</p>
    </Modal>
  );
}
