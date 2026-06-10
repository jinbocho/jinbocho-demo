import { useMemo } from "react";
import { Card } from "../components/ui/Card";
import { Avatar } from "../components/ui/Avatar";
import { PageHeader } from "../components/ui/PageHeader";
import { OWNED_BOOKS, RECORDS } from "../data/books";
import { USERS } from "../data/users";
import { READS } from "../data/reads";

export function StatsPage() {
  const memberStats = useMemo(() => {
    return USERS.map((user) => {
      const readCount = READS.filter((r) => r.user_id === user.id).length;
      const ownedCount = OWNED_BOOKS.filter((b) => b.owner_id === user.id).length;
      return { user, readCount, ownedCount };
    }).sort((a, b) => b.readCount - a.readCount);
  }, []);

  const genreStats = useMemo(() => {
    const counts: Record<string, number> = {};
    OWNED_BOOKS.forEach((ob) => {
      const record = RECORDS.find((r) => r.id === ob.record_id);
      if (record?.genre) {
        counts[record.genre] = (counts[record.genre] ?? 0) + 1;
      }
    });
    const total = OWNED_BOOKS.length;
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .map(([genre, count]) => ({
        genre,
        count,
        pct: Math.round((count / total) * 100),
      }));
  }, []);

  const topAuthors = useMemo(() => {
    const counts: Record<string, number> = {};
    RECORDS.forEach((record) => {
      if (record.main_author) {
        const booksCount = OWNED_BOOKS.filter((b) => b.record_id === record.id).length;
        if (booksCount > 0) {
          counts[record.main_author] = (counts[record.main_author] ?? 0) + booksCount;
        }
      }
    });
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([author, count]) => ({ author, count }));
  }, []);

  const maxAuthorCount = topAuthors[0]?.count ?? 1;

  const totalRead = READS.length;
  const totalBooks = OWNED_BOOKS.length;

  return (
    <div className="space-y-8">
      <PageHeader title="Statistiche" description="Panoramica della biblioteca di famiglia" />

      {/* Global stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <Card className="p-4">
          <p className="text-xs text-ink-soft mb-1">Libri totali</p>
          <p className="text-3xl font-display font-semibold text-ink">{totalBooks}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-ink-soft mb-1">Letture registrate</p>
          <p className="text-3xl font-display font-semibold text-sage">{totalRead}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-ink-soft mb-1">Generi diversi</p>
          <p className="text-3xl font-display font-semibold text-brand">{genreStats.length}</p>
        </Card>
      </div>

      {/* Per member */}
      <div>
        <h3 className="text-lg font-medium text-ink mb-4">Membri della famiglia</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {memberStats.map(({ user, readCount, ownedCount }) => (
            <Card key={user.id} className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <Avatar name={user.name} color={user.avatar_color} size="lg" />
                <div>
                  <p className="font-medium text-ink">{user.name}</p>
                  <p className="text-xs text-stone capitalize">{user.role}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-ink-soft">Libri letti</span>
                  <span className="font-semibold text-sage">{readCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ink-soft">Libri posseduti</span>
                  <span className="font-semibold text-ink">{ownedCount}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Genre distribution */}
      <div>
        <h3 className="text-lg font-medium text-ink mb-4">Distribuzione per genere</h3>
        <Card className="p-5">
          <div className="space-y-3">
            {genreStats.map(({ genre, count, pct }) => (
              <div key={genre}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-ink font-medium">{genre}</span>
                  <span className="text-ink-soft">
                    {count} libr{count === 1 ? "o" : "i"} · {pct}%
                  </span>
                </div>
                <div className="w-full bg-line rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-brand rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top authors */}
      <div>
        <h3 className="text-lg font-medium text-ink mb-4">Autori più presenti in biblioteca</h3>
        <Card className="p-5">
          <div className="space-y-4">
            {topAuthors.map(({ author, count }, idx) => (
              <div key={author} className="flex items-center gap-4">
                <span className="text-2xl font-display text-ink-soft/50 w-6 text-center shrink-0">
                  {idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-ink truncate">{author}</span>
                    <span className="text-ink-soft ml-2 shrink-0">
                      {count} libr{count === 1 ? "o" : "i"}
                    </span>
                  </div>
                  <div className="w-full bg-line rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-sage rounded-full transition-all duration-500"
                      style={{ width: `${Math.round((count / maxAuthorCount) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
