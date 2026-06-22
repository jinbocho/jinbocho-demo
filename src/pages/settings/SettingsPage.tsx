import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Textarea } from "../../components/ui/Textarea";
import { ExportMenu } from "../../components/books/ExportMenu";
import { ImportBackupDialog } from "../../components/settings/ImportBackupDialog";
import { DeleteAccountDialog } from "../../components/settings/DeleteAccountDialog";
import { useData } from "../../store/DataContext";
import { useAuth } from "../../store/AuthContext";
import { useTheme } from "../../store/ThemeContext";
import { useLanguage } from "../../i18n";
import type { ThemeMode, ThemeName } from "../../data/types";

const THEME_SWATCHES: Record<ThemeName, string[]> = {
  pergamena: ["#a85a38", "#f6f1e8", "#6e8e58"],
  akabeni: ["#bc002d", "#f8f7f4", "#2e7d32"],
  sumi: ["#b8860b", "#f5f3f0", "#2d6a4f"],
};

export function SettingsPage() {
  const { t, lang, setLang } = useLanguage();
  const navigate = useNavigate();
  const {
    family, users, records, books, rooms, bookcases, sections, shelves, loans, reads, history, incipits,
    updateFamily, updateUser,
  } = useData();
  const { currentUser, hasRole, logout } = useAuth();
  const { themeName, themeMode, setThemeName, setThemeMode } = useTheme();
  const isAdmin = hasRole("admin");

  const [familyName, setFamilyName] = useState(family.name);
  const [familyDescription, setFamilyDescription] = useState(family.description ?? "");
  const [profileName, setProfileName] = useState(currentUser?.name ?? "");
  const [profileGoal, setProfileGoal] = useState(currentUser?.annual_reading_goal?.toString() ?? "");

  function saveFamily() {
    updateFamily({ name: familyName, description: familyDescription || null });
  }

  function saveProfile() {
    if (!currentUser) return;
    updateUser(currentUser.id, { name: profileName, annual_reading_goal: profileGoal ? Number(profileGoal) : null });
  }

  function handleSignOut() {
    logout();
    navigate("/login", { replace: true });
  }

  function exportFullBackup() {
    const snapshot = { schema_version: 1, exported_at: new Date().toISOString(), family, users, records, books, rooms, bookcases, sections, shelves, loans, reads, history, incipits };
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "jinbocho-backup.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <PageHeader title={t.settings.title} />

      <Card className="space-y-3 p-5">
        <h2 className="font-display text-base font-semibold text-ink">{t.settings.familyTitle}</h2>
        {!isAdmin && <p className="text-xs text-ink-soft">{t.settings.familyAdminOnly}</p>}
        <Input label={t.common.familyName} value={familyName} disabled={!isAdmin} onChange={(e) => setFamilyName(e.target.value)} />
        <Textarea label={t.common.description} rows={2} value={familyDescription} disabled={!isAdmin} onChange={(e) => setFamilyDescription(e.target.value)} />
        {isAdmin && <Button size="sm" onClick={saveFamily}>{t.common.save}</Button>}
      </Card>

      <Card className="space-y-3 p-5">
        <h2 className="font-display text-base font-semibold text-ink">{t.settings.profileTitle}</h2>
        <Input label={t.common.fullName} value={profileName} onChange={(e) => setProfileName(e.target.value)} />
        <Input label={t.settings.annualGoalLabel} type="number" value={profileGoal} onChange={(e) => setProfileGoal(e.target.value)} />
        <p className="text-xs text-ink-soft">{t.settings.annualGoalHint}</p>
        <Button size="sm" onClick={saveProfile}>{t.common.save}</Button>
      </Card>

      <Card className="space-y-4 p-5">
        <h2 className="font-display text-base font-semibold text-ink">{t.settings.appearanceTitle}</h2>
        <div>
          <p className="mb-2 text-sm font-medium text-ink-soft">{t.settings.themeLabel}</p>
          <div className="flex gap-3">
            {(Object.keys(THEME_SWATCHES) as ThemeName[]).map((name) => (
              <button
                key={name}
                onClick={() => setThemeName(name)}
                className={`rounded-lg border-2 p-2 transition-colors ${themeName === name ? "border-brand" : "border-line"}`}
              >
                <div className="flex gap-1">
                  {THEME_SWATCHES[name].map((color, i) => (
                    <span key={i} className="h-5 w-5 rounded-full border border-line" style={{ backgroundColor: color }} />
                  ))}
                </div>
                <p className="mt-1.5 text-xs font-medium text-ink">{t.settings.themeNames[name]}</p>
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-ink-soft">{t.settings.modeLabel}</p>
          <div className="flex gap-2">
            {([["light", t.settings.modeLight], ["dark", t.settings.modeDark], ["system", t.settings.modeSystem]] as [ThemeMode, string][]).map(([mode, label]) => (
              <Button key={mode} size="sm" variant={themeMode === mode ? "primary" : "secondary"} onClick={() => setThemeMode(mode)}>{label}</Button>
            ))}
          </div>
        </div>
      </Card>

      <Card className="space-y-3 p-5">
        <h2 className="font-display text-base font-semibold text-ink">{t.settings.languageTitle}</h2>
        <div className="flex gap-2">
          <Button size="sm" variant={lang === "it" ? "primary" : "secondary"} onClick={() => setLang("it")}>Italiano</Button>
          <Button size="sm" variant={lang === "en" ? "primary" : "secondary"} onClick={() => setLang("en")}>English</Button>
        </div>
      </Card>

      <Card className="space-y-4 p-5">
        <h2 className="font-display text-base font-semibold text-ink">{t.settings.backupTitle}</h2>
        <div>
          <p className="mb-2 text-sm text-ink-soft">{t.settings.exportLibraryLabel}</p>
          <ExportMenu />
        </div>
        {isAdmin && (
          <div>
            <p className="mb-2 text-sm text-ink-soft">{t.settings.fullBackupLabel}</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" onClick={exportFullBackup}>{t.settings.exportBackupButton}</Button>
              <ImportBackupDialog />
            </div>
          </div>
        )}
      </Card>

      <Card className="space-y-3 p-5">
        <h2 className="font-display text-base font-semibold text-ink">{t.settings.signOutTitle}</h2>
        <Button variant="secondary" size="sm" onClick={handleSignOut}>{t.settings.signOutButton}</Button>
      </Card>

      {isAdmin && (
        <Card className="space-y-3 border-danger/30 p-5">
          <h2 className="font-display text-base font-semibold text-danger">{t.settings.dangerZoneTitle}</h2>
          <DeleteAccountDialog familyName={family.name} />
        </Card>
      )}
    </div>
  );
}
