import { Avatar } from "../../components/ui/Avatar";
import { PageHeader } from "../../components/ui/PageHeader";
import { ChildReadingCard } from "../../components/kids/ChildReadingCard";
import { FamilyChallengeCard } from "../../components/kids/FamilyChallengeCard";
import { useData } from "../../store/DataContext";
import { useLanguage } from "../../i18n";

export function ParentKidsDashboardPage() {
  const { t } = useLanguage();
  const { users } = useData();
  const children = users.filter((u) => u.role === "child");

  return (
    <div className="space-y-6">
      <PageHeader title={t.kids.parentTitle} description={t.kids.parentDescription} />
      <p className="text-xs italic text-ink-soft">{t.kids.independentOfAiNote}</p>

      <FamilyChallengeCard />

      {children.map((child) => (
        <div key={child.id} className="space-y-3">
          <div className="flex items-center gap-2">
            <Avatar name={child.name} color={child.avatar_color} size="sm" />
            <span className="font-display text-lg font-semibold text-ink">{child.name}</span>
          </div>
          <ChildReadingCard childId={child.id} />
        </div>
      ))}

      <a
        href="https://jinbocho.github.io/manuals/philosophy/kids-mode/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-sm text-brand hover:underline"
      >
        {t.kids.philosophyLink}
      </a>
    </div>
  );
}
