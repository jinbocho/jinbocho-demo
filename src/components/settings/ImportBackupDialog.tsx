import { useRef, useState } from "react";
import { useData, type DataSnapshot } from "../../store/DataContext";
import { useToast } from "../../store/ToastContext";
import { useLanguage } from "../../i18n";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";

function isValidBackup(data: unknown): data is DataSnapshot {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return Array.isArray(d.users) && Array.isArray(d.rooms) && Array.isArray(d.books) && Array.isArray(d.records);
}

export function ImportBackupDialog() {
  const { t } = useLanguage();
  const toast = useToast();
  const { replaceSnapshot } = useData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<DataSnapshot | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (!isValidBackup(parsed)) {
          setError(t.settings.importError);
          return;
        }
        setPending(parsed);
      } catch {
        setError(t.settings.importError);
      }
    };
    reader.readAsText(file);
  }

  function handleConfirm() {
    if (!pending) return;
    replaceSnapshot(pending);
    toast.success(t.settings.importSuccess);
    setPending(null);
  }

  const counts = pending
    ? `${pending.rooms.length} stanze, ${pending.bookcases.length} librerie, ${pending.books.length} libri, ${pending.users.length} utenti`
    : "";

  return (
    <>
      <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={handleFileChange} />
      <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()}>{t.settings.importBackupButton}</Button>
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}

      <Modal open={!!pending} onClose={() => setPending(null)} title={t.settings.importConfirmTitle} footer={
        <>
          <Button variant="secondary" onClick={() => setPending(null)}>{t.common.cancel}</Button>
          <Button onClick={handleConfirm}>{t.settings.importBackupButton}</Button>
        </>
      }>
        <p className="mb-2 text-sm text-ink-soft">{t.settings.importConfirmMessage(counts)}</p>
        <p className="text-sm text-danger">{t.settings.importWarning}</p>
      </Modal>
    </>
  );
}
