import type { BookHistory, Incipit } from "./types";

export const INCIPITS: Incipit[] = [
  {
    record_id: "rec1",
    text: "Stamattina mi ha telefonato Rino, credevo per darmi ancora notizie del figlio, invece voleva parlarmi della madre.",
    source: "editorial",
  },
  {
    record_id: "rec8",
    text: "Era una luminosa, fredda giornata d'aprile e gli orologi segnavano le tredici.",
    source: "editorial",
  },
  {
    record_id: "rec9",
    text: "Molti anni dopo, di fronte al plotone di esecuzione, il colonnello Aureliano Buendía si sarebbe ricordato di quel remoto pomeriggio in cui suo padre lo portò a conoscere il ghiaccio.",
    source: "editorial",
  },
  {
    record_id: "rec22",
    text: "Quando il signor Bilbo Baggins, di Casa Baggins, annunciò che a breve avrebbe festeggiato il suo centoundicesimo compleanno con una festa di particolare magnificenza, a Hobbiville si fece un gran parlare.",
    source: "manual",
  },
  {
    record_id: "rec21",
    text: "Quando avevo sei anni vidi una volta una magnifica immagine in un libro sulla Foresta Vergine.",
    source: "ai",
  },
];

export const BOOK_HISTORY: BookHistory[] = [
  { id: "h1", book_id: "b1", event_type: "created", description: "Libro aggiunto alla libreria", created_at: "2015-03-01T10:00:00Z" },
  { id: "h2", book_id: "b1", event_type: "status_changed", description: "Stato aggiornato a Letto", created_at: "2015-03-12T18:30:00Z" },
  { id: "h3", book_id: "b2", event_type: "created", description: "Libro aggiunto alla libreria", created_at: "2010-07-10T09:00:00Z" },
  { id: "h4", book_id: "b2", event_type: "loaned", description: "Prestato a Marco Ricci", created_at: "2026-05-20T12:00:00Z" },
  { id: "h5", book_id: "b9", event_type: "created", description: "Libro aggiunto alla libreria", created_at: "2014-04-01T09:00:00Z" },
  { id: "h6", book_id: "b9", event_type: "loaned", description: "Prestato a Giulia Ferraro", created_at: "2026-06-01T12:00:00Z" },
  { id: "h7", book_id: "b23", event_type: "status_changed", description: "Stato aggiornato a In lettura", created_at: "2024-01-05T08:00:00Z" },
  { id: "h8", book_id: "b18", event_type: "moved", description: "Spostato in Storia e Filosofia, Ripiano 1", created_at: "2021-02-15T11:00:00Z" },
];
