export type ReadingStatus = "to_read" | "reading" | "read";
export type UserRole = "admin" | "editor" | "viewer";
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
