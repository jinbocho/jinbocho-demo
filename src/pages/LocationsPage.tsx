import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { PageHeader } from "../components/ui/PageHeader";
import { ROOMS, BOOKCASES, SECTIONS, SHELVES } from "../data/locations";
import { OWNED_BOOKS } from "../data/books";
import { useLanguage } from "../i18n";

export function LocationsPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [openRooms, setOpenRooms] = useState<Set<string>>(new Set(["r1"]));
  const [openBookcases, setOpenBookcases] = useState<Set<string>>(new Set());
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const bookCountByShelf = useMemo(() => {
    const counts: Record<string, number> = {};
    OWNED_BOOKS.forEach((b) => {
      if (b.shelf_id) counts[b.shelf_id] = (counts[b.shelf_id] ?? 0) + 1;
    });
    return counts;
  }, []);

  const bookCountBySection = useMemo(() => {
    const counts: Record<string, number> = {};
    SHELVES.forEach((sh) => {
      counts[sh.section_id] = (counts[sh.section_id] ?? 0) + (bookCountByShelf[sh.id] ?? 0);
    });
    return counts;
  }, [bookCountByShelf]);

  const bookCountByBookcase = useMemo(() => {
    const counts: Record<string, number> = {};
    SECTIONS.forEach((s) => {
      counts[s.bookcase_id] = (counts[s.bookcase_id] ?? 0) + (bookCountBySection[s.id] ?? 0);
    });
    return counts;
  }, [bookCountBySection]);

  const bookCountByRoom = useMemo(() => {
    const counts: Record<string, number> = {};
    BOOKCASES.forEach((bc) => {
      counts[bc.room_id] = (counts[bc.room_id] ?? 0) + (bookCountByBookcase[bc.id] ?? 0);
    });
    return counts;
  }, [bookCountByBookcase]);

  function toggleRoom(id: string) {
    setOpenRooms((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleBookcase(id: string) {
    setOpenBookcases((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleSection(id: string) {
    setOpenSections((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.locations.title}
        description={t.locations.description(ROOMS.length, BOOKCASES.length, OWNED_BOOKS.length)}
      />

      <div className="space-y-3">
        {ROOMS.map((room) => {
          const isRoomOpen = openRooms.has(room.id);
          const bookcases = BOOKCASES.filter((bc) => bc.room_id === room.id);

          return (
            <div key={room.id} className="border border-line rounded-xl overflow-hidden bg-surface">
              <button
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-paper transition-colors text-left"
                onClick={() => toggleRoom(room.id)}
              >
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium text-ink">{room.name}</p>
                    {room.description && (
                      <p className="text-xs text-stone mt-0.5">{room.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-ink-soft">
                    {t.locations.booksCount(bookCountByRoom[room.id] ?? 0)}
                  </span>
                  <span className="text-stone text-sm">{isRoomOpen ? "▲" : "▼"}</span>
                </div>
              </button>

              {isRoomOpen && (
                <div className="border-t border-line">
                  {bookcases.map((bc) => {
                    const isBcOpen = openBookcases.has(bc.id);
                    const sections = SECTIONS.filter((s) => s.bookcase_id === bc.id);

                    return (
                      <div key={bc.id} className="border-b border-line last:border-b-0">
                        <button
                          className="w-full flex items-center justify-between px-5 py-3 pl-10 hover:bg-paper transition-colors text-left"
                          onClick={() => toggleBookcase(bc.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div>
                              <p className="text-sm font-medium text-ink">{bc.name}</p>
                              {bc.description && (
                                <p className="text-xs text-stone">{bc.description}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-ink-soft">
                              {t.locations.booksCount(bookCountByBookcase[bc.id] ?? 0)}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/map/${bc.id}`);
                              }}
                            >
                              {t.locations.viewMap}
                            </Button>
                            <span className="text-stone text-sm">{isBcOpen ? "▲" : "▼"}</span>
                          </div>
                        </button>

                        {isBcOpen && (
                          <div className="border-t border-line bg-paper/50">
                            {sections.map((section) => {
                              const isSectionOpen = openSections.has(section.id);
                              const shelves = SHELVES.filter((s) => s.section_id === section.id);

                              return (
                                <div key={section.id} className="border-b border-line/50 last:border-b-0">
                                  <button
                                    className="w-full flex items-center justify-between px-5 py-2.5 pl-16 hover:bg-paper transition-colors text-left"
                                    onClick={() => toggleSection(section.id)}
                                  >
                                    <div className="flex items-center gap-2">
                                      <p className="text-sm text-ink-soft">
                                        {section.label ?? t.locations.sectionLabel(section.section_index)}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <span className="text-xs text-stone">
                                        {t.locations.booksCount(bookCountBySection[section.id] ?? 0)}
                                      </span>
                                      <span className="text-stone text-xs">{isSectionOpen ? "▲" : "▼"}</span>
                                    </div>
                                  </button>

                                  {isSectionOpen && (
                                    <div className="pl-20 pr-5 py-2 space-y-1">
                                      {shelves.map((shelf) => (
                                        <div
                                          key={shelf.id}
                                          className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-surface border border-line/50"
                                        >
                                          <p className="text-xs text-ink-soft">
                                            {t.locations.shelfLabel(shelf.shelf_index)}
                                          </p>
                                          <span className="text-xs text-stone">
                                            {t.locations.booksCount(bookCountByShelf[shelf.id] ?? 0)}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
