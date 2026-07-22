export type ReadingStatus = "to_read" | "reading" | "read";
export type UserRole = "admin" | "editor" | "viewer" | "child";
export type BookCondition = "new" | "good" | "fair" | "poor";
export type BookSource = "purchased" | "gift" | "borrowed" | "other";
export type IncipitSource = "manual" | "ai" | "editorial";
export type ThemeName = "pergamena" | "akabeni" | "sumi";
export type ThemeMode = "light" | "dark" | "system";

export type Genre =
  | "fiction"
  | "fantasy"
  | "science_fiction"
  | "mystery_thriller"
  | "romance"
  | "horror"
  | "historical"
  | "biography_memoir"
  | "history"
  | "science"
  | "philosophy"
  | "religion"
  | "self_help"
  | "business"
  | "art"
  | "poetry"
  | "drama"
  | "comics"
  | "children"
  | "young_adult"
  | "travel"
  | "cooking"
  | "essay"
  | "reference"
  | "other";

export interface Family {
  id: string;
  name: string;
  description: string | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar_color: string;
  annual_reading_goal: number | null;
  is_active: boolean;
  joined_at: string;
}

export interface Room {
  id: string;
  name: string;
  description: string | null;
}
export interface Bookcase {
  id: string;
  room_id: string;
  name: string;
  description: string | null;
}
export interface Section {
  id: string;
  bookcase_id: string;
  section_index: number;
  label: string | null;
}
export interface Shelf {
  id: string;
  section_id: string;
  shelf_index: number;
  notes: string | null;
}

export interface BibliographicRecord {
  id: string;
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

export interface OwnedBook {
  id: string;
  record_id: string;
  room_id: string | null;
  bookcase_id: string | null;
  section_id: string | null;
  shelf_id: string | null;
  shelf_position: number | null;
  reading_status: ReadingStatus;
  owner_id: string | null;
  current_reader_id: string | null;
  tags: string[];
  notes: string | null;
  condition: BookCondition | null;
  source: BookSource | null;
  purchase_year: number | null;
  purchase_date: string | null;
  purchase_price: number | null;
  is_intentional_duplicate: boolean;
  created_at: string;
}

export interface BookRead {
  id: string;
  book_id: string;
  user_id: string;
  read_at: string;
}

export interface BookLoan {
  id: string;
  book_id: string;
  borrower_name: string;
  loaned_at: string;
  due_date: string | null;
  returned_at: string | null;
}

export type BookHistoryEvent = "created" | "status_changed" | "moved" | "loaned" | "returned" | "edited";

export interface BookHistory {
  id: string;
  book_id: string;
  event_type: BookHistoryEvent;
  description: string;
  created_at: string;
}

export interface Incipit {
  record_id: string;
  text: string | null;
  source: IncipitSource | null;
}

export interface BookRating {
  id: string;
  book_id: string;
  user_id: string;
  rating: number;
  review: string | null;
  created_at: string;
}

export interface LibraryRatingStats {
  average: number | null;
  total: number;
  distribution: Record<number, number>;
}

// Kids Mode — child accounts, reading sessions, quiz, journal, reading paths,
// family challenges. No leaderboard/score field exists anywhere in this
// group by design: rewards are narrative (badge_name) or a single shared
// progress value, never a per-member comparison.
export interface ReadingSession {
  id: string;
  child_id: string;
  book_id: string;
  logged_by_parent: boolean;
  created_at: string;
}

export interface QuizQuestion {
  id: string;
  book_id: string;
  prompt: string;
  choices: string[];
  correct_index: number;
}

export interface QuizAttempt {
  id: string;
  child_id: string;
  book_id: string;
  score: number;
  total: number;
  created_at: string;
}

// text/title/badge_name are intentionally NOT stored here — this is demo
// copy, not real user content, so it must follow the UI language. Display
// strings live in translations.ts (t.kids.journalText/pathText/challengeText),
// keyed by these entities' ids.
export interface JournalEntry {
  id: string;
  child_id: string;
  book_id: string;
  emoji: string | null;
  created_at: string;
}

export interface ReadingPath {
  id: string;
  book_ids: string[];
}

export interface FamilyChallenge {
  id: string;
  goal_minutes: number;
  progress_minutes: number;
}

// Book Club — a library-wide shared reading space (free, no AI required).
// A cycle only ever references a BibliographicRecord; the owned copy used for
// rating is resolved by matching record_id in the books list, mirroring the
// real app's "reuse BookRating on the owned copy" design.
export type BookClubCycleStatus = "reading" | "discussing" | "archived";

export interface BookClubCycle {
  id: string;
  record_id: string;
  title: string;
  status: BookClubCycleStatus;
  reading_start: string | null;
  reading_end: string | null;
  created_by: string;
  created_at: string;
}

export interface BookClubPost {
  id: string;
  cycle_id: string;
  user_id: string;
  body: string;
  parent_post_id: string | null;
  is_spoiler: boolean;
  created_at: string;
}

export interface BookClubProposal {
  id: string;
  record_id: string;
  proposed_by: string;
  note: string | null;
  created_at: string;
}

export interface BookClubVote {
  id: string;
  proposal_id: string;
  user_id: string;
}

export type BookClubParticipantStatus = "joined" | "finished";

export interface BookClubParticipant {
  id: string;
  cycle_id: string;
  user_id: string;
  status: BookClubParticipantStatus;
}

export interface BookClubMeeting {
  id: string;
  cycle_id: string;
  scheduled_at: string;
  note: string | null;
  created_by: string;
}

export interface WishlistItem {
  id: string;
  user_id: string;
  priority: number | null;
  notes: string | null;
  created_at: string;
  record: {
    title: string;
    main_author: string | null;
    isbn: string | null;
    publisher: string | null;
    publication_year: number | null;
    genre: Genre | null;
    cover_url: string | null;
  };
}
