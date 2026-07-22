import { PageHeader } from "../../components/ui/PageHeader";
import { ChildReadingCard } from "../../components/kids/ChildReadingCard";
import { FamilyChallengeCard } from "../../components/kids/FamilyChallengeCard";
import { useAuth } from "../../store/AuthContext";
import { useLanguage } from "../../i18n";

export function MyReadingPage() {
  const { t } = useLanguage();
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      <PageHeader title={t.kids.childTitle} description={t.kids.childDescription} />
      <p className="text-xs italic text-ink-soft">{t.kids.independentOfAiNote}</p>
      <ChildReadingCard childId={currentUser.id} />
      <FamilyChallengeCard />
    </div>
  );
}
