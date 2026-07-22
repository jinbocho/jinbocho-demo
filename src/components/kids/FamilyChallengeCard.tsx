import { useData } from "../../store/DataContext";
import { useLanguage } from "../../i18n";

// Deliberately shows only the one shared progress value — no per-member
// breakdown exists anywhere in the data model, so no future UI change here
// could turn a cooperative challenge into an implicit sibling ranking.
export function FamilyChallengeCard() {
  const { t } = useLanguage();
  const { familyChallenges } = useData();
  const challenge = familyChallenges[0];
  if (!challenge) return null;

  const pct = Math.min(100, Math.round((challenge.progress_minutes / challenge.goal_minutes) * 100));

  return (
    <div className="rounded-lg border border-line bg-surface p-4 shadow-card">
      <h3 className="mb-1 text-sm font-semibold text-ink">{t.kids.challengeTitle}</h3>
      <p className="mb-2 text-sm text-ink">{t.kids.challengeText[challenge.id] ?? ""}</p>
      <div className="h-2 overflow-hidden rounded-full bg-paper">
        <div className="h-full rounded-full bg-sage transition-all" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-2 text-xs text-ink-soft">{t.kids.challengeProgress(challenge.progress_minutes, challenge.goal_minutes)}</p>
      <p className="mt-1 text-xs italic text-ink-soft">{t.kids.challengeNote}</p>
    </div>
  );
}
