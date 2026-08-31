import { ArrowDown, ArrowRight, Check, Database, LockKeyhole } from "lucide-react";

export function RedirectDemo() {
  return (
    <section
      aria-label="Permanent cached redirect illustration"
      className="flex min-h-60 w-full items-center justify-center overflow-hidden rounded-2xl bg-[#e8e7f5] p-4 text-[#2a2931] dark:bg-[#282733] dark:text-[#f3f1f7]"
    >
      <div className="w-full max-w-sm overflow-hidden rounded-[1.15rem] border border-black/[0.06] bg-[#faf9fc] shadow-[0_24px_55px_-34px_rgba(44,39,79,0.7)] dark:border-white/8 dark:bg-[#34323f]">
        <div className="flex items-center gap-2 border-b border-black/[0.055] bg-white/60 px-3 py-2.5 dark:border-white/[0.07] dark:bg-white/[0.025]">
          <div aria-hidden="true" className="flex gap-1">
            <span className="size-1.5 rounded-full bg-[#d9887c]" />
            <span className="size-1.5 rounded-full bg-[#e0ba65]" />
            <span className="size-1.5 rounded-full bg-[#77ae82]" />
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-black/[0.045] px-2 py-1 dark:bg-black/15">
            <LockKeyhole aria-hidden="true" className="size-2.5 shrink-0 text-black/30 dark:text-white/30" />
            <span className="truncate font-mono text-[9px] text-black/45 dark:text-white/45">
              eungyeole.dev/article
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-black/35 dark:text-white/35">
              Browser navigation
            </p>
            <span className="rounded-full bg-[#e3def8] px-2 py-1 font-mono text-[9px] font-semibold text-[#63558d] dark:bg-[#4b4660] dark:text-[#c9bee8]">
              308
            </span>
          </div>

          <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2">
            <RouteNode label="From" path="/article" tone="muted" />
            <div className="flex flex-col items-center gap-1 text-[#75699e]" aria-hidden="true">
              <ArrowRight className="hidden size-4 sm:block" strokeWidth={1.8} />
              <ArrowDown className="size-4 sm:hidden" strokeWidth={1.8} />
            </div>
            <RouteNode label="To" path="/sandbox" tone="accent" />
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#8a7caf]/15 bg-[#efecf8] px-3 py-2.5 dark:border-white/[0.07] dark:bg-black/10">
            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-white text-[#6e6294] shadow-sm dark:bg-white/8 dark:text-[#c7bde5]">
              <Database aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-semibold">Stored in browser cache</p>
              <p className="mt-0.5 truncate text-[9px] text-black/38 dark:text-white/38">
                Next visit skips the network
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 text-[9px] font-semibold text-[#4f765a] dark:text-[#9fc3a8]">
              <Check aria-hidden="true" className="size-3" strokeWidth={2.3} />0 ms
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

interface RouteNodeProps {
  label: string;
  path: string;
  tone: "muted" | "accent";
}

function RouteNode({ label, path, tone }: RouteNodeProps) {
  return (
    <div
      className={`min-w-0 rounded-xl border px-3 py-3 ${
        tone === "accent"
          ? "border-[#8174a8]/20 bg-[#ece8f7] dark:border-white/10 dark:bg-[#4a455d]"
          : "border-black/[0.055] bg-white dark:border-white/[0.07] dark:bg-white/[0.045]"
      }`}
    >
      <p className="text-[9px] font-medium text-black/35 dark:text-white/35">{label}</p>
      <p className="mt-1 truncate font-mono text-[11px] font-semibold">{path}</p>
    </div>
  );
}
