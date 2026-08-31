import { Code2, GitFork, Github, type LucideIcon, Star } from "lucide-react";

const ACTIVITY = [
  0, 1, 0, 2, 1, 0, 0, 2, 3, 1, 0, 2, 1, 3, 2, 0, 1, 2, 4, 3, 1, 0, 2, 2, 3, 4, 2, 1, 0, 3, 2, 4, 3, 1, 2, 1, 3, 4, 2,
  0, 1, 3, 2, 4, 3, 2, 1, 3, 4, 2, 1, 3, 4,
] as const;

const ACTIVITY_COLORS = [
  "bg-preview-level-0",
  "bg-preview-level-1",
  "bg-preview-level-2",
  "bg-preview-level-3",
  "bg-preview-level-4",
] as const;

export function VelogStatsDemo() {
  return (
    <section
      aria-label="GitHub and Velog activity snapshot"
      className="flex min-h-60 w-full items-center justify-center overflow-hidden rounded-2xl bg-preview-canvas p-4 text-preview-strong"
    >
      <div className="w-full max-w-sm rounded-[1.15rem] border border-preview-border bg-preview-surface p-4 shadow-[0_22px_50px_-34px_rgba(0,0,0,0.38)]">
        <header className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-8 shrink-0 place-items-center rounded-[0.65rem] bg-preview-strong text-sm font-black text-preview-surface">
              V
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold">@eungyeole</p>
              <p className="text-[10px] text-preview-muted">Velog cards for GitHub</p>
            </div>
          </div>
          <span className="rounded-full bg-preview-border px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-preview-strong">
            Open source
          </span>
        </header>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <Stat icon={Star} label="Stars" value="190+" />
          <Stat icon={GitFork} label="Forks" value="20+" />
          <Stat icon={Code2} label="Stack" value="TS" />
        </div>

        <div className="mt-3 rounded-xl border border-preview-border bg-background p-3">
          <div className="mb-2.5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <Github aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
              <p className="text-[10px] font-semibold">Card themes</p>
            </div>
            <p className="text-[9px] text-preview-muted">SVG endpoint</p>
          </div>
          <div
            aria-label="Color theme preview grid"
            className="grid grid-cols-[repeat(13,minmax(0,1fr))] gap-1"
            role="img"
          >
            {ACTIVITY.map((level, index) => (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: positions are the identity of this static heatmap
                key={index}
                className={`aspect-square rounded-[3px] ${ACTIVITY_COLORS[level]}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface StatProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

function Stat({ icon: Icon, label, value }: StatProps) {
  return (
    <div className="min-w-0 rounded-xl bg-preview-canvas px-2.5 py-2.5">
      <div className="flex items-center gap-1 text-[9px] font-medium text-preview-muted">
        <Icon aria-hidden="true" className="size-3 shrink-0" strokeWidth={1.8} />
        <span className="truncate">{label}</span>
      </div>
      <p className="mt-1 text-sm font-semibold tracking-tight">{value}</p>
    </div>
  );
}
