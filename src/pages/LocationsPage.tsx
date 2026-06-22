import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { IconButton } from "../components/ui/IconButton";
import { PageHeader } from "../components/ui/PageHeader";
import { Modal } from "../components/ui/Modal";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { useData } from "../store/DataContext";
import { useAuth } from "../store/AuthContext";
import { useLanguage } from "../i18n";

type DeleteTarget = { kind: "room" | "bookcase" | "section" | "shelf"; id: string } | null;

export function LocationsPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { hasRole } = useAuth();
  const { rooms, bookcases, sections, shelves, books, addRoom, updateRoom, deleteRoom, addBookcase, updateBookcase, deleteBookcase, addSection, updateSection, deleteSection, addShelf, updateShelf, deleteShelf } = useData();
  const canEdit = hasRole("admin", "editor");

  const [openRooms, setOpenRooms] = useState<Set<string>>(new Set(["r1"]));
  const [openBookcases, setOpenBookcases] = useState<Set<string>>(new Set());
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const [roomModal, setRoomModal] = useState<{ id: string | null; name: string; description: string } | null>(null);
  const [bookcaseModal, setBookcaseModal] = useState<{ id: string | null; roomId: string; name: string; description: string } | null>(null);
  const [sectionModal, setSectionModal] = useState<{ id: string | null; bookcaseId: string; label: string } | null>(null);
  const [shelfModal, setShelfModal] = useState<{ id: string | null; sectionId: string; notes: string } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget>(null);

  const bookCountByShelf = useMemo(() => {
    const counts: Record<string, number> = {};
    books.forEach((b) => { if (b.shelf_id) counts[b.shelf_id] = (counts[b.shelf_id] ?? 0) + 1; });
    return counts;
  }, [books]);
  const bookCountBySection = useMemo(() => {
    const counts: Record<string, number> = {};
    shelves.forEach((sh) => { counts[sh.section_id] = (counts[sh.section_id] ?? 0) + (bookCountByShelf[sh.id] ?? 0); });
    return counts;
  }, [shelves, bookCountByShelf]);
  const bookCountByBookcase = useMemo(() => {
    const counts: Record<string, number> = {};
    sections.forEach((s) => { counts[s.bookcase_id] = (counts[s.bookcase_id] ?? 0) + (bookCountBySection[s.id] ?? 0); });
    return counts;
  }, [sections, bookCountBySection]);
  const bookCountByRoom = useMemo(() => {
    const counts: Record<string, number> = {};
    bookcases.forEach((bc) => { counts[bc.room_id] = (counts[bc.room_id] ?? 0) + (bookCountByBookcase[bc.id] ?? 0); });
    return counts;
  }, [bookcases, bookCountByBookcase]);

  function toggle(set: Set<string>, setSet: (s: Set<string>) => void, id: string) {
    const next = new Set(set);
    next.has(id) ? next.delete(id) : next.add(id);
    setSet(next);
  }

  function saveRoom() {
    if (!roomModal) return;
    if (roomModal.id) updateRoom(roomModal.id, { name: roomModal.name, description: roomModal.description || null });
    else addRoom({ name: roomModal.name, description: roomModal.description || null });
    setRoomModal(null);
  }
  function saveBookcase() {
    if (!bookcaseModal) return;
    if (bookcaseModal.id) updateBookcase(bookcaseModal.id, { name: bookcaseModal.name, description: bookcaseModal.description || null });
    else addBookcase({ room_id: bookcaseModal.roomId, name: bookcaseModal.name, description: bookcaseModal.description || null });
    setBookcaseModal(null);
  }
  function saveSection() {
    if (!sectionModal) return;
    if (sectionModal.id) updateSection(sectionModal.id, { label: sectionModal.label || null });
    else addSection({ bookcase_id: sectionModal.bookcaseId, label: sectionModal.label || null });
    setSectionModal(null);
  }
  function saveShelf() {
    if (!shelfModal) return;
    if (shelfModal.id) updateShelf(shelfModal.id, { notes: shelfModal.notes || null });
    else addShelf({ section_id: shelfModal.sectionId, notes: shelfModal.notes || null });
    setShelfModal(null);
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    if (deleteTarget.kind === "room") deleteRoom(deleteTarget.id);
    if (deleteTarget.kind === "bookcase") deleteBookcase(deleteTarget.id);
    if (deleteTarget.kind === "section") deleteSection(deleteTarget.id);
    if (deleteTarget.kind === "shelf") deleteShelf(deleteTarget.id);
    setDeleteTarget(null);
  }

  const deleteMessages: Record<NonNullable<DeleteTarget>["kind"], string> = {
    room: t.locations.deleteRoomConfirm,
    bookcase: t.locations.deleteBookcaseConfirm,
    section: t.locations.deleteSectionConfirm,
    shelf: t.locations.deleteShelfConfirm,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.locations.title}
        description={t.locations.description(rooms.length, bookcases.length, books.length)}
        actions={canEdit ? <Button size="sm" onClick={() => setRoomModal({ id: null, name: "", description: "" })}>{t.locations.addRoom}</Button> : undefined}
      />

      {rooms.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-5xl mb-4">🗄</span>
          <p className="text-ink font-medium text-lg">{t.locations.emptyTitle}</p>
          {canEdit && <Button className="mt-4" onClick={() => setRoomModal({ id: null, name: "", description: "" })}>{t.locations.addRoom}</Button>}
        </div>
      ) : (
        <div className="space-y-3">
          {rooms.map((room) => {
            const isRoomOpen = openRooms.has(room.id);
            const roomBookcases = bookcases.filter((bc) => bc.room_id === room.id);

            return (
              <div key={room.id} className="border border-line rounded-xl overflow-hidden bg-surface">
                <div className="w-full flex items-center justify-between px-5 py-4 hover:bg-paper transition-colors">
                  <button className="flex-1 text-left" onClick={() => toggle(openRooms, setOpenRooms, room.id)}>
                    <p className="font-medium text-ink">{room.name}</p>
                    {room.description && <p className="text-xs text-stone mt-0.5">{room.description}</p>}
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-ink-soft">{t.locations.booksCount(bookCountByRoom[room.id] ?? 0)}</span>
                    {canEdit && (
                      <>
                        <IconButton label={t.common.edit} onClick={() => setRoomModal({ id: room.id, name: room.name, description: room.description ?? "" })}>✎</IconButton>
                        <IconButton label={t.common.delete} onClick={() => setDeleteTarget({ kind: "room", id: room.id })}>🗑</IconButton>
                      </>
                    )}
                    <button onClick={() => toggle(openRooms, setOpenRooms, room.id)} className="text-stone text-sm px-1">{isRoomOpen ? "▲" : "▼"}</button>
                  </div>
                </div>

                {isRoomOpen && (
                  <div className="border-t border-line">
                    {roomBookcases.map((bc) => {
                      const isBcOpen = openBookcases.has(bc.id);
                      const bcSections = sections.filter((s) => s.bookcase_id === bc.id);

                      return (
                        <div key={bc.id} className="border-b border-line last:border-b-0">
                          <div className="w-full flex items-center justify-between px-5 py-3 pl-10 hover:bg-paper transition-colors">
                            <button className="flex-1 text-left" onClick={() => toggle(openBookcases, setOpenBookcases, bc.id)}>
                              <p className="text-sm font-medium text-ink">{bc.name}</p>
                              {bc.description && <p className="text-xs text-stone">{bc.description}</p>}
                            </button>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-ink-soft">{t.locations.booksCount(bookCountByBookcase[bc.id] ?? 0)}</span>
                              <Button variant="ghost" size="sm" onClick={() => navigate(`/map/${bc.id}`)}>{t.locations.viewMap}</Button>
                              {canEdit && (
                                <>
                                  <IconButton label={t.common.edit} onClick={() => setBookcaseModal({ id: bc.id, roomId: bc.room_id, name: bc.name, description: bc.description ?? "" })}>✎</IconButton>
                                  <IconButton label={t.common.delete} onClick={() => setDeleteTarget({ kind: "bookcase", id: bc.id })}>🗑</IconButton>
                                </>
                              )}
                              <button onClick={() => toggle(openBookcases, setOpenBookcases, bc.id)} className="text-stone text-sm px-1">{isBcOpen ? "▲" : "▼"}</button>
                            </div>
                          </div>

                          {isBcOpen && (
                            <div className="border-t border-line bg-paper/50">
                              {bcSections.map((section) => {
                                const isSectionOpen = openSections.has(section.id);
                                const sectionShelves = shelves.filter((s) => s.section_id === section.id);

                                return (
                                  <div key={section.id} className="border-b border-line/50 last:border-b-0">
                                    <div className="w-full flex items-center justify-between px-5 py-2.5 pl-16 hover:bg-paper transition-colors">
                                      <button className="flex-1 text-left" onClick={() => toggle(openSections, setOpenSections, section.id)}>
                                        <p className="text-sm text-ink-soft">{section.label ?? t.locations.sectionLabel(section.section_index)}</p>
                                      </button>
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs text-stone">{t.locations.booksCount(bookCountBySection[section.id] ?? 0)}</span>
                                        {canEdit && (
                                          <>
                                            <IconButton label={t.common.edit} onClick={() => setSectionModal({ id: section.id, bookcaseId: section.bookcase_id, label: section.label ?? "" })}>✎</IconButton>
                                            <IconButton label={t.common.delete} onClick={() => setDeleteTarget({ kind: "section", id: section.id })}>🗑</IconButton>
                                          </>
                                        )}
                                        <button onClick={() => toggle(openSections, setOpenSections, section.id)} className="text-stone text-xs px-1">{isSectionOpen ? "▲" : "▼"}</button>
                                      </div>
                                    </div>

                                    {isSectionOpen && (
                                      <div className="pl-20 pr-5 py-2 space-y-1">
                                        {sectionShelves.map((shelf) => (
                                          <div key={shelf.id} className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-surface border border-line/50">
                                            <div>
                                              <p className="text-xs text-ink-soft">{t.locations.shelfLabel(shelf.shelf_index)}</p>
                                              {shelf.notes && <p className="text-xs text-stone">{shelf.notes}</p>}
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <span className="text-xs text-stone">{t.locations.booksCount(bookCountByShelf[shelf.id] ?? 0)}</span>
                                              {canEdit && (
                                                <>
                                                  <IconButton label={t.common.edit} onClick={() => setShelfModal({ id: shelf.id, sectionId: shelf.section_id, notes: shelf.notes ?? "" })}>✎</IconButton>
                                                  <IconButton label={t.common.delete} onClick={() => setDeleteTarget({ kind: "shelf", id: shelf.id })}>🗑</IconButton>
                                                </>
                                              )}
                                            </div>
                                          </div>
                                        ))}
                                        {canEdit && (
                                          <Button variant="ghost" size="sm" onClick={() => setShelfModal({ id: null, sectionId: section.id, notes: "" })}>{t.locations.addShelf}</Button>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                              {canEdit && (
                                <div className="px-5 py-2 pl-16">
                                  <Button variant="ghost" size="sm" onClick={() => setSectionModal({ id: null, bookcaseId: bc.id, label: "" })}>{t.locations.addSection}</Button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                    {canEdit && (
                      <div className="px-5 py-3 pl-10">
                        <Button variant="ghost" size="sm" onClick={() => setBookcaseModal({ id: null, roomId: room.id, name: "", description: "" })}>{t.locations.addBookcase}</Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <Modal open={!!roomModal} onClose={() => setRoomModal(null)} title={roomModal?.id ? t.locations.editRoom : t.locations.addRoom} footer={
        <>
          <Button variant="secondary" onClick={() => setRoomModal(null)}>{t.common.cancel}</Button>
          <Button onClick={saveRoom} disabled={!roomModal?.name.trim()}>{t.common.save}</Button>
        </>
      }>
        {roomModal && (
          <div className="space-y-3">
            <Input label={t.locations.nameLabel} value={roomModal.name} onChange={(e) => setRoomModal({ ...roomModal, name: e.target.value })} />
            <Textarea label={t.common.description} rows={2} value={roomModal.description} onChange={(e) => setRoomModal({ ...roomModal, description: e.target.value })} />
          </div>
        )}
      </Modal>

      <Modal open={!!bookcaseModal} onClose={() => setBookcaseModal(null)} title={bookcaseModal?.id ? t.locations.editBookcase : t.locations.addBookcase} footer={
        <>
          <Button variant="secondary" onClick={() => setBookcaseModal(null)}>{t.common.cancel}</Button>
          <Button onClick={saveBookcase} disabled={!bookcaseModal?.name.trim()}>{t.common.save}</Button>
        </>
      }>
        {bookcaseModal && (
          <div className="space-y-3">
            <Input label={t.locations.nameLabel} value={bookcaseModal.name} onChange={(e) => setBookcaseModal({ ...bookcaseModal, name: e.target.value })} />
            <Textarea label={t.common.description} rows={2} value={bookcaseModal.description} onChange={(e) => setBookcaseModal({ ...bookcaseModal, description: e.target.value })} />
          </div>
        )}
      </Modal>

      <Modal open={!!sectionModal} onClose={() => setSectionModal(null)} title={sectionModal?.id ? t.locations.editSection : t.locations.addSection} footer={
        <>
          <Button variant="secondary" onClick={() => setSectionModal(null)}>{t.common.cancel}</Button>
          <Button onClick={saveSection}>{t.common.save}</Button>
        </>
      }>
        {sectionModal && <Input label={t.locations.labelLabel} value={sectionModal.label} onChange={(e) => setSectionModal({ ...sectionModal, label: e.target.value })} />}
      </Modal>

      <Modal open={!!shelfModal} onClose={() => setShelfModal(null)} title={shelfModal?.id ? t.locations.editShelf : t.locations.addShelf} footer={
        <>
          <Button variant="secondary" onClick={() => setShelfModal(null)}>{t.common.cancel}</Button>
          <Button onClick={saveShelf}>{t.common.save}</Button>
        </>
      }>
        {shelfModal && <Input label={t.locations.notesLabel} value={shelfModal.notes} onChange={(e) => setShelfModal({ ...shelfModal, notes: e.target.value })} />}
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title={t.common.delete}
        message={deleteTarget ? deleteMessages[deleteTarget.kind] : ""}
        destructive
        confirmLabel={t.common.delete}
        onConfirm={confirmDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}
