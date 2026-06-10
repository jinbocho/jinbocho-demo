export function DemoBanner() {
  return (
    <div className="sticky top-0 z-50 bg-amber/10 border-b border-amber/30 px-4 py-2">
      <p className="text-center text-xs text-amber leading-tight font-medium">
        ⚠️ Demo interattiva — tutti i dati sono simulati.{" "}
        <a
          href="https://github.com/jinbocho"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-brand transition-colors"
        >
          Scopri il progetto reale su GitHub →
        </a>
      </p>
    </div>
  );
}
