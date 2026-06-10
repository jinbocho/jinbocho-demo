import { NavLink, useLocation } from "react-router-dom";
import { DemoBanner } from "./DemoBanner";

interface NavItem {
  path: string;
  label: string;
  icon: string;
  end?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { path: "/", label: "Home", icon: "🏠", end: true },
  { path: "/catalog", label: "Libri", icon: "📚" },
  { path: "/loans", label: "In prestito", icon: "📤" },
  { path: "/locations", label: "Librerie", icon: "🗄" },
  { path: "/stats", label: "Statistiche", icon: "📊" },
];

interface AppShellProps {
  children: React.ReactNode;
}

function getMobileTitle(pathname: string): string {
  if (pathname === "/") return "Home";
  if (pathname.startsWith("/catalog")) return "Libri";
  if (pathname.startsWith("/loans")) return "In prestito";
  if (pathname.startsWith("/locations") || pathname.startsWith("/map")) return "Librerie";
  if (pathname.startsWith("/stats")) return "Statistiche";
  if (pathname.startsWith("/books")) return "Dettaglio libro";
  return "Jinbocho";
}

export function AppShell({ children }: AppShellProps) {
  const location = useLocation();

  return (
    <div className="flex min-h-dvh flex-col">
      <DemoBanner />

      <div className="flex flex-1 md:grid md:grid-cols-[15rem_1fr]">
        {/* Sidebar (md+) */}
        <aside className="hidden border-r border-line bg-surface md:flex md:flex-col">
          <div className="px-5 py-5">
            <span className="font-display text-xl font-semibold text-brand">Jinbocho</span>
            <p className="mt-0.5 text-xs text-ink-soft">Biblioteca di casa</p>
          </div>
          <nav className="flex-1 space-y-1 px-3">
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
          <div className="flex items-center gap-2 border-t border-line px-4 py-3">
            <div
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: "#a85a38" }}
            >
              C
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ink">Carmelo</p>
              <p className="text-xs capitalize text-ink-soft">admin</p>
            </div>
          </div>
        </aside>

        {/* Content area */}
        <div className="flex min-w-0 flex-col">
          {/* Top bar (mobile only) */}
          <header className="flex items-center justify-between border-b border-line bg-surface px-4 py-3 md:hidden">
            <span className="font-display text-lg font-semibold text-brand">Jinbocho</span>
            <span className="text-sm font-medium text-ink">{getMobileTitle(location.pathname)}</span>
            <div
              className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold text-white"
              style={{ backgroundColor: "#a85a38" }}
            >
              C
            </div>
          </header>

          <main className="mx-auto w-full max-w-content flex-1 px-4 py-6 pb-24 md:pb-6">
            {children}
          </main>
        </div>
      </div>

      {/* Bottom nav (mobile only) */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-line bg-surface md:hidden">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-0.5 py-2 text-xs transition-colors ${
                isActive ? "text-brand" : "text-ink-soft"
              }`
            }
          >
            <span aria-hidden="true" className="text-lg">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
