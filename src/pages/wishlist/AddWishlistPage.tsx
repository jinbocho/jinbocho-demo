import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { PageHeader } from "../../components/ui/PageHeader";
import { Select } from "../../components/ui/Select";
import { Textarea } from "../../components/ui/Textarea";
import { useData } from "../../store/DataContext";
import { useAuth } from "../../store/AuthContext";
import { useToast } from "../../store/ToastContext";
import { useLanguage } from "../../i18n";
import { lookupIsbn, searchBooks, type IsbnLookupResult } from "../../store/isbnFixtures";
import type { WishlistItem } from "../../data/types";

type Tab = "type" | "search";

interface WishlistDraft {
  title: string;
  main_author: string;
  isbn: string;
  publisher: string | null;
  publication_year: number | null;
  genre: WishlistItem["record"]["genre"];
  cover_url: string | null;
}

const EMPTY_DRAFT: WishlistDraft = {
  title: "", main_author: "", isbn: "", publisher: null, publication_year: null, genre: null, cover_url: null,
};

export function AddWishlistPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const toast = useToast();
  const { currentUser } = useAuth();
  const { addWishlistItem } = useData();

  const [tab, setTab] = useState<Tab>("type");
  const [isbnInput, setIsbnInput] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchResults, setSearchResults] = useState<IsbnLookupResult[] | null>(null);
  const [searchMissing, setSearchMissing] = useState(false);

  const [draft, setDraft] = useState<WishlistDraft | null>(null);
  const [priority, setPriority] = useState("");
  const [notes, setNotes] = useState("");

  function applyResult(result: IsbnLookupResult) {
    setDraft({
      title: result.title, main_author: result.main_author ?? "", isbn: result.isbn,
      publisher: result.publisher, publication_year: result.publication_year, genre: result.genre, cover_url: result.cover_url,
    });
  }

  function handleLookup(e: FormEvent) {
    e.preventDefault();
    setNotFound(false);
    const result = lookupIsbn(isbnInput);
    if (!result) {
      setNotFound(true);
      return;
    }
    applyResult(result);
  }

  function runSearch(e: FormEvent) {
    e.preventDefault();
    if (!searchTitle.trim() && !searchAuthor.trim()) {
      setSearchMissing(true);
      setSearchResults(null);
      return;
    }
    setSearchMissing(false);
    setSearchResults(searchBooks(searchTitle, searchAuthor));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!draft || !draft.title.trim() || !currentUser) return;
    addWishlistItem(
      currentUser.id,
      {
        title: draft.title.trim(),
        main_author: draft.main_author.trim() || null,
        isbn: draft.isbn.trim() || null,
        publisher: draft.publisher,
        publication_year: draft.publication_year,
        genre: draft.genre,
        cover_url: draft.cover_url,
      },
      priority ? Number(priority) : null,
      notes.trim() || null,
    );
    toast.success(t.wishlist.addSuccess);
    navigate("/wishlist");
  }

  return (
    <>
      <Link to="/wishlist" className="mb-4 inline-block text-sm text-brand hover:underline">
        {t.wishlist.backLink}
      </Link>

      <PageHeader title={t.wishlist.addPageTitle} description={t.wishlist.addPageSubtitle} />

      {!draft ? (
        <Card className="max-w-lg space-y-4 p-5">
          <div className="mb-2 flex gap-2 border-b border-line">
            <button
              onClick={() => setTab("type")}
              className={`px-3 py-2 text-sm font-medium transition-colors ${tab === "type" ? "border-b-2 border-brand text-brand" : "text-ink-soft hover:text-ink"}`}
            >
              {t.books.add.typeTab}
            </button>
            <button
              onClick={() => setTab("search")}
              className={`px-3 py-2 text-sm font-medium transition-colors ${tab === "search" ? "border-b-2 border-brand text-brand" : "text-ink-soft hover:text-ink"}`}
            >
              {t.books.add.searchTab}
            </button>
          </div>

          {tab === "type" ? (
            <form onSubmit={handleLookup} className="space-y-3">
              <Input label={t.books.add.isbnLabel} value={isbnInput} onChange={(e) => setIsbnInput(e.target.value)} placeholder="978..." />
              {notFound && <p className="text-sm text-amber">{t.books.add.notFoundMessage}</p>}
              <Button type="submit">{t.books.add.lookupButton}</Button>
            </form>
          ) : (
            <div className="space-y-3">
              <form onSubmit={runSearch} className="space-y-3">
                <Input label={t.books.add.searchTitleLabel} placeholder={t.books.add.searchTitlePlaceholder} value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} />
                <Input label={t.books.add.searchAuthorLabel} placeholder={t.books.add.searchAuthorPlaceholder} value={searchAuthor} onChange={(e) => setSearchAuthor(e.target.value)} />
                <Button type="submit">{t.books.add.searchButton}</Button>
              </form>

              {searchMissing && <p className="text-sm text-amber">{t.books.add.searchMissingQuery}</p>}
              {searchResults && searchResults.length === 0 && <p className="text-sm text-ink-soft">{t.books.add.searchNoResults}</p>}
              {searchResults && searchResults.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-ink-soft">{t.books.add.searchResultsHint}</p>
                  <ul className="divide-y divide-line rounded-md border border-line">
                    {searchResults.map((result) => (
                      <li key={result.isbn} className="flex items-center justify-between gap-3 p-3">
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-ink">{result.title}</p>
                          <p className="truncate text-sm text-ink-soft">
                            {[result.main_author, result.publication_year].filter(Boolean).join(" · ")}
                          </p>
                        </div>
                        <Button type="button" size="sm" variant="secondary" onClick={() => applyResult(result)}>
                          {t.books.add.searchSelect}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <button onClick={() => setDraft({ ...EMPTY_DRAFT })} className="text-xs text-ink-soft hover:text-brand">
            {t.books.add.manualEntryButton}
          </button>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
          <Card className="space-y-3 p-5">
            <h2 className="font-display text-base font-semibold text-ink">{t.books.add.formTitle}</h2>
            <Input label={t.books.add.titleLabel} value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} required />
            <div className="grid grid-cols-2 gap-3">
              <Input label={t.wishlist.authorLabel} value={draft.main_author} onChange={(e) => setDraft({ ...draft, main_author: e.target.value })} />
              <Input label={t.books.add.isbnFieldLabel} value={draft.isbn} onChange={(e) => setDraft({ ...draft, isbn: e.target.value })} />
            </div>
          </Card>

          <Card className="space-y-3 p-5">
            <h2 className="font-display text-base font-semibold text-ink">{t.wishlist.wishlistDetails}</h2>
            <Select
              label={t.wishlist.priorityLabel}
              placeholder={t.wishlist.priorityNone}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              options={[
                { value: "1", label: t.wishlist.priorityHigh },
                { value: "2", label: t.wishlist.priorityMedium },
                { value: "3", label: t.wishlist.priorityLow },
              ]}
            />
            <Textarea label={t.wishlist.notesLabel} placeholder={t.wishlist.notesPlaceholder} rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </Card>

          <div className="flex gap-2">
            <Button type="submit">{t.wishlist.addButton}</Button>
            <Button type="button" variant="secondary" onClick={() => setDraft(null)}>{t.common.back}</Button>
          </div>
        </form>
      )}
    </>
  );
}
