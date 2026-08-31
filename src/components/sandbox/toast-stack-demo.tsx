"use client";

import { Check, Plus, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const MAX_TOASTS = 3;
const TOAST_COPY = [
  ["Published", "Your changes are now live."],
  ["Link copied", "Ready to share with your team."],
  ["Saved", "Everything is synced."],
] as const;

interface ToastItem {
  id: number;
  title: string;
  description: string;
  visible: boolean;
}

const INITIAL_TOAST: ToastItem = {
  id: 0,
  title: "Saved",
  description: "Everything is synced.",
  visible: true,
};

export function ToastStackDemo() {
  const [toasts, setToasts] = useState<ToastItem[]>([INITIAL_TOAST]);
  const nextIdRef = useRef(1);
  const timersRef = useRef(new Set<ReturnType<typeof setTimeout>>());

  const schedule = useCallback((callback: () => void, delay: number) => {
    const timer = setTimeout(() => {
      timersRef.current.delete(timer);
      callback();
    }, delay);
    timersRef.current.add(timer);
  }, []);

  useEffect(() => {
    return () => {
      for (const timer of timersRef.current) clearTimeout(timer);
      timersRef.current.clear();
    };
  }, []);

  const dismissToast = useCallback(
    (id: number) => {
      setToasts((current) => current.map((toast) => (toast.id === id ? { ...toast, visible: false } : toast)));
      schedule(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 220);
    },
    [schedule],
  );

  const addToast = () => {
    const id = nextIdRef.current;
    const [title, description] = TOAST_COPY[id % TOAST_COPY.length];
    nextIdRef.current += 1;

    setToasts((current) => [...current, { id, title, description, visible: false }].slice(-MAX_TOASTS));
    schedule(
      () => setToasts((current) => current.map((toast) => (toast.id === id ? { ...toast, visible: true } : toast))),
      20,
    );
  };

  return (
    <section
      aria-label="Toast notification stack demo"
      className="flex min-h-60 w-full flex-col overflow-hidden rounded-2xl bg-[#292a30] p-4 text-white"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">Notification lab</p>
          <p className="mt-1 text-sm font-medium text-white/90">Stacked feedback</p>
        </div>
        <button
          className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-[#f4f1e9] px-3 text-xs font-semibold text-[#292a30] outline-none transition-transform hover:scale-[1.03] active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[#c8e3d1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#292a30] motion-reduce:transition-none"
          onClick={addToast}
          type="button"
        >
          <Plus aria-hidden="true" className="size-3.5" strokeWidth={2.2} />
          Show toast
        </button>
      </div>

      <div
        className="relative mt-4 min-h-36 flex-1"
        aria-atomic="false"
        aria-live="polite"
        aria-relevant="additions removals"
      >
        {toasts.length === 0 ? (
          <div className="absolute inset-0 grid place-items-center rounded-xl border border-dashed border-white/10 text-xs text-white/30">
            All clear — add a toast
          </div>
        ) : null}

        {toasts.map((toast, index) => {
          const depth = toasts.length - 1 - index;
          const restingTransform = `translateY(-${depth * 16}px) scale(${1 - depth * 0.035})`;

          return (
            <div
              className={`absolute inset-x-0 bottom-0 flex items-start gap-3 rounded-[0.9rem] border border-white/70 bg-[#f8f7f2] px-3 py-3 text-[#282a29] shadow-[0_14px_35px_rgba(0,0,0,0.3)] transition-[transform,opacity] duration-200 ease-out motion-reduce:transition-none ${
                toast.visible ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              key={toast.id}
              style={{
                transform: toast.visible ? restingTransform : "translateY(14px) scale(0.96)",
                zIndex: index + 1,
              }}
            >
              <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-[#dcebe1] text-[#496352]">
                <Check aria-hidden="true" className="size-3.5" strokeWidth={2.4} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold">{toast.title}</p>
                <p className="mt-0.5 truncate text-[11px] text-black/45">{toast.description}</p>
              </div>
              <button
                aria-label={`Dismiss ${toast.title} notification`}
                className="grid size-7 shrink-0 place-items-center rounded-full text-black/35 outline-none transition-colors hover:bg-black/5 hover:text-black/70 focus-visible:ring-2 focus-visible:ring-[#6d8b75] motion-reduce:transition-none"
                onClick={() => dismissToast(toast.id)}
                type="button"
              >
                <X aria-hidden="true" className="size-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      <p className="mt-2 text-center text-[10px] text-white/25">Up to {MAX_TOASTS} notifications</p>
    </section>
  );
}
