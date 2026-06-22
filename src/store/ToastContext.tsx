import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type ToastVariant = "success" | "error" | "info";
interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let toastCounter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = useCallback((message: string, variant: ToastVariant) => {
    toastCounter += 1;
    const id = toastCounter;
    setToasts((t) => [...t, { id, message, variant }]);
    setTimeout(() => setToasts((t) => t.filter((item) => item.id !== id)), 4000);
  }, []);

  const value: ToastContextValue = {
    success: (message) => show(message, "success"),
    error: (message) => show(message, "error"),
    info: (message) => show(message, "info"),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            onClick={() => setToasts((items) => items.filter((i) => i.id !== t.id))}
            className={`w-full max-w-sm cursor-pointer rounded-md border px-4 py-2.5 text-sm shadow-card ${
              t.variant === "success"
                ? "border-sage/30 bg-sage/10 text-sage"
                : t.variant === "error"
                  ? "border-danger/30 bg-danger/10 text-danger"
                  : "border-line bg-surface text-ink"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
