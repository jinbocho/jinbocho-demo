import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../../store/DataContext";
import { useAuth } from "../../store/AuthContext";
import { useLanguage } from "../../i18n";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";

export function DeleteAccountDialog({ familyName }: { familyName: string }) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { wipeFamily } = useData();
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [confirmName, setConfirmName] = useState("");
  const [password, setPassword] = useState("");

  const canDelete = confirmName.trim() === familyName.trim() && password.length > 0;

  function handleDelete() {
    wipeFamily("", { name: "", email: "deleted@local" });
    logout();
    setOpen(false);
    navigate("/login", { replace: true });
  }

  return (
    <>
      <Button variant="danger" size="sm" onClick={() => setOpen(true)}>{t.settings.deleteAccountButton}</Button>

      <Modal open={open} onClose={() => setOpen(false)} title={t.settings.deleteAccountButton} footer={
        <>
          <Button variant="secondary" onClick={() => setOpen(false)}>{t.common.cancel}</Button>
          <Button variant="danger" disabled={!canDelete} onClick={handleDelete}>{t.settings.deleteAccountConfirmButton}</Button>
        </>
      }>
        <div className="space-y-3">
          <p className="text-sm text-danger">{t.settings.deleteAccountWarning}</p>
          <Input label={`${t.settings.deleteAccountConfirmFamilyName} ("${familyName}")`} value={confirmName} onChange={(e) => setConfirmName(e.target.value)} />
          <Input label={t.settings.deleteAccountConfirmPassword} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      </Modal>
    </>
  );
}
