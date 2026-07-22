import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Archive, CalendarPlus, Check, Lock, MessagesSquare, RotateCcw, Sparkles, Trash2, Undo2, Users,
} from "lucide-react";
import { Avatar } from "../../components/ui/Avatar";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Checkbox } from "../../components/ui/Checkbox";
import { Input } from "../../components/ui/Input";
import { BookCover } from "../../components/ui/BookCover";
import { PageHeader } from "../../components/ui/PageHeader";
import { useData } from "../../store/DataContext";
import { useAuth } from "../../store/AuthContext";
import { useLanguage } from "../../i18n";
import { ratingSummaryForRecord, STATUS_TONE } from "./helpers";
import type { BookClubParticipant, BookClubPost, User } from "../../data/types";

function SectionTitle({ icon, children }: { icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand">
      {icon}{children}
    </h2>
  );
}

function ParticipantChip({ participant, user, isMe }: { participant: BookClubParticipant; user: User | undefined; isMe: boolean }) {
  const { t } = useLanguage();
  const name = isMe ? t.common.you : user?.name ?? "?";
  const finished = participant.status === "finished";
  return (
    <div className="flex items-center gap-2 rounded-full border border-line bg-surface py-1 pl-1 pr-3" title={finished ? t.bookClub.finishedLabel : undefined}>
      <div className="relative">
        <Avatar name={name} color={user?.avatar_color ?? "#8c8c8c"} size="sm" className="h-7 w-7 text-xs" />
        {finished && (
          <span className="absolute -bottom-0.5 -right-0.5 grid h-3.5 w-3.5 place-items-center rounded-full bg-sage text-white">
            <Check size={9} strokeWidth={3} />
          </span>
        )}
      </div>
      <span className="text-xs text-ink">{name}</span>
    </div>
  );
}

function PostItem({ post, user, isMe, canDelete, onDelete }: {
  post: BookClubPost; user: User | undefined; isMe: boolean; canDelete: boolean; onDelete: () => void;
}) {
  const { t } = useLanguage();
  const [revealed, setRevealed] = useState(false);
  const hidden = post.is_spoiler && !revealed;
  const name = isMe ? t.common.you : user?.name ?? "—";

  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <Avatar name={name} color={user?.avatar_color ?? "#8c8c8c"} size="sm" />
        <p className="min-w-0 flex-1 truncate text-sm font-medium text-ink">{name}</p>
        {post.is_spoiler && !hidden && (
          <span className="rounded-full border border-amber/30 bg-amber/10 px-2 py-0.5 text-xs font-medium text-amber">{t.bookClub.spoilerBadge}</span>
        )}
        {canDelete && (
          <button type="button" onClick={onDelete} aria-label={t.common.delete} className="shrink-0 rounded-md p-1 text-ink-soft hover:bg-surface-muted hover:text-danger">
            <Trash2 size={14} />
          </button>
        )}
      </div>
      {hidden ? (
        <button type="button" onClick={() => setRevealed(true)} className="mt-2 pl-11 text-sm italic text-brand">
          {t.bookClub.revealSpoilerButton}
        </button>
      ) : (
        <p className="mt-2 whitespace-pre-wrap pl-11 text-sm text-ink-soft">{post.body}</p>
      )}
    </Card>
  );
}

export function CycleDetailPage() {
  const { t, lang } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const { currentUser, hasRole } = useAuth();
  const {
    bookClubCycles, bookClubPosts, bookClubParticipants, bookClubMeetings, records, books, ratings, users,
    moveCycleToDiscussion, undoMoveToDiscussion, archiveCycle, reopenCycle,
    addBookClubPost, deleteBookClubPost, joinBookClubCycle, setBookClubParticipantStatus,
    scheduleBookClubMeeting, deleteBookClubMeeting,
  } = useData();

  const isManager = hasRole("admin", "editor");
  const isAdmin = hasRole("admin");

  const cycle = bookClubCycles.find((c) => c.id === id);
  const record = cycle ? records.find((r) => r.id === cycle.record_id) : undefined;
  const posts = bookClubPosts.filter((p) => p.cycle_id === id);
  const participants = bookClubParticipants.filter((p) => p.cycle_id === id);
  const meetings = bookClubMeetings.filter((m) => m.cycle_id === id).slice().sort((a, b) => a.scheduled_at.localeCompare(b.scheduled_at));
  const userById = useMemo(() => new Map(users.map((u) => [u.id, u])), [users]);
  const rating = cycle ? ratingSummaryForRecord(books, ratings, cycle.record_id) : { average: null, total: 0 };

  const [body, setBody] = useState("");
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [showPrompts, setShowPrompts] = useState(false);
  const [promptsLoading, setPromptsLoading] = useState(false);
  const [prompts, setPrompts] = useState<string[] | null>(null);
  const [meetingAt, setMeetingAt] = useState("");
  const [meetingNote, setMeetingNote] = useState("");

  if (!cycle) {
    return (
      <div className="mx-auto max-w-3xl">
        <Link to="/book-club" className="mb-4 inline-block text-sm text-brand hover:underline">← {t.bookClub.backLink}</Link>
        <p className="text-sm text-ink-soft">—</p>
      </div>
    );
  }

  const isArchived = cycle.status === "archived";
  const isDiscussing = cycle.status === "discussing";
  const myParticipation = participants.find((p) => p.user_id === currentUser?.id);

  function generatePrompts() {
    setShowPrompts(true);
    if (prompts) return;
    setPromptsLoading(true);
    setTimeout(() => {
      const title = record?.title ?? "";
      setPrompts(t.bookClub.aiPromptTemplates.map((tpl) => tpl.replace(/\{title\}/g, title)));
      setPromptsLoading(false);
    }, 900);
  }

  function submitPost() {
    if (!body.trim() || !currentUser) return;
    addBookClubPost(cycle!.id, currentUser.id, body.trim(), isSpoiler, null);
    setBody("");
    setIsSpoiler(false);
  }

  function submitMeeting() {
    if (!meetingAt || !currentUser) return;
    scheduleBookClubMeeting(cycle!.id, new Date(meetingAt).toISOString(), meetingNote.trim() || null, currentUser.id);
    setMeetingAt("");
    setMeetingNote("");
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/book-club" className="mb-4 inline-flex items-center gap-1 text-sm text-brand hover:underline">← {t.bookClub.backLink}</Link>

      <PageHeader
        title={cycle.title}
        actions={
          isManager ? (
            <div className="flex flex-wrap gap-2">
              {cycle.status === "reading" && (
                <Button variant="secondary" onClick={() => moveCycleToDiscussion(cycle.id)}>
                  <MessagesSquare size={16} /> {t.bookClub.moveToDiscussionButton}
                </Button>
              )}
              {isDiscussing && (
                <>
                  <Button variant="ghost" size="sm" onClick={() => undoMoveToDiscussion(cycle.id)}>
                    <Undo2 size={16} /> {t.bookClub.undoMoveToDiscussionButton}
                  </Button>
                  <Button variant="secondary" onClick={() => archiveCycle(cycle.id)}>
                    <Archive size={16} /> {t.bookClub.archiveButton}
                  </Button>
                </>
              )}
              {isArchived && (
                <Button variant="secondary" onClick={() => reopenCycle(cycle.id)}>
                  <RotateCcw size={16} /> {t.bookClub.reopenButton}
                </Button>
              )}
            </div>
          ) : undefined
        }
      />

      {isArchived && (
        <div className="mb-6 rounded-md bg-line/50 px-4 py-2 text-sm text-ink-soft">
          {t.bookClub.archivedNotice}{isManager ? ` ${t.bookClub.archivedReopenHint}` : ""}
        </div>
      )}

      <Card className="mb-8 flex gap-4 p-4">
        <BookCover url={record?.cover_url} title={record?.title} className="h-24 w-16 shrink-0" />
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="font-display text-lg font-medium text-ink">{record?.title ?? "—"}</p>
          <p className="text-sm text-ink-soft">{record?.main_author}</p>
          <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_TONE[cycle.status]}`}>
              {{ reading: t.bookClub.statusReading, discussing: t.bookClub.statusDiscussing, archived: t.bookClub.statusArchived }[cycle.status]}
            </span>
            {rating.average != null && <span className="text-xs text-ink-soft">{t.bookClub.ratingLabel(rating.average, rating.total)}</span>}
          </div>
        </div>
      </Card>

      <section className="mb-8 space-y-3">
        <SectionTitle icon={<Users size={14} />}>{t.bookClub.participantsTitle}</SectionTitle>
        <Card className="p-4">
          <div className="flex flex-wrap items-center gap-2">
            {participants.length === 0 ? (
              <p className="text-sm text-ink-soft">{t.bookClub.noParticipants}</p>
            ) : (
              participants.map((p) => <ParticipantChip key={p.id} participant={p} user={userById.get(p.user_id)} isMe={p.user_id === currentUser?.id} />)
            )}
          </div>
          {!isArchived && currentUser && (
            <div className="mt-3 flex justify-end border-t border-line pt-3">
              {!myParticipation ? (
                <Button size="sm" onClick={() => joinBookClubCycle(cycle.id, currentUser.id)}>{t.bookClub.joinButton}</Button>
              ) : myParticipation.status === "joined" ? (
                <Button size="sm" variant="secondary" onClick={() => setBookClubParticipantStatus(cycle.id, currentUser.id, "finished")}>
                  <Check size={14} /> {t.bookClub.markFinishedButton}
                </Button>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-sage"><Check size={14} /> {t.bookClub.finishedLabel}</span>
              )}
            </div>
          )}
        </Card>
      </section>

      <section className="mb-8 space-y-3">
        <SectionTitle icon={<Sparkles size={14} />}>{t.bookClub.aiPromptsTitle}</SectionTitle>
        {!showPrompts ? (
          <Button variant="secondary" size="sm" onClick={generatePrompts}>{t.bookClub.showPromptsButton}</Button>
        ) : promptsLoading ? (
          <div>
            <p className="mb-2 text-sm text-ink-soft">{t.bookClub.promptsLoading}</p>
            <div role="progressbar" aria-label={t.bookClub.promptsLoading} className="h-1.5 overflow-hidden rounded-full bg-brand/15">
              <div className="h-full w-1/3 animate-pulse rounded-full bg-brand" />
            </div>
          </div>
        ) : prompts && prompts.length > 0 ? (
          <Card className="p-4">
            <ul className="list-disc space-y-2 pl-5 text-sm text-ink-soft">
              {prompts.map((q, idx) => <li key={idx}>{q}</li>)}
            </ul>
          </Card>
        ) : (
          <p className="text-sm text-ink-soft">{t.bookClub.noPrompts}</p>
        )}
      </section>

      <section className="mb-8 space-y-3">
        <SectionTitle icon={<CalendarPlus size={14} />}>{t.bookClub.meetingsTitle}</SectionTitle>
        {meetings.length === 0 ? (
          <p className="text-sm text-ink-soft">{t.bookClub.noMeetings}</p>
        ) : (
          <div className="space-y-2">
            {meetings.map((m) => (
              <Card key={m.id} className="flex items-center gap-3 p-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-ink">{new Date(m.scheduled_at).toLocaleString(lang)}</p>
                  {m.note && <p className="truncate text-xs text-ink-soft">{m.note}</p>}
                </div>
                {isManager && (
                  <button type="button" onClick={() => deleteBookClubMeeting(m.id)} aria-label={t.common.delete} className="shrink-0 rounded-md p-1.5 text-ink-soft hover:bg-surface-muted hover:text-danger">
                    <Trash2 size={14} />
                  </button>
                )}
              </Card>
            ))}
          </div>
        )}
        {isManager && !isArchived && (
          <Card className="grid gap-3 p-4 sm:grid-cols-[auto_1fr_auto] sm:items-end">
            <div>
              <label className="mb-1 block text-sm font-medium text-ink-soft">{t.bookClub.meetingWhenLabel}</label>
              <input
                type="datetime-local"
                value={meetingAt}
                onChange={(e) => setMeetingAt(e.target.value)}
                className="h-9 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40 sm:w-auto"
              />
            </div>
            <Input label={t.bookClub.meetingNoteLabel} value={meetingNote} onChange={(e) => setMeetingNote(e.target.value)} placeholder={t.bookClub.meetingNotePlaceholder} />
            <Button disabled={!meetingAt} onClick={submitMeeting} className="w-full sm:w-auto">{t.bookClub.scheduleButton}</Button>
          </Card>
        )}
      </section>

      <section className="space-y-4">
        <SectionTitle icon={<MessagesSquare size={14} />}>{t.bookClub.discussionTitle}</SectionTitle>

        {isDiscussing ? (
          <Card className="space-y-3 p-4">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={3}
              maxLength={8000}
              placeholder={t.bookClub.writePlaceholder}
              className="w-full resize-y rounded-lg border border-line bg-surface p-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Checkbox label={t.bookClub.spoilerLabel} checked={isSpoiler} onChange={(e) => setIsSpoiler(e.target.checked)} />
              <Button onClick={submitPost} disabled={!body.trim()} className="w-full sm:w-auto">{t.bookClub.postButton}</Button>
            </div>
          </Card>
        ) : (
          <Card className="flex items-center gap-3 border-dashed p-4 text-sm text-ink-soft">
            <Lock size={16} className="shrink-0 text-stone" />
            {isArchived ? t.bookClub.discussionLockedArchived : t.bookClub.discussionLocked}
          </Card>
        )}

        {posts.length === 0 ? (
          <p className="text-sm text-ink-soft">{t.bookClub.noPosts}</p>
        ) : (
          <div className="space-y-3">
            {posts.map((p) => (
              <PostItem
                key={p.id}
                post={p}
                user={userById.get(p.user_id)}
                isMe={p.user_id === currentUser?.id}
                canDelete={p.user_id === currentUser?.id || isAdmin}
                onDelete={() => deleteBookClubPost(p.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
