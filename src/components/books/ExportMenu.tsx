import { useState } from "react";
import { useData } from "../../store/DataContext";
import { useLanguage } from "../../i18n";
import { Button } from "../ui/Button";

interface ExportMenuProps {
  disabled?: boolean;
  // "right" anchors the menu's right edge to the trigger; "left" anchors the
  // left edge instead, so the menu doesn't spill past the screen edge when
  // the trigger sits at the left end of a row.
  align?: "left" | "right";
}

function downloadBlob(content: string, mime: string, filename: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function ExportMenu({ disabled, align = "right" }: ExportMenuProps) {
  const { t } = useLanguage();
  const { books, records } = useData();
  const [open, setOpen] = useState(false);

  function buildRows() {
    return books.map((b) => {
      const r = records.find((rec) => rec.id === b.record_id);
      return {
        title: r?.title ?? "",
        author: r?.main_author ?? "",
        isbn: r?.isbn ?? "",
        publisher: r?.publisher ?? "",
        year: r?.publication_year ?? "",
        genre: r?.genre ?? "",
        status: b.reading_status,
      };
    });
  }

  function exportCsv() {
    const rows = buildRows();
    const header = "title,author,isbn,publisher,year,genre,status";
    const csv = [
      header,
      ...rows.map((r) =>
        [r.title, r.author, r.isbn, r.publisher, r.year, r.genre, r.status]
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(","),
      ),
    ].join("\n");
    downloadBlob(csv, "text/csv;charset=utf-8", "jinbocho-books.csv");
    setOpen(false);
  }

  function exportJson() {
    downloadBlob(JSON.stringify(buildRows(), null, 2), "application/json", "jinbocho-books.json");
    setOpen(false);
  }

  return (
    <div className="relative">
      <Button variant="secondary" size="sm" disabled={disabled} onClick={() => setOpen((o) => !o)}>
        {t.export.button}
      </Button>
      {open && (
        <div
          className={`absolute z-20 mt-1 w-32 overflow-hidden rounded-md border border-line bg-surface shadow-card ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          <button onClick={exportCsv} className="block w-full px-3 py-2 text-left text-sm text-ink hover:bg-paper">{t.export.csv}</button>
          <button onClick={exportJson} className="block w-full px-3 py-2 text-left text-sm text-ink hover:bg-paper">{t.export.json}</button>
        </div>
      )}
    </div>
  );
}
