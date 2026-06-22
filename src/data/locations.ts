import type { Room, Bookcase, Section, Shelf } from "./types";

export const ROOMS: Room[] = [
  { id: "r1", name: "Soggiorno", description: "Il salotto principale con la grande libreria" },
  { id: "r2", name: "Studio", description: "Lo studio con libri tecnici e di storia" },
  { id: "r3", name: "Camera da letto", description: "La camera con il comodino" },
];

export const BOOKCASES: Bookcase[] = [
  { id: "bc1", room_id: "r1", name: "Grande Libreria", description: "Libreria in legno scuro, 3 ripiani per sezione" },
  { id: "bc2", room_id: "r1", name: "Scaffale Basso", description: "Scaffale basso vicino alla finestra" },
  { id: "bc3", room_id: "r2", name: "Libreria Studio", description: "Libreria moderna in metallo e vetro" },
  { id: "bc4", room_id: "r3", name: "Comodino", description: "Piccolo comodino con spazio per i libri correnti" },
];

export const SECTIONS: Section[] = [
  // bc1 - Grande Libreria (3 sezioni)
  { id: "s1", bookcase_id: "bc1", section_index: 1, label: "Narrativa italiana" },
  { id: "s2", bookcase_id: "bc1", section_index: 2, label: "Narrativa straniera" },
  { id: "s3", bookcase_id: "bc1", section_index: 3, label: "Saggistica" },
  // bc2 - Scaffale Basso (1 sezione)
  { id: "s4", bookcase_id: "bc2", section_index: 1, label: "Fantasy e Fantascienza" },
  // bc3 - Libreria Studio (2 sezioni)
  { id: "s5", bookcase_id: "bc3", section_index: 1, label: "Tecnica" },
  { id: "s6", bookcase_id: "bc3", section_index: 2, label: "Storia e Filosofia" },
  // bc4 - Comodino (1 sezione)
  { id: "s7", bookcase_id: "bc4", section_index: 1, label: "Letture correnti" },
];

export const SHELVES: Shelf[] = [
  // s1 - Narrativa italiana (3 scaffali)
  { id: "sh1", section_id: "s1", shelf_index: 1, notes: null },
  { id: "sh2", section_id: "s1", shelf_index: 2, notes: null },
  { id: "sh3", section_id: "s1", shelf_index: 3, notes: null },
  // s2 - Narrativa straniera (3 scaffali)
  { id: "sh4", section_id: "s2", shelf_index: 1, notes: null },
  { id: "sh5", section_id: "s2", shelf_index: 2, notes: null },
  { id: "sh6", section_id: "s2", shelf_index: 3, notes: null },
  // s3 - Saggistica (2 scaffali)
  { id: "sh7", section_id: "s3", shelf_index: 1, notes: null },
  { id: "sh8", section_id: "s3", shelf_index: 2, notes: null },
  // s4 - Fantasy (3 scaffali)
  { id: "sh9", section_id: "s4", shelf_index: 1, notes: null },
  { id: "sh10", section_id: "s4", shelf_index: 2, notes: null },
  { id: "sh11", section_id: "s4", shelf_index: 3, notes: null },
  // s5 - Tecnica (2 scaffali)
  { id: "sh12", section_id: "s5", shelf_index: 1, notes: null },
  { id: "sh13", section_id: "s5", shelf_index: 2, notes: null },
  // s6 - Storia e Filosofia (2 scaffali)
  { id: "sh14", section_id: "s6", shelf_index: 1, notes: null },
  { id: "sh15", section_id: "s6", shelf_index: 2, notes: null },
  // s7 - Letture correnti (2 scaffali)
  { id: "sh16", section_id: "s7", shelf_index: 1, notes: null },
  { id: "sh17", section_id: "s7", shelf_index: 2, notes: null },
];
