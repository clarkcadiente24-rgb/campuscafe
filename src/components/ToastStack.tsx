"use client";

import type { Toast } from "@/lib/useToasts";

const toneStyles: Record<NonNullable<Toast["tone"]>, string> = {
  success: "border-emerald-400/30 bg-emerald-500/10",
  info: "border-cyan-400/30 bg-cyan-500/10",
  error: "border-rose-400/30 bg-rose-500/10",
};

const dotStyles: Record<NonNullable<Toast["tone"]>, string> = {
  success: "bg-emerald-400",
  info: "bg-cyan-400",
  error: "bg-rose-400",
};

export default function ToastStack({
  toasts,
  onDismiss,
}: {
  toasts: Toast[];
  onDismiss: (id: number) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-4 right-4 z-[60] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2"
    >
      {toasts.map((toast) => {
        const tone = toast.tone ?? "info";
        return (
          <div
            key={toast.id}
            className={`glass animate-page-in flex items-start gap-3 rounded-xl border px-4 py-3 ${toneStyles[tone]}`}
          >
            <span
              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dotStyles[tone]}`}
            />
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">{toast.title}</p>
              {toast.message && (
                <p className="mt-0.5 text-xs text-slate-300">{toast.message}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              aria-label="Dismiss notification"
              className="text-slate-400 transition hover:text-white"
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
}
