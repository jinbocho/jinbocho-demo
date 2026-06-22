import { useState } from "react";
import { useData, findDuplicateRecord, type RecordDraft, type BookDraft, type DuplicateReason } from "./DataContext";
import type { BibliographicRecord, OwnedBook } from "../data/types";

export function useAddBookWithDuplicateCheck() {
  const { records, addRecordAndBook } = useData();
  const [conflict, setConflict] = useState<{ record: BibliographicRecord; reason: DuplicateReason } | null>(null);
  const [pending, setPending] = useState<{ record: RecordDraft; book: BookDraft } | null>(null);

  function submit(record: RecordDraft, book: BookDraft): OwnedBook | null {
    const match = findDuplicateRecord(records, { isbn: record.isbn, title: record.title, main_author: record.main_author });
    if (match) {
      setConflict(match);
      setPending({ record, book });
      return null;
    }
    return addRecordAndBook(record, book, false);
  }

  function confirmDuplicate(): OwnedBook | null {
    if (!pending) return null;
    const created = addRecordAndBook(pending.record, pending.book, true);
    setConflict(null);
    setPending(null);
    return created;
  }

  function cancelDuplicate() {
    setConflict(null);
    setPending(null);
  }

  return { conflict, submit, confirmDuplicate, cancelDuplicate };
}
