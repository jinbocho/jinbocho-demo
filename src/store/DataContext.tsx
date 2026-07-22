import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type {
  BibliographicRecord, BookClubCycle, BookClubCycleStatus, BookClubMeeting, BookClubParticipant,
  BookClubParticipantStatus, BookClubPost, BookClubProposal, BookClubVote, BookHistory, BookLoan, BookRating,
  BookRead, Bookcase, Family, FamilyChallenge, Genre, Incipit, JournalEntry, OwnedBook, QuizAttempt, QuizQuestion,
  ReadingPath, ReadingSession, ReadingStatus, Room, Section, Shelf, User, UserRole, WishlistItem,
} from "../data/types";
import { RECORDS, OWNED_BOOKS } from "../data/books";
import { ROOMS, BOOKCASES, SECTIONS, SHELVES } from "../data/locations";
import { LOANS } from "../data/loans";
import { READS } from "../data/reads";
import { RATINGS } from "../data/ratings";
import { WISHLIST } from "../data/wishlist";
import { USERS } from "../data/users";
import { DEFAULT_FAMILY } from "../data/family";
import { INCIPITS, BOOK_HISTORY } from "../data/extras";
import { FAMILY_CHALLENGES, JOURNAL_ENTRIES, QUIZ_ATTEMPTS, QUIZ_QUESTIONS, READING_PATHS, READING_SESSIONS } from "../data/kids";
import {
  BOOK_CLUB_CYCLES, BOOK_CLUB_MEETINGS, BOOK_CLUB_PARTICIPANTS, BOOK_CLUB_POSTS, BOOK_CLUB_PROPOSALS, BOOK_CLUB_VOTES,
} from "../data/bookclub";

export interface DataSnapshot {
  family: Family;
  users: User[];
  records: BibliographicRecord[];
  books: OwnedBook[];
  rooms: Room[];
  bookcases: Bookcase[];
  sections: Section[];
  shelves: Shelf[];
  loans: BookLoan[];
  reads: BookRead[];
  history: BookHistory[];
  incipits: Incipit[];
  ratings: BookRating[];
  wishlist: WishlistItem[];
  readingSessions: ReadingSession[];
  quizQuestions: QuizQuestion[];
  quizAttempts: QuizAttempt[];
  journalEntries: JournalEntry[];
  readingPaths: ReadingPath[];
  familyChallenges: FamilyChallenge[];
  bookClubCycles: BookClubCycle[];
  bookClubPosts: BookClubPost[];
  bookClubProposals: BookClubProposal[];
  bookClubVotes: BookClubVote[];
  bookClubParticipants: BookClubParticipant[];
  bookClubMeetings: BookClubMeeting[];
}

function defaultSnapshot(): DataSnapshot {
  return {
    family: DEFAULT_FAMILY,
    users: USERS,
    records: RECORDS,
    books: OWNED_BOOKS,
    rooms: ROOMS,
    bookcases: BOOKCASES,
    sections: SECTIONS,
    shelves: SHELVES,
    loans: LOANS,
    reads: READS,
    history: BOOK_HISTORY,
    incipits: INCIPITS,
    ratings: RATINGS,
    wishlist: WISHLIST,
    readingSessions: READING_SESSIONS,
    quizQuestions: QUIZ_QUESTIONS,
    quizAttempts: QUIZ_ATTEMPTS,
    journalEntries: JOURNAL_ENTRIES,
    readingPaths: READING_PATHS,
    familyChallenges: FAMILY_CHALLENGES,
    bookClubCycles: BOOK_CLUB_CYCLES,
    bookClubPosts: BOOK_CLUB_POSTS,
    bookClubProposals: BOOK_CLUB_PROPOSALS,
    bookClubVotes: BOOK_CLUB_VOTES,
    bookClubParticipants: BOOK_CLUB_PARTICIPANTS,
    bookClubMeetings: BOOK_CLUB_MEETINGS,
  };
}

function emptySnapshot(familyName: string, admin: User): DataSnapshot {
  return {
    family: { id: newId("fam"), name: familyName, description: null },
    users: [admin],
    records: [],
    books: [],
    rooms: [],
    bookcases: [],
    sections: [],
    shelves: [],
    loans: [],
    reads: [],
    history: [],
    incipits: [],
    ratings: [],
    wishlist: [],
    readingSessions: [],
    quizQuestions: [],
    quizAttempts: [],
    journalEntries: [],
    readingPaths: [],
    familyChallenges: [],
    bookClubCycles: [],
    bookClubPosts: [],
    bookClubProposals: [],
    bookClubVotes: [],
    bookClubParticipants: [],
    bookClubMeetings: [],
  };
}

let idCounter = 0;
function newId(prefix: string): string {
  idCounter += 1;
  return `${prefix}_${Date.now().toString(36)}${idCounter}`;
}

export type DuplicateReason = "isbn_match" | "title_author_match";
export interface DuplicateConflict {
  reason: DuplicateReason;
  record: BibliographicRecord;
  existingBook: OwnedBook | null;
}

export function findDuplicateRecord(
  records: BibliographicRecord[],
  draft: { isbn?: string | null; title: string; main_author?: string | null },
): { record: BibliographicRecord; reason: DuplicateReason } | null {
  if (draft.isbn) {
    const byIsbn = records.find((r) => r.isbn && r.isbn === draft.isbn);
    if (byIsbn) return { record: byIsbn, reason: "isbn_match" };
  }
  const byTitleAuthor = records.find(
    (r) =>
      r.title.trim().toLowerCase() === draft.title.trim().toLowerCase() &&
      (r.main_author ?? "").trim().toLowerCase() === (draft.main_author ?? "").trim().toLowerCase(),
  );
  if (byTitleAuthor) return { record: byTitleAuthor, reason: "title_author_match" };
  return null;
}

export interface RecordDraft {
  title: string;
  main_author: string | null;
  other_authors: string[];
  isbn: string | null;
  publisher: string | null;
  publication_year: number | null;
  language: string | null;
  genre: Genre | null;
  notes: string | null;
  cover_url: string | null;
}

export interface BookPlacement {
  room_id: string | null;
  bookcase_id: string | null;
  section_id: string | null;
  shelf_id: string | null;
  shelf_position: number | null;
}

export interface BookDraft extends BookPlacement {
  reading_status: ReadingStatus;
  owner_id: string | null;
  tags: string[];
  notes: string | null;
  condition: OwnedBook["condition"];
  source: OwnedBook["source"];
  purchase_date: string | null;
  purchase_price: number | null;
}

interface DataContextValue extends DataSnapshot {
  addRecordAndBook: (record: RecordDraft, book: BookDraft, intentionalDuplicate: boolean) => OwnedBook;
  updateRecord: (id: string, patch: Partial<RecordDraft>) => void;
  updateBook: (id: string, patch: Partial<BookDraft>) => void;
  moveBook: (id: string, placement: BookPlacement) => void;
  deleteBook: (id: string) => void;
  updateReadingStatus: (bookId: string, status: ReadingStatus, readerId: string | null) => void;
  markRead: (bookId: string, userId: string) => void;
  unmarkRead: (bookId: string, userId: string) => void;
  lendBook: (bookId: string, borrowerName: string, dueDate: string | null) => void;
  returnBook: (loanId: string) => void;
  addRoom: (input: { name: string; description: string | null }) => Room;
  updateRoom: (id: string, patch: Partial<Pick<Room, "name" | "description">>) => void;
  deleteRoom: (id: string) => void;
  addBookcase: (input: { room_id: string; name: string; description: string | null }) => Bookcase;
  updateBookcase: (id: string, patch: Partial<Pick<Bookcase, "name" | "description">>) => void;
  deleteBookcase: (id: string) => void;
  addSection: (input: { bookcase_id: string; label: string | null }) => Section;
  updateSection: (id: string, patch: Partial<Pick<Section, "label">>) => void;
  deleteSection: (id: string) => void;
  addShelf: (input: { section_id: string; notes: string | null }) => Shelf;
  updateShelf: (id: string, patch: Partial<Pick<Shelf, "notes">>) => void;
  deleteShelf: (id: string) => void;
  addUser: (input: { name: string; email: string; role: UserRole }) => User;
  updateUser: (id: string, patch: Partial<Pick<User, "name" | "role" | "is_active" | "annual_reading_goal">>) => void;
  deleteUser: (id: string) => void;
  updateFamily: (patch: Partial<Pick<Family, "name" | "description">>) => void;
  setIncipit: (recordId: string, text: string, source: Incipit["source"]) => void;
  addRating: (bookId: string, userId: string, rating: number, review: string | null) => BookRating;
  updateRating: (id: string, patch: { rating: number; review: string | null }) => void;
  deleteRating: (id: string) => void;
  addWishlistItem: (userId: string, record: WishlistItem["record"], priority: number | null, notes: string | null) => WishlistItem;
  removeWishlistItem: (id: string) => void;
  addBookClubCycle: (recordId: string, title: string, createdBy: string, readingStart: string | null, readingEnd: string | null) => BookClubCycle;
  moveCycleToDiscussion: (id: string) => void;
  undoMoveToDiscussion: (id: string) => void;
  archiveCycle: (id: string) => void;
  reopenCycle: (id: string) => void;
  addBookClubPost: (cycleId: string, userId: string, body: string, isSpoiler: boolean, parentPostId: string | null) => BookClubPost;
  deleteBookClubPost: (id: string) => void;
  addBookClubProposal: (recordId: string, proposedBy: string, note: string | null) => BookClubProposal;
  toggleBookClubVote: (proposalId: string, userId: string) => boolean;
  promoteBookClubProposal: (proposalId: string, createdBy: string) => BookClubCycle | null;
  joinBookClubCycle: (cycleId: string, userId: string) => BookClubParticipant;
  setBookClubParticipantStatus: (cycleId: string, userId: string, status: BookClubParticipantStatus) => void;
  scheduleBookClubMeeting: (cycleId: string, scheduledAt: string, note: string | null, createdBy: string) => BookClubMeeting;
  deleteBookClubMeeting: (id: string) => void;
  resetToSeed: () => void;
  wipeFamily: (familyName: string, admin: { name: string; email: string }) => User;
  replaceSnapshot: (snapshot: DataSnapshot) => void;
}

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [snapshot, setSnapshot] = useState<DataSnapshot>(() => defaultSnapshot());

  const value = useMemo<DataContextValue>(() => {
    const pushHistory = (s: DataSnapshot, bookId: string, event: BookHistory["event_type"], description: string): DataSnapshot => ({
      ...s,
      history: [...s.history, { id: newId("h"), book_id: bookId, event_type: event, description, created_at: new Date().toISOString() }],
    });

    return {
      ...snapshot,

      addRecordAndBook(recordDraft, bookDraft, intentionalDuplicate) {
        let createdBook!: OwnedBook;
        setSnapshot((s) => {
          const record: BibliographicRecord = { id: newId("rec"), ...recordDraft };
          const book: OwnedBook = {
            id: newId("b"),
            record_id: record.id,
            ...bookDraft,
            current_reader_id: bookDraft.reading_status === "reading" ? bookDraft.owner_id : null,
            is_intentional_duplicate: intentionalDuplicate,
            purchase_year: bookDraft.purchase_date ? new Date(bookDraft.purchase_date).getFullYear() : null,
            created_at: new Date().toISOString(),
          };
          createdBook = book;
          const next: DataSnapshot = { ...s, records: [...s.records, record], books: [...s.books, book] };
          return pushHistory(next, book.id, "created", "Libro aggiunto alla libreria");
        });
        return createdBook;
      },

      updateRecord(id, patch) {
        setSnapshot((s) => ({ ...s, records: s.records.map((r) => (r.id === id ? { ...r, ...patch } : r)) }));
      },

      updateBook(id, patch) {
        setSnapshot((s) => {
          const next: DataSnapshot = { ...s, books: s.books.map((b) => (b.id === id ? { ...b, ...patch } : b)) };
          return pushHistory(next, id, "edited", "Dati della copia aggiornati");
        });
      },

      moveBook(id, placement) {
        setSnapshot((s) => {
          const next: DataSnapshot = { ...s, books: s.books.map((b) => (b.id === id ? { ...b, ...placement } : b)) };
          return pushHistory(next, id, "moved", "Posizione aggiornata");
        });
      },

      deleteBook(id) {
        setSnapshot((s) => ({
          ...s,
          books: s.books.filter((b) => b.id !== id),
          loans: s.loans.filter((l) => l.book_id !== id),
          reads: s.reads.filter((r) => r.book_id !== id),
          history: s.history.filter((h) => h.book_id !== id),
        }));
      },

      updateReadingStatus(bookId, status, readerId) {
        setSnapshot((s) => {
          const next: DataSnapshot = {
            ...s,
            books: s.books.map((b) =>
              b.id === bookId ? { ...b, reading_status: status, current_reader_id: status === "reading" ? readerId : null } : b,
            ),
          };
          return pushHistory(next, bookId, "status_changed", `Stato aggiornato`);
        });
      },

      markRead(bookId, userId) {
        setSnapshot((s) => {
          const already = s.reads.some((r) => r.book_id === bookId && r.user_id === userId);
          const reads = already ? s.reads : [...s.reads, { id: newId("r"), book_id: bookId, user_id: userId, read_at: new Date().toISOString() }];
          const books = s.books.map((b) => (b.id === bookId ? { ...b, reading_status: "read" as ReadingStatus, current_reader_id: null } : b));
          return { ...s, reads, books };
        });
      },

      unmarkRead(bookId, userId) {
        setSnapshot((s) => {
          const reads = s.reads.filter((r) => !(r.book_id === bookId && r.user_id === userId));
          const stillRead = reads.some((r) => r.book_id === bookId);
          const books = stillRead ? s.books : s.books.map((b) => (b.id === bookId ? { ...b, reading_status: "to_read" as ReadingStatus } : b));
          return { ...s, reads, books };
        });
      },

      lendBook(bookId, borrowerName, dueDate) {
        setSnapshot((s) => {
          const loan: BookLoan = { id: newId("l"), book_id: bookId, borrower_name: borrowerName, loaned_at: new Date().toISOString().slice(0, 10), due_date: dueDate, returned_at: null };
          const next: DataSnapshot = { ...s, loans: [...s.loans, loan] };
          return pushHistory(next, bookId, "loaned", `Prestato a ${borrowerName}`);
        });
      },

      returnBook(loanId) {
        setSnapshot((s) => {
          const loan = s.loans.find((l) => l.id === loanId);
          const loans = s.loans.map((l) => (l.id === loanId ? { ...l, returned_at: new Date().toISOString().slice(0, 10) } : l));
          const next: DataSnapshot = { ...s, loans };
          return loan ? pushHistory(next, loan.book_id, "returned", "Restituito") : next;
        });
      },

      addRoom(input) {
        const room: Room = { id: newId("r"), name: input.name, description: input.description };
        setSnapshot((s) => ({ ...s, rooms: [...s.rooms, room] }));
        return room;
      },
      updateRoom(id, patch) {
        setSnapshot((s) => ({ ...s, rooms: s.rooms.map((r) => (r.id === id ? { ...r, ...patch } : r)) }));
      },
      deleteRoom(id) {
        setSnapshot((s) => {
          const bookcaseIds = s.bookcases.filter((bc) => bc.room_id === id).map((bc) => bc.id);
          const sectionIds = s.sections.filter((sec) => bookcaseIds.includes(sec.bookcase_id)).map((sec) => sec.id);
          return {
            ...s,
            rooms: s.rooms.filter((r) => r.id !== id),
            bookcases: s.bookcases.filter((bc) => bc.room_id !== id),
            sections: s.sections.filter((sec) => !bookcaseIds.includes(sec.bookcase_id)),
            shelves: s.shelves.filter((sh) => !sectionIds.includes(sh.section_id)),
            books: s.books.map((b) =>
              b.room_id === id ? { ...b, room_id: null, bookcase_id: null, section_id: null, shelf_id: null, shelf_position: null } : b,
            ),
          };
        });
      },

      addBookcase(input) {
        const bookcase: Bookcase = { id: newId("bc"), room_id: input.room_id, name: input.name, description: input.description };
        setSnapshot((s) => ({ ...s, bookcases: [...s.bookcases, bookcase] }));
        return bookcase;
      },
      updateBookcase(id, patch) {
        setSnapshot((s) => ({ ...s, bookcases: s.bookcases.map((bc) => (bc.id === id ? { ...bc, ...patch } : bc)) }));
      },
      deleteBookcase(id) {
        setSnapshot((s) => {
          const sectionIds = s.sections.filter((sec) => sec.bookcase_id === id).map((sec) => sec.id);
          return {
            ...s,
            bookcases: s.bookcases.filter((bc) => bc.id !== id),
            sections: s.sections.filter((sec) => sec.bookcase_id !== id),
            shelves: s.shelves.filter((sh) => !sectionIds.includes(sh.section_id)),
            books: s.books.map((b) =>
              b.bookcase_id === id ? { ...b, bookcase_id: null, section_id: null, shelf_id: null, shelf_position: null } : b,
            ),
          };
        });
      },

      addSection(input) {
        const siblings = snapshot.sections.filter((sec) => sec.bookcase_id === input.bookcase_id);
        const section: Section = { id: newId("s"), bookcase_id: input.bookcase_id, section_index: siblings.length + 1, label: input.label };
        setSnapshot((s) => ({ ...s, sections: [...s.sections, section] }));
        return section;
      },
      updateSection(id, patch) {
        setSnapshot((s) => ({ ...s, sections: s.sections.map((sec) => (sec.id === id ? { ...sec, ...patch } : sec)) }));
      },
      deleteSection(id) {
        setSnapshot((s) => {
          return {
            ...s,
            sections: s.sections.filter((sec) => sec.id !== id),
            shelves: s.shelves.filter((sh) => sh.section_id !== id),
            books: s.books.map((b) => (b.section_id === id ? { ...b, section_id: null, shelf_id: null, shelf_position: null } : b)),
          };
        });
      },

      addShelf(input) {
        const siblings = snapshot.shelves.filter((sh) => sh.section_id === input.section_id);
        const shelf: Shelf = { id: newId("sh"), section_id: input.section_id, shelf_index: siblings.length + 1, notes: input.notes };
        setSnapshot((s) => ({ ...s, shelves: [...s.shelves, shelf] }));
        return shelf;
      },
      updateShelf(id, patch) {
        setSnapshot((s) => ({ ...s, shelves: s.shelves.map((sh) => (sh.id === id ? { ...sh, ...patch } : sh)) }));
      },
      deleteShelf(id) {
        setSnapshot((s) => ({
          ...s,
          shelves: s.shelves.filter((sh) => sh.id !== id),
          books: s.books.map((b) => (b.shelf_id === id ? { ...b, shelf_id: null, shelf_position: null } : b)),
        }));
      },

      addUser(input) {
        const user: User = { id: newId("u"), name: input.name, email: input.email, role: input.role, avatar_color: "#bc002d", annual_reading_goal: null, is_active: true, joined_at: new Date().toISOString() };
        setSnapshot((s) => ({ ...s, users: [...s.users, user] }));
        return user;
      },
      updateUser(id, patch) {
        setSnapshot((s) => ({ ...s, users: s.users.map((u) => (u.id === id ? { ...u, ...patch } : u)) }));
      },
      deleteUser(id) {
        setSnapshot((s) => ({
          ...s,
          users: s.users.filter((u) => u.id !== id),
          books: s.books.map((b) => ({
            ...b,
            owner_id: b.owner_id === id ? null : b.owner_id,
            current_reader_id: b.current_reader_id === id ? null : b.current_reader_id,
          })),
        }));
      },

      updateFamily(patch) {
        setSnapshot((s) => ({ ...s, family: { ...s.family, ...patch } }));
      },

      setIncipit(recordId, text, source) {
        setSnapshot((s) => {
          const exists = s.incipits.some((i) => i.record_id === recordId);
          const incipits = exists
            ? s.incipits.map((i) => (i.record_id === recordId ? { ...i, text, source } : i))
            : [...s.incipits, { record_id: recordId, text, source }];
          return { ...s, incipits };
        });
      },

      addRating(bookId, userId, rating, review) {
        const created: BookRating = { id: newId("rt"), book_id: bookId, user_id: userId, rating, review, created_at: new Date().toISOString() };
        setSnapshot((s) => ({ ...s, ratings: [...s.ratings, created] }));
        return created;
      },

      updateRating(id, patch) {
        setSnapshot((s) => ({ ...s, ratings: s.ratings.map((r) => (r.id === id ? { ...r, ...patch } : r)) }));
      },

      deleteRating(id) {
        setSnapshot((s) => ({ ...s, ratings: s.ratings.filter((r) => r.id !== id) }));
      },

      addWishlistItem(userId, record, priority, notes) {
        const created: WishlistItem = { id: newId("w"), user_id: userId, priority, notes, created_at: new Date().toISOString(), record };
        setSnapshot((s) => ({ ...s, wishlist: [...s.wishlist, created] }));
        return created;
      },

      removeWishlistItem(id) {
        setSnapshot((s) => ({ ...s, wishlist: s.wishlist.filter((w) => w.id !== id) }));
      },

      addBookClubCycle(recordId, title, createdBy, readingStart, readingEnd) {
        const cycle: BookClubCycle = {
          id: newId("bc"), record_id: recordId, title, status: "reading",
          reading_start: readingStart, reading_end: readingEnd, created_by: createdBy,
          created_at: new Date().toISOString(),
        };
        setSnapshot((s) => ({ ...s, bookClubCycles: [...s.bookClubCycles, cycle] }));
        return cycle;
      },

      // Mirrors the real app's transition graph: Reading <-> Discussing,
      // Discussing -> Archived -> Discussing. A cycle can only close once it
      // has gone through discussion, and every step is reversible so a
      // mis-click never locks the group out of writing.
      moveCycleToDiscussion(id) {
        setSnapshot((s) => ({
          ...s,
          bookClubCycles: s.bookClubCycles.map((c) => (c.id === id && c.status === "reading" ? { ...c, status: "discussing" as BookClubCycleStatus } : c)),
        }));
      },
      undoMoveToDiscussion(id) {
        setSnapshot((s) => ({
          ...s,
          bookClubCycles: s.bookClubCycles.map((c) => (c.id === id && c.status === "discussing" ? { ...c, status: "reading" as BookClubCycleStatus } : c)),
        }));
      },
      archiveCycle(id) {
        setSnapshot((s) => ({
          ...s,
          bookClubCycles: s.bookClubCycles.map((c) => (c.id === id && c.status === "discussing" ? { ...c, status: "archived" as BookClubCycleStatus } : c)),
        }));
      },
      reopenCycle(id) {
        setSnapshot((s) => ({
          ...s,
          bookClubCycles: s.bookClubCycles.map((c) => (c.id === id && c.status === "archived" ? { ...c, status: "discussing" as BookClubCycleStatus } : c)),
        }));
      },

      addBookClubPost(cycleId, userId, body, isSpoiler, parentPostId) {
        const post: BookClubPost = {
          id: newId("bcp"), cycle_id: cycleId, user_id: userId, body,
          parent_post_id: parentPostId, is_spoiler: isSpoiler, created_at: new Date().toISOString(),
        };
        setSnapshot((s) => ({ ...s, bookClubPosts: [...s.bookClubPosts, post] }));
        return post;
      },
      deleteBookClubPost(id) {
        setSnapshot((s) => ({ ...s, bookClubPosts: s.bookClubPosts.filter((p) => p.id !== id) }));
      },

      addBookClubProposal(recordId, proposedBy, note) {
        const proposal: BookClubProposal = { id: newId("bcpr"), record_id: recordId, proposed_by: proposedBy, note, created_at: new Date().toISOString() };
        setSnapshot((s) => ({ ...s, bookClubProposals: [...s.bookClubProposals, proposal] }));
        return proposal;
      },

      toggleBookClubVote(proposalId, userId) {
        const existing = snapshot.bookClubVotes.find((v) => v.proposal_id === proposalId && v.user_id === userId);
        setSnapshot((s) => ({
          ...s,
          bookClubVotes: existing
            ? s.bookClubVotes.filter((v) => v.id !== existing.id)
            : [...s.bookClubVotes, { id: newId("bcv"), proposal_id: proposalId, user_id: userId }],
        }));
        return !existing;
      },

      // Turns the winning proposal into a new cycle and clears the whole
      // proposal pool (and its votes) — a fresh voting round starts empty.
      promoteBookClubProposal(proposalId, createdBy) {
        const proposal = snapshot.bookClubProposals.find((p) => p.id === proposalId);
        if (!proposal) return null;
        const record = snapshot.records.find((r) => r.id === proposal.record_id);
        const cycle: BookClubCycle = {
          id: newId("bc"), record_id: proposal.record_id, title: record?.title ?? "",
          status: "reading", reading_start: null, reading_end: null,
          created_by: createdBy, created_at: new Date().toISOString(),
        };
        setSnapshot((s) => ({
          ...s,
          bookClubCycles: [...s.bookClubCycles, cycle],
          bookClubProposals: [],
          bookClubVotes: [],
        }));
        return cycle;
      },

      joinBookClubCycle(cycleId, userId) {
        const existing = snapshot.bookClubParticipants.find((p) => p.cycle_id === cycleId && p.user_id === userId);
        if (existing) return existing;
        const participant: BookClubParticipant = { id: newId("bcpt"), cycle_id: cycleId, user_id: userId, status: "joined" };
        setSnapshot((s) => ({ ...s, bookClubParticipants: [...s.bookClubParticipants, participant] }));
        return participant;
      },

      setBookClubParticipantStatus(cycleId, userId, status) {
        setSnapshot((s) => ({
          ...s,
          bookClubParticipants: s.bookClubParticipants.map((p) =>
            p.cycle_id === cycleId && p.user_id === userId ? { ...p, status } : p,
          ),
        }));
      },

      scheduleBookClubMeeting(cycleId, scheduledAt, note, createdBy) {
        const meeting: BookClubMeeting = { id: newId("bcm"), cycle_id: cycleId, scheduled_at: scheduledAt, note, created_by: createdBy };
        setSnapshot((s) => ({ ...s, bookClubMeetings: [...s.bookClubMeetings, meeting] }));
        return meeting;
      },

      deleteBookClubMeeting(id) {
        setSnapshot((s) => ({ ...s, bookClubMeetings: s.bookClubMeetings.filter((m) => m.id !== id) }));
      },

      resetToSeed() {
        setSnapshot(defaultSnapshot());
      },

      wipeFamily(familyName, admin) {
        const adminUser: User = { id: newId("u"), name: admin.name, email: admin.email, role: "admin", avatar_color: "#bc002d", annual_reading_goal: null, is_active: true, joined_at: new Date().toISOString() };
        setSnapshot(emptySnapshot(familyName, adminUser));
        return adminUser;
      },

      replaceSnapshot(next) {
        setSnapshot(next);
      },
    };
  }, [snapshot]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData(): DataContextValue {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
