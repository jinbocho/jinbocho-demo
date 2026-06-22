import { useState } from "react";
import { PageHeader } from "../../components/ui/PageHeader";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { IconButton } from "../../components/ui/IconButton";
import { Avatar } from "../../components/ui/Avatar";
import { Badge } from "../../components/ui/Badge";
import { Modal } from "../../components/ui/Modal";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { Checkbox } from "../../components/ui/Checkbox";
import { useData } from "../../store/DataContext";
import { useAuth } from "../../store/AuthContext";
import { useLanguage } from "../../i18n";
import type { UserRole } from "../../data/types";

export function UsersPage() {
  const { t } = useLanguage();
  const { users, addUser, updateUser, deleteUser } = useData();
  const { currentUser } = useAuth();

  const [createOpen, setCreateOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<UserRole>("viewer");

  const [editing, setEditing] = useState<{ id: string; name: string; role: UserRole; isActive: boolean } | null>(null);
  const [deleting, setDeleting] = useState<{ id: string; name: string } | null>(null);

  const roleOptions = [
    { value: "admin", label: t.enums.role.admin },
    { value: "editor", label: t.enums.role.editor },
    { value: "viewer", label: t.enums.role.viewer },
  ];

  function handleCreate() {
    addUser({ name: newName.trim(), email: newEmail.trim(), role: newRole });
    setCreateOpen(false);
    setNewName("");
    setNewEmail("");
    setNewRole("viewer");
  }

  function handleSaveEdit() {
    if (!editing) return;
    updateUser(editing.id, { name: editing.name, role: editing.role, is_active: editing.isActive });
    setEditing(null);
  }

  function handleDelete() {
    if (!deleting) return;
    deleteUser(deleting.id);
    setDeleting(null);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.users.title}
        description={t.users.description(users.length)}
        actions={<Button size="sm" onClick={() => setCreateOpen(true)}>{t.users.inviteButton}</Button>}
      />

      <div className="grid gap-3 md:grid-cols-2">
        {users.map((u) => {
          const isSelf = u.id === currentUser?.id;
          return (
            <Card key={u.id} className="flex items-center gap-3 p-4">
              <Avatar name={u.name} color={u.avatar_color} size="md" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-ink">
                  {u.name} {isSelf && <span className="text-xs text-ink-soft">({t.common.you})</span>}
                </p>
                <p className="truncate text-xs text-ink-soft">{u.email}</p>
                <div className="mt-1 flex gap-1.5">
                  <Badge variant="info">{t.enums.role[u.role]}</Badge>
                  {!u.is_active && <Badge variant="danger">{t.users.inactiveBadge}</Badge>}
                </div>
              </div>
              <div className="flex shrink-0 gap-1">
                <IconButton label={t.common.edit} onClick={() => setEditing({ id: u.id, name: u.name, role: u.role, isActive: u.is_active })}>✎</IconButton>
                {!isSelf && <IconButton label={t.common.delete} onClick={() => setDeleting({ id: u.id, name: u.name })}>🗑</IconButton>}
              </div>
            </Card>
          );
        })}
      </div>

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title={t.users.createTitle} footer={
        <>
          <Button variant="secondary" onClick={() => setCreateOpen(false)}>{t.common.cancel}</Button>
          <Button disabled={!newName.trim() || !newEmail.trim()} onClick={handleCreate}>{t.common.add}</Button>
        </>
      }>
        <div className="space-y-3">
          <Input label={t.common.fullName} value={newName} onChange={(e) => setNewName(e.target.value)} />
          <Input label={t.common.email} type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
          <Select label={t.users.roleLabel} value={newRole} onChange={(e) => setNewRole(e.target.value as UserRole)} options={roleOptions} />
          <p className="text-xs text-ink-soft">{t.users.inviteHint}</p>
        </div>
      </Modal>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={t.users.editTitle} footer={
        <>
          <Button variant="secondary" onClick={() => setEditing(null)}>{t.common.cancel}</Button>
          <Button onClick={handleSaveEdit}>{t.common.save}</Button>
        </>
      }>
        {editing && (
          <div className="space-y-3">
            <Input label={t.common.fullName} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            {editing.id === currentUser?.id ? (
              <p className="text-xs text-ink-soft">{t.users.cannotEditSelf}</p>
            ) : (
              <>
                <Select label={t.users.roleLabel} value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value as UserRole })} options={roleOptions} />
                <Checkbox label={t.users.activeLabel} checked={editing.isActive} onChange={(e) => setEditing({ ...editing, isActive: e.target.checked })} />
              </>
            )}
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        title={t.users.deleteConfirmTitle}
        message={deleting ? t.users.deleteConfirmMessage(deleting.name) : ""}
        destructive
        confirmLabel={t.common.delete}
        onConfirm={handleDelete}
        onClose={() => setDeleting(null)}
      />
    </div>
  );
}
