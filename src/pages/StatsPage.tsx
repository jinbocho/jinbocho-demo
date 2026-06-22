import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Avatar } from "../components/ui/Avatar";
import { PageHeader } from "../components/ui/PageHeader";
import { useData } from "../store/DataContext";
import { useLanguage } from "../i18n";
import type { Genre } from "../data/types";

export function StatsPage() {
  const { t } = useLanguage();
  const { books, records, users, reads, rooms } = useData();

  const memberStats = useMemo(() => {
    return users.map((user) => {
      const readCount = reads.filter((r) => r.user_id === user.id).length;
      const ownedCount = books.filter((b) => b.owner_id === user.id).length;
      return { user, readCount, ownedCount };
    }).sort((a, b) => b.readCount - a.readCount);
  }, [users, reads, books]);

  const genreStats = useMemo(() => {
    const counts: Partial<Record<Genre, number>> = {};
    books.forEach((ob) => {
      const record = records.find((r) => r.id === ob.record_id);
      if (record?.genre) counts[record.genre] = (counts[record.genre] ?? 0) + 1;
    });
    const total = books.length;
    return Object.entries(counts)
      .sort(([, a], [, b]) => (b ?? 0) - (a ?? 0))
      .map(([genre, count]) => ({ genre: genre as Genre, count: count ?? 0, pct: Math.round(((count ?? 0) / total) * 100) }));
  }, [books, records]);

  const roomStats = useMemo(() => {
    const counts: Record<string, number> = {};
    books.forEach((b) => {
      const key = b.room_id ?? "none";
      counts[key] = (counts[key] ?? 0) + 1;
    });
    const total = books.length;
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .map(([roomId, count]) => ({
        roomId,
        roomName: rooms.find((r) => r.id === roomId)?.name ?? "—",
        count,
        pct: Math.round((count / total) * 100),
      }));
  }, [books, rooms]);

  const topAuthors = useMemo(() => {
    const counts: Record<string, number> = {};
    records.forEach((record) => {
      if (record.main_author) {
        const booksCount = books.filter((b) => b.record_id === record.id).length;
        if (booksCount > 0) counts[record.main_author] = (counts[record.main_author] ?? 0) + booksCount;
      }
    });
    return Object.entries(counts).sort(([, a], [, b]) => b - a).slice(0, 5).map(([author, count]) => ({ author, count }));
  }, [records, books]);

  const goalProgress = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return users
      .filter((u) => u.annual_reading_goal && u.annual_reading_goal > 0)
      .map((u) => ({
        user: u,
        goal: u.annual_reading_goal as number,
        readThisYear: reads.filter((r) => r.user_id === u.id && new Date(r.read_at).getFullYear() === currentYear).length,
      }));
  }, [users, reads]);

  const readBookIds = useMemo(() => new Set(reads.map((r) => r.book_id)), [reads]);
  const unreadByAnyone = useMemo(() => books.filter((b) => !readBookIds.has(b.id)).length, [books, readBookIds]);

  const maxAuthorCount = topAuthors[0]?.count ?? 1;
  const totalRead = reads.length;
  const totalBooks = books.length;

  return (
    <div className="space-y-8">
      <PageHeader title={t.stats.title} description={t.stats.description} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-4">
          <p className="text-xs text-ink-soft mb-1">{t.stats.totalBooks}</p>
          <p className="text-3xl font-display font-semibold text-ink">{totalBooks}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-ink-soft mb-1">{t.stats.registeredReads}</p>
          <p className="text-3xl font-display font-semibold text-sage">{totalRead}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-ink-soft mb-1">{t.stats.distinctGenres}</p>
          <p className="text-3xl font-display font-semibold text-brand">{genreStats.length}</p>
        </Card>
        <Link to="/stats/books?filter=unread">
          <Card className="p-4 transition-colors hover:border-brand/40">
            <p className="text-xs text-ink-soft mb-1">{t.dashboard.unreadTitle}</p>
            <p className="text-3xl font-display font-semibold text-amber">{unreadByAnyone}</p>
          </Card>
        </Link>
      </div>

      {goalProgress.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-ink mb-4">{t.dashboard.readingGoal(new Date().getFullYear())}</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {goalProgress.map(({ user, goal, readThisYear }) => {
              const pct = Math.min(100, Math.round((readThisYear / goal) * 100));
              return (
                <Card key={user.id} className="p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <Avatar name={user.name} color={user.avatar_color} size="sm" />
                    <p className="font-medium text-ink">{user.name}</p>
                  </div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-ink-soft">{readThisYear} / {goal}</span>
                    <span className="text-ink-soft">{pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-paper">
                    <div className={`h-full rounded-full transition-all ${pct >= 100 ? "bg-sage" : "bg-brand"}`} style={{ width: `${pct}%` }} />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-medium text-ink mb-4">{t.stats.familyMembers}</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {memberStats.map(({ user, readCount, ownedCount }) => (
            <Card key={user.id} className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <Avatar name={user.name} color={user.avatar_color} size="lg" />
                <div>
                  <p className="font-medium text-ink">{user.name}</p>
                  <p className="text-xs text-stone capitalize">{t.enums.role[user.role]}</p>
                </div>
              </div>
              <div className="space-y-2">
                <Link to={`/stats/books?filter=read&user=${user.id}`} className="flex justify-between text-sm hover:text-brand">
                  <span className="text-ink-soft">{t.stats.booksRead}</span>
                  <span className="font-semibold text-sage">{readCount}</span>
                </Link>
                <Link to={`/stats/books?filter=owned&user=${user.id}`} className="flex justify-between text-sm hover:text-brand">
                  <span className="text-ink-soft">{t.stats.booksOwned}</span>
                  <span className="font-semibold text-ink">{ownedCount}</span>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-ink mb-4">{t.stats.genreDistribution}</h3>
        <Card className="p-5">
          <div className="space-y-3">
            {genreStats.map(({ genre, count, pct }) => (
              <div key={genre}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-ink font-medium">{t.enums.genre[genre]}</span>
                  <span className="text-ink-soft">{t.stats.genreCount(count, pct)}</span>
                </div>
                <div className="w-full bg-line rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-brand rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-medium text-ink mb-4">{t.stats.byRoom}</h3>
        <Card className="p-5">
          <div className="space-y-3">
            {roomStats.map(({ roomId, roomName, count, pct }) => (
              <div key={roomId}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-ink font-medium">{roomName}</span>
                  <span className="text-ink-soft">{t.stats.roomCount(count, pct)}</span>
                </div>
                <div className="w-full bg-line rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-sage rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div>
        <h3 className="text-lg font-medium text-ink mb-4">{t.stats.topAuthors}</h3>
        <Card className="p-5">
          <div className="space-y-4">
            {topAuthors.map(({ author, count }, idx) => (
              <div key={author} className="flex items-center gap-4">
                <span className="text-2xl font-display text-ink-soft/50 w-6 text-center shrink-0">{idx + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-ink truncate">{author}</span>
                    <span className="text-ink-soft ml-2 shrink-0">{t.stats.authorCount(count)}</span>
                  </div>
                  <div className="w-full bg-line rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-sage rounded-full transition-all duration-500" style={{ width: `${Math.round((count / maxAuthorCount) * 100)}%` }} />
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
