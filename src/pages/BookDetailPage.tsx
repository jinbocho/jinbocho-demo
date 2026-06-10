import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { BookCover } from "../components/ui/BookCover";
import { Avatar } from "../components/ui/Avatar";
import { OWNED_BOOKS, RECORDS } from "../data/books";
import { USERS } from "../data/users";
import { LOANS } from "../data/loans";
import { READS } from "../data/reads";
import { ROOMS, BOOKCASES, SECTIONS, SHELVES } from "../data/locations";

export function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const book = OWNED_BOOKS.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <span className="text-5xl mb-4">📕</span>
        <p className="text-ink font-medium text-lg">Libro non trovato</p>
        <Button variant="secondary" className="mt-4" onClick={() => navigate("/catalog")}>
          ← Torna al catalogo
        </Button>
      </div>
    );
  }

  const record = RECORDS.find((r) => r.id === book.record_id);

  if (!record) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <span className="text-5xl mb-4">📕</span>
        <p className="text-ink font-medium text-lg">Scheda bibliografica non trovata</p>
        <Button variant="secondary" className="mt-4" onClick={() => navigate("/catalog")}>
          ← Torna al catalogo
        </Button>
      </div>
    );
  }

  const owner = USERS.find((u) => u.id === book.owner_id);
  const currentReader = book.current_reader_id
    ? USERS.find((u) => u.id === book.current_reader_id)
    : null;
  const activeLoan = LOANS.find((l) => l.book_id === book.id && l.returned_at === null);
  const bookReads = READS.filter((r) => r.book_id === book.id).map((r) => ({
    ...r,
    user: USERS.find((u) => u.id === r.user_id),
  }));

  const room = book.room_id ? ROOMS.find((r) => r.id === book.room_id) : null;
  const bookcase = book.bookcase_id ? BOOKCASES.find((b) => b.id === book.bookcase_id) : null;
  const section = book.section_id ? SECTIONS.find((s) => s.id === book.section_id) : null;
  const shelf = book.shelf_id ? SHELVES.find((s) => s.id === book.shelf_id) : null;

  return (
    <div>
      <Button variant="ghost" size="sm" onClick={() => navigate("/catalog")} className="mb-6">
        ← Torna al catalogo
      </Button>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Cover */}
        <div className="shrink-0 md:w-48">
          <BookCover url={record.cover_url} title={record.title} className="h-64 w-full rounded-lg md:h-72" />
        </div>

        {/* Details */}
        <div className="flex-1 space-y-6">
          {/* Title & author */}
          <div>
            <h2 className="text-2xl md:text-3xl text-ink leading-tight">{record.title}</h2>
            {record.main_author && (
              <p className="text-lg text-ink-soft mt-1">{record.main_author}</p>
            )}
            <div className="mt-3">
              <Badge variant={book.reading_status} />
            </div>
          </div>

          {/* Metadata grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            {record.publication_year && (
              <div>
                <p className="text-xs text-stone uppercase tracking-wide">Anno</p>
                <p className="text-sm text-ink font-medium">{record.publication_year}</p>
              </div>
            )}
            {record.publisher && (
              <div>
                <p className="text-xs text-stone uppercase tracking-wide">Editore</p>
                <p className="text-sm text-ink font-medium">{record.publisher}</p>
              </div>
            )}
            {record.isbn && (
              <div>
                <p className="text-xs text-stone uppercase tracking-wide">ISBN</p>
                <p className="text-sm text-ink font-medium font-mono">{record.isbn}</p>
              </div>
            )}
            {record.genre && (
              <div>
                <p className="text-xs text-stone uppercase tracking-wide">Genere</p>
                <p className="text-sm text-ink font-medium">{record.genre}</p>
              </div>
            )}
            {book.purchase_year && (
              <div>
                <p className="text-xs text-stone uppercase tracking-wide">Acquistato</p>
                <p className="text-sm text-ink font-medium">{book.purchase_year}</p>
              </div>
            )}
          </div>

          {/* Position */}
          {(room || bookcase || section || shelf) && (
            <div className="bg-paper rounded-lg border border-line px-4 py-3">
              <p className="text-xs text-stone uppercase tracking-wide mb-2">Posizione</p>
              <div className="flex items-center gap-2 flex-wrap text-sm">
                {room && <span className="font-medium text-ink">{room.name}</span>}
                {bookcase && (
                  <>
                    <span className="text-stone">›</span>
                    <span
                      className="text-brand hover:underline cursor-pointer"
                      onClick={() => navigate(`/map/${bookcase.id}`)}
                    >
                      {bookcase.name}
                    </span>
                  </>
                )}
                {section && (
                  <>
                    <span className="text-stone">›</span>
                    <span className="text-ink-soft">{section.label ?? `Sezione ${section.section_index}`}</span>
                  </>
                )}
                {shelf && (
                  <>
                    <span className="text-stone">›</span>
                    <span className="text-ink-soft">Ripiano {shelf.shelf_index}</span>
                  </>
                )}
                {book.shelf_position != null && (
                  <>
                    <span className="text-stone">›</span>
                    <span className="text-ink-soft">Pos. {book.shelf_position}</span>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Owner */}
          {owner && (
            <div className="flex items-center gap-3">
              <p className="text-xs text-stone uppercase tracking-wide">Proprietario</p>
              <div className="flex items-center gap-2">
                <Avatar name={owner.name} color={owner.avatar_color} size="sm" />
                <span className="text-sm font-medium text-ink">{owner.name}</span>
                <span className="text-xs text-stone capitalize">{owner.role}</span>
              </div>
            </div>
          )}

          {/* Current reader */}
          {currentReader && (
            <div className="flex items-center gap-3">
              <p className="text-xs text-stone uppercase tracking-wide">In lettura da</p>
              <div className="flex items-center gap-2">
                <Avatar name={currentReader.name} color={currentReader.avatar_color} size="sm" />
                <span className="text-sm font-medium text-amber">{currentReader.name}</span>
              </div>
            </div>
          )}

          {/* Active loan */}
          {activeLoan && (
            <div className="bg-brand/5 border border-brand/20 rounded-lg px-4 py-3">
              <p className="text-xs text-stone uppercase tracking-wide mb-1">In prestito</p>
              <p className="text-sm text-ink">
                Prestato a <span className="font-semibold">{activeLoan.borrower_name}</span> dal{" "}
                {new Date(activeLoan.loaned_at).toLocaleDateString("it-IT", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              {activeLoan.due_date && (
                <p className="text-xs text-ink-soft mt-0.5">
                  Scadenza:{" "}
                  {new Date(activeLoan.due_date).toLocaleDateString("it-IT", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>
          )}

          {/* Notes */}
          {book.notes && (
            <div>
              <p className="text-xs text-stone uppercase tracking-wide mb-1">Note</p>
              <p className="text-sm text-ink-soft italic">{book.notes}</p>
            </div>
          )}

          {/* Tags */}
          {book.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {book.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-paper border border-line rounded-full text-xs text-ink-soft"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Who read it */}
          {bookReads.length > 0 && (
            <div>
              <p className="text-xs text-stone uppercase tracking-wide mb-2">
                Letto da ({bookReads.length})
              </p>
              <div className="flex flex-wrap gap-3">
                {bookReads.map((read) =>
                  read.user ? (
                    <div key={read.id} className="flex items-center gap-2">
                      <Avatar name={read.user.name} color={read.user.avatar_color} size="sm" />
                      <div>
                        <p className="text-xs font-medium text-ink">{read.user.name}</p>
                        <p className="text-xs text-stone">
                          {new Date(read.read_at).toLocaleDateString("it-IT", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
