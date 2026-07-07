import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BarChart3, Bookmark, BookOpen, BookUp, LogOut, MapPin, Home, Menu, Settings, Users } from "lucide-react";
import { DemoBanner } from "./DemoBanner";
import { MobileDrawer } from "./MobileDrawer";
import { useLanguage, type Language } from "../../i18n";
import { useAuth } from "../../store/AuthContext";
import { Avatar } from "../ui/Avatar";
import { IconButton } from "../ui/IconButton";

const LANG_OPTIONS: { value: Language; label: string }[] = [
  { value: "it", label: "Italiano" },
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
];

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const navigate = useNavigate();
  const { lang, setLang, t } = useLanguage();
  const { currentUser, logout, hasRole } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const NAV_ITEMS = [
    { path: "/", label: t.nav.home, icon: <Home size={18} />, end: true },
    { path: "/books", label: t.nav.books, icon: <BookOpen size={18} /> },
    { path: "/loans", label: t.nav.loans, icon: <BookUp size={18} /> },
    { path: "/wishlist", label: t.nav.wishlist, icon: <Bookmark size={18} /> },
    { path: "/locations", label: t.nav.locations, icon: <MapPin size={18} /> },
    { path: "/stats", label: t.nav.stats, icon: <BarChart3 size={18} /> },
    ...(hasRole("admin") ? [{ path: "/users", label: t.nav.users, icon: <Users size={18} /> }] : []),
    { path: "/settings", label: t.nav.settings, icon: <Settings size={18} /> },
  ];

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="flex min-h-dvh flex-col md:h-dvh md:overflow-hidden">
      <DemoBanner />

      <div className="flex flex-1 md:grid md:min-h-0 md:grid-cols-[15rem_1fr]">
        {/* Sidebar (md+) — fixed height; nav scrolls internally so the
            profile/logout row stays pinned at the bottom instead of being
            pushed off-screen by a tall main content column. */}
        <aside className="hidden border-r border-line bg-surface md:flex md:h-full md:min-h-0 md:flex-col">
          <div className="px-5 py-5">
            <span className="font-display text-xl font-semibold text-brand">{t.common.appName}</span>
            <p className="mt-0.5 text-xs text-ink-soft">{t.sidebar.subtitle}</p>
          </div>
          <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-brand/10 text-brand"
                      : "text-ink-soft hover:bg-paper hover:text-ink"
                  }`
                }
              >
                <span aria-hidden="true" className="text-base">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
          {currentUser && (
            <div className="flex shrink-0 items-center gap-2 border-t border-line px-4 py-3">
              <Link to={`/users/${currentUser.id}`} className="flex min-w-0 flex-1 items-center gap-2 hover:opacity-80">
                <Avatar name={currentUser.name} color={currentUser.avatar_color} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{currentUser.name}</p>
                  <p className="text-xs capitalize text-ink-soft">{t.enums.role[currentUser.role]}</p>
                </div>
              </Link>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
                aria-label={t.settings.languageTitle}
                className="shrink-0 rounded-md border border-line bg-surface px-1.5 py-0.5 text-xs font-medium text-ink-soft hover:bg-paper hover:text-ink transition-colors"
              >
                {LANG_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.value.toUpperCase()}</option>
                ))}
              </select>
              <IconButton label={t.common.logout} onClick={handleLogout}>
                <LogOut size={16} />
              </IconButton>
            </div>
          )}
        </aside>

        {/* Content area */}
        <div className="flex min-w-0 flex-col md:h-full md:min-h-0 md:overflow-y-auto">
          {/* Top bar (mobile only) */}
          <header className="flex items-center justify-between border-b border-line bg-surface px-4 py-3 md:hidden">
            <IconButton
              label={t.common.menu}
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
            >
              <Menu size={20} />
            </IconButton>
            <span className="font-display text-lg font-semibold text-brand">{t.common.appName}</span>
            <div className="flex items-center gap-2">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
                aria-label={t.settings.languageTitle}
                className="rounded-md border border-line bg-surface px-1.5 py-0.5 text-xs font-medium text-ink-soft hover:bg-paper hover:text-ink transition-colors"
              >
                {LANG_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.value.toUpperCase()}</option>
                ))}
              </select>
              <IconButton label={t.common.logout} onClick={handleLogout}>
                <LogOut size={16} />
              </IconButton>
            </div>
          </header>

          <main className="mx-auto w-full max-w-content flex-1 px-4 py-6 md:pb-6">
            {children}
          </main>
        </div>
      </div>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        items={NAV_ITEMS}
        user={currentUser}
        onLogout={handleLogout}
      />
    </div>
  );
}
