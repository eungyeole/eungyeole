import { ArrowDown, ArrowRight, Check, Database, LockKeyhole } from "lucide-react";

export function RedirectDemo() {
  return (
    <section
      aria-label="Permanent cached redirect illustration"
      className="flex min-h-60 w-full items-center justify-center overflow-hidden rounded-2xl bg-preview-canvas p-4 text-preview-strong"
    >
      <div className="w-full max-w-sm overflow-hidden rounded-[1.15rem] border border-preview-border bg-preview-surface shadow-[0_24px_55px_-34px_rgba(0,0,0,0.38)]">
        <div className="flex items-center gap-2 border-b border-preview-border bg-background/60 px-3 py-2.5">
          <div aria-hidden="true" className="flex gap-1">
            <span className="size-1.5 rounded-full bg-preview-muted" />
            <span className="size-1.5 rounded-full bg-preview-muted" />
            <span className="size-1.5 rounded-full bg-preview-muted" />
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-preview-canvas px-2 py-1">
            <LockKeyhole aria-hidden="true" className="size-2.5 shrink-0 text-preview-muted" />
            <span className="truncate font-mono text-[9px] text-preview-muted">eungyeole.dev/article</span>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-preview-muted">
              Browser navigation
            </p>
            <span className="rounded-full bg-preview-border px-2 py-1 font-mono text-[9px] font-semibold text-preview-strong">
              308
            </span>
          </div>

          <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2">
            <RouteNode label="From" path="/article" tone="muted" />
            <div className="flex flex-col items-center gap-1 text-preview-muted" aria-hidden="true">
              <ArrowRight className="hidden size-4 sm:block" strokeWidth={1.8} />
              <ArrowDown className="size-4 sm:hidden" strokeWidth={1.8} />
            </div>
            <RouteNode label="To" path="/sandbox" tone="accent" />
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-xl border border-preview-border bg-preview-canvas px-3 py-2.5">
            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-preview-surface text-preview-muted shadow-sm">
              <Database aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-semibold">Stored in browser cache</p>
              <p className="mt-0.5 truncate text-[9px] text-preview-muted">Next visit skips the network</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 text-[9px] font-semibold text-preview-strong">
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
        tone === "accent" ? "border-preview-border bg-preview-canvas" : "border-preview-border bg-background"
      }`}
    >
      <p className="text-[9px] font-medium text-preview-muted">{label}</p>
      <p className="mt-1 truncate font-mono text-[11px] font-semibold">{path}</p>
    </div>
  );
}
