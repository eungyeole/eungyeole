import { Code2, GitFork, Github, type LucideIcon, Star } from "lucide-react";

const ACTIVITY = [
  0, 1, 0, 2, 1, 0, 0, 2, 3, 1, 0, 2, 1, 3, 2, 0, 1, 2, 4, 3, 1, 0, 2, 2, 3, 4, 2, 1, 0, 3, 2, 4, 3, 1, 2, 1, 3, 4, 2,
  0, 1, 3, 2, 4, 3, 2, 1, 3, 4, 2, 1, 3, 4,
] as const;

const ACTIVITY_COLORS = ["bg-[#e7eae5]", "bg-[#c9decf]", "bg-[#94bea1]", "bg-[#5f9770]", "bg-[#326140]"] as const;

export function VelogStatsDemo() {
  return (
    <section
      aria-label="GitHub and Velog activity snapshot"
      className="flex min-h-60 w-full items-center justify-center overflow-hidden rounded-2xl bg-[#e8efe9] p-4 text-[#263029] dark:bg-[#222b25] dark:text-[#eef5ef]"
    >
      <div className="w-full max-w-sm rounded-[1.15rem] border border-black/[0.055] bg-[#fbfcf9] p-4 shadow-[0_22px_50px_-34px_rgba(23,49,30,0.65)] dark:border-white/8 dark:bg-[#303a33]">
        <header className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-8 shrink-0 place-items-center rounded-[0.65rem] bg-[#20c997] text-sm font-black text-white">
              V
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold">@eungyeole</p>
              <p className="text-[10px] text-black/38 dark:text-white/38">Velog cards for GitHub</p>
            </div>
          </div>
          <span className="rounded-full bg-[#e8f4eb] px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#3d7750] dark:bg-white/8 dark:text-[#9ac4a7]">
            Open source
          </span>
        </header>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <Stat icon={Star} label="Stars" value="190+" />
          <Stat icon={GitFork} label="Forks" value="20+" />
          <Stat icon={Code2} label="Stack" value="TS" />
        </div>

        <div className="mt-3 rounded-xl border border-black/[0.055] bg-white p-3 dark:border-white/[0.07] dark:bg-black/10">
          <div className="mb-2.5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <Github aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
              <p className="text-[10px] font-semibold">Card themes</p>
            </div>
            <p className="text-[9px] text-black/35 dark:text-white/35">SVG endpoint</p>
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
    <div className="min-w-0 rounded-xl bg-[#f0f3ed] px-2.5 py-2.5 dark:bg-white/[0.055]">
      <div className="flex items-center gap-1 text-[9px] font-medium text-black/38 dark:text-white/38">
        <Icon aria-hidden="true" className="size-3 shrink-0" strokeWidth={1.8} />
        <span className="truncate">{label}</span>
      </div>
      <p className="mt-1 text-sm font-semibold tracking-tight">{value}</p>
    </div>
  );
}
