import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { BOOKCASES, ROOMS, SECTIONS, SHELVES } from "../data/locations";
import { OWNED_BOOKS, RECORDS } from "../data/books";
import type { ReadingStatus } from "../data/types";

const STATUS_COLORS: Record<ReadingStatus, string> = {
  read: "bg-sage",
  reading: "bg-amber",
  to_read: "bg-stone",
};

const STATUS_LABELS: Record<ReadingStatus, string> = {
  read: "Letto",
  reading: "In lettura",
  to_read: "Da leggere",
};

function BookSpine({
  bookId,
  title,
  author,
  status,
  position,
}: {
  bookId: string;
  title: string;
  author: string | null;
  status: ReadingStatus;
  position: number | null;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        className={`w-8 h-20 rounded-sm cursor-pointer hover:brightness-110 transition-all hover:scale-105 border border-black/10 flex items-end justify-center pb-1 ${STATUS_COLORS[status]}`}
        onClick={() => navigate(`/books/${bookId}`)}
        title={`${title}${author ? ` — ${author}` : ""}`}
      >
        <span className="text-white/60 text-[8px]">{position ?? ""}</span>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-10 bg-ink text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-lg max-w-48 text-center pointer-events-none">
          <p className="font-medium line-clamp-2">{title}</p>
          {author && <p className="text-white/70 mt-0.5">{author}</p>}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-ink" />
        </div>
      )}
    </div>
  );
}

export function BookcaseMapPage() {
  const { bookcaseId } = useParams<{ bookcaseId: string }>();
  const navigate = useNavigate();

  const bookcase = BOOKCASES.find((bc) => bc.id === bookcaseId);

  if (!bookcase) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <span className="text-5xl mb-4">📚</span>
        <p className="text-ink font-medium text-lg">Libreria non trovata</p>
        <Button variant="secondary" className="mt-4" onClick={() => navigate("/locations")}>
          ← Torna alle librerie
        </Button>
      </div>
    );
  }

  const room = ROOMS.find((r) => r.id === bookcase.room_id);
  const sections = SECTIONS.filter((s) => s.bookcase_id === bookcaseId).sort(
    (a, b) => a.section_index - b.section_index
  );

  return (
    <div className="px-4 md:px-8 py-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Button variant="ghost" size="sm" onClick={() => navigate("/locations")} className="mb-2">
            ← Torna alle librerie
          </Button>
          <h2 className="text-2xl md:text-3xl text-ink">{bookcase.name}</h2>
          <p className="text-ink-soft mt-1">
            {room?.name}
            {bookcase.description ? ` · ${bookcase.description}` : ""}
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 flex-wrap">
        <p className="text-xs text-stone uppercase tracking-wide">Legenda:</p>
        {(["read", "reading", "to_read"] as ReadingStatus[]).map((s) => (
          <div key={s} className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded-sm ${STATUS_COLORS[s]}`} />
            <span className="text-xs text-ink-soft">{STATUS_LABELS[s]}</span>
          </div>
        ))}
      </div>

      {/* Sections and shelves */}
      <div className="space-y-8">
        {sections.map((section) => {
          const shelves = SHELVES.filter((s) => s.section_id === section.id).sort(
            (a, b) => a.shelf_index - b.shelf_index
          );

          return (
            <div key={section.id}>
              <h3 className="text-base font-medium text-ink mb-4">
                {section.label ?? `Sezione ${section.section_index}`}
              </h3>

              <div className="space-y-4">
                {shelves.map((shelf) => {
                  const booksOnShelf = OWNED_BOOKS.filter((b) => b.shelf_id === shelf.id).sort(
                    (a, b) => (a.shelf_position ?? 0) - (b.shelf_position ?? 0)
                  );

                  return (
                    <div key={shelf.id}>
                      <p className="text-xs text-stone mb-2">Ripiano {shelf.shelf_index}</p>

                      {/* Shelf visual */}
                      <div className="relative">
                        {/* Books row */}
                        <div className="flex items-end gap-1 px-3 py-2 bg-paper border border-line rounded-lg min-h-[6rem]">
                          {booksOnShelf.length === 0 ? (
                            <div className="flex items-center justify-center w-full py-4 text-stone/50 text-xs italic">
                              Ripiano vuoto
                            </div>
                          ) : (
                            booksOnShelf.map((book) => {
                              const record = RECORDS.find((r) => r.id === book.record_id);
                              return (
                                <BookSpine
                                  key={book.id}
                                  bookId={book.id}
                                  title={record?.title ?? "?"}
                                  author={record?.main_author ?? null}
                                  status={book.reading_status}
                                  position={book.shelf_position}
                                />
                              );
                            })
                          )}
                        </div>
                        {/* Shelf board */}
                        <div className="h-2 bg-stone/30 rounded-b-sm border-t border-stone/20" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
