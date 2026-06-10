export type ReadingStatus = "to_read" | "reading" | "read";
export type UserRole = "admin" | "editor" | "viewer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar_color: string;
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
}
export interface BibliographicRecord {
  id: string;
  title: string;
  main_author: string | null;
  isbn: string | null;
  publisher: string | null;
  publication_year: number | null;
  genre: string | null;
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
  purchase_year: number | null;
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
