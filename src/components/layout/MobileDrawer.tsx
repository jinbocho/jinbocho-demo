import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink } from "react-router-dom";
import { LogOut, X } from "lucide-react";
import { useLanguage } from "../../i18n";
import { Avatar } from "../ui/Avatar";
import { IconButton } from "../ui/IconButton";

interface NavItem {
  path: string;
  label: string;
  icon: ReactNode;
  end?: boolean;
}

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  user: { id: string; name: string; avatar_color: string; role: string } | null | undefined;
  onLogout: () => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function MobileDrawer({ open, onClose, items, user, onLogout }: MobileDrawerProps) {
  const { t } = useLanguage();
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  // Kept mounted slightly past `open=false` so the slide-out transition can play.
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) {
      setVisible(false);
      const unmountTimer = window.setTimeout(() => setMounted(false), 200);
      return () => window.clearTimeout(unmountTimer);
    }

    setMounted(true);
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => setVisible(true));
    const focusTimer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    }, 0);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previouslyFocused.current?.focus();
    };
  }, [open, handleKeyDown]);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label={t.common.menu}>
      <div
        className={`absolute inset-0 bg-ink/40 transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        className={`absolute inset-y-0 left-0 flex w-64 max-w-[80vw] flex-col bg-surface shadow-card transition-transform duration-200 ${
          visible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex shrink-0 items-start justify-between px-5 py-5">
          <div>
            <span className="font-display text-xl font-semibold text-brand">{t.common.appName}</span>
            <p className="mt-0.5 text-xs text-ink-soft">{t.common.appSubtitle}</p>
          </div>
          <IconButton label={t.common.closeMenu} onClick={onClose}>
            <X size={18} />
          </IconButton>
        </div>
        <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3">
          {items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                  isActive ? "bg-brand/10 text-brand" : "text-ink-soft hover:bg-paper hover:text-ink"
                }`
              }
            >
              <span aria-hidden="true" className="text-base">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        {user && (
          <div className="shrink-0 border-t border-line px-4 pb-3 pt-2">
            <div className="flex items-center gap-3">
              <Link to={`/users/${user.id}`} onClick={onClose} className="flex min-w-0 flex-1 items-center gap-3 hover:opacity-80">
                <Avatar name={user.name} color={user.avatar_color} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{user.name}</p>
                  <p className="truncate text-xs capitalize text-ink-soft">{user.role}</p>
                </div>
              </Link>
              <IconButton label={t.common.logout} onClick={onLogout}>
                <LogOut size={16} />
              </IconButton>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
