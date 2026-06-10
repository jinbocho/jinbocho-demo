import { NavLink, useLocation } from "react-router-dom";
import { DemoBanner } from "./DemoBanner";

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { path: "/", label: "Dashboard", icon: "📊" },
  { path: "/catalog", label: "Catalogo", icon: "📚" },
  { path: "/locations", label: "Librerie", icon: "🗺️" },
  { path: "/loans", label: "Prestiti", icon: "🤝" },
  { path: "/stats", label: "Statistiche", icon: "📈" },
];

interface AppShellProps {
  children: React.ReactNode;
}

function SidebarLink({ item }: { item: NavItem }) {
  return (
    <NavLink
      to={item.path}
      end={item.path === "/"}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
          isActive
            ? "bg-brand/10 text-brand"
            : "text-ink-soft hover:bg-paper hover:text-ink"
        }`
      }
    >
      <span className="text-base leading-none">{item.icon}</span>
      {item.label}
    </NavLink>
  );
}

function MobileNavLink({ item }: { item: NavItem }) {
  return (
    <NavLink
      to={item.path}
      end={item.path === "/"}
      className={({ isActive }) =>
        `flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg text-xs font-medium transition-colors ${
          isActive ? "text-brand" : "text-stone hover:text-ink"
        }`
      }
    >
      <span className="text-lg leading-none">{item.icon}</span>
      <span className="leading-tight">{item.label}</span>
    </NavLink>
  );
}

function getMobileTitle(pathname: string): string {
  if (pathname === "/") return "Dashboard";
  if (pathname.startsWith("/catalog")) return "Catalogo";
  if (pathname.startsWith("/locations") || pathname.startsWith("/map")) return "Librerie";
  if (pathname.startsWith("/loans")) return "Prestiti";
  if (pathname.startsWith("/stats")) return "Statistiche";
  if (pathname.startsWith("/books")) return "Dettaglio libro";
  return "Jinbocho";
}

export function AppShell({ children }: AppShellProps) {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <DemoBanner />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar desktop */}
        <aside className="hidden md:flex flex-col w-56 bg-surface border-r border-line px-3 py-6 gap-1 shrink-0">
          {/* Logo */}
          <div className="px-3 mb-6">
            <h1 className="font-display text-3xl text-brand leading-none">神保町</h1>
            <p className="text-xs text-ink-soft mt-1 font-sans">Biblioteca di casa</p>
          </div>

          <nav className="flex flex-col gap-0.5">
            {NAV_ITEMS.map((item) => (
              <SidebarLink key={item.path} item={item} />
            ))}
          </nav>

          <div className="mt-auto pt-4 border-t border-line">
            <div className="flex items-center gap-2 px-3 py-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0"
                style={{ backgroundColor: "#a85a38" }}
              >
                C
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink truncate">Carmelo</p>
                <p className="text-xs text-ink-soft truncate">Admin</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Mobile header */}
          <header className="md:hidden flex items-center justify-between px-4 py-3 bg-surface border-b border-line">
            <span className="font-display text-xl text-brand">神保町</span>
            <span className="font-medium text-sm text-ink">{getMobileTitle(location.pathname)}</span>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white"
              style={{ backgroundColor: "#a85a38" }}
            >
              C
            </div>
          </header>

          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile bottom navigation */}
      <nav className="md:hidden flex items-center justify-around bg-surface border-t border-line px-2 py-1 safe-area-pb">
        {NAV_ITEMS.map((item) => (
          <MobileNavLink key={item.path} item={item} />
        ))}
      </nav>
    </div>
  );
}
