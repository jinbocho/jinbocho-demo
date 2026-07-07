import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar } from "../../components/ui/Avatar";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { PageHeader } from "../../components/ui/PageHeader";
import { Input } from "../../components/ui/Input";
import { useData } from "../../store/DataContext";
import { useAuth } from "../../store/AuthContext";
import { useToast } from "../../store/ToastContext";
import { useLanguage } from "../../i18n";

export function MemberProfilePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { currentUser } = useAuth();
  const isOwnProfile = Boolean(userId) && userId === currentUser?.id;

  return (
    <div>
      <PageHeader
        title={t.memberProfile.title}
        actions={
          <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
            {t.common.back}
          </Button>
        }
      />
      {isOwnProfile ? <OwnProfileSection /> : <OtherMemberSection userId={userId} />}
    </div>
  );
}

function OtherMemberSection({ userId }: { userId: string | undefined }) {
  const { t } = useLanguage();
  const { users } = useData();
  const member = users.find((u) => u.id === userId);

  if (!member) {
    return <p className="text-sm text-ink-soft">{t.memberProfile.notFound}</p>;
  }

  return (
    <Card className="p-5">
      <div className="flex items-center gap-4">
        <Avatar name={member.name} color={member.avatar_color} className="h-16 w-16 text-xl" />
        <div className="min-w-0">
          <p className="truncate font-display text-lg font-semibold text-ink">{member.name}</p>
          <p className="truncate text-sm text-ink-soft">{member.email}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge variant="info">{t.enums.role[member.role]}</Badge>
        <span className="text-xs text-ink-soft">
          {t.memberProfile.memberSince} {new Date(member.joined_at).toLocaleDateString(t.locale, { year: "numeric", month: "long" })}
        </span>
      </div>
    </Card>
  );
}

function OwnProfileSection() {
  const { t } = useLanguage();
  const toast = useToast();
  const { currentUser } = useAuth();
  const { updateUser } = useData();
  const [name, setName] = useState(currentUser?.name ?? "");
  const [goal, setGoal] = useState(currentUser?.annual_reading_goal?.toString() ?? "");

  function handleSave() {
    if (!currentUser) return;
    updateUser(currentUser.id, { name, annual_reading_goal: goal ? Number(goal) : null });
    toast.success(t.common.save);
  }

  if (!currentUser) return null;

  return (
    <Card className="p-5">
      <div className="mb-5 flex items-center gap-4">
        <Avatar name={currentUser.name} color={currentUser.avatar_color} className="h-16 w-16 text-xl" />
        <p className="text-xs text-ink-soft">{t.memberProfile.changeAvatarHint}</p>
      </div>
      <div className="space-y-3">
        <Input label={t.common.fullName} value={name} onChange={(e) => setName(e.target.value)} />
        <Input label={t.common.email} value={currentUser.email} disabled readOnly />
        <Input label={t.settings.annualGoalLabel} type="number" min={1} value={goal} onChange={(e) => setGoal(e.target.value)} />
        <p className="text-xs text-ink-soft">{t.settings.annualGoalHint}</p>
        <Button size="sm" onClick={handleSave}>{t.common.save}</Button>
      </div>
    </Card>
  );
}
