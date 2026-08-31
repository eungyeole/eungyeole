"use client";

import { Bookmark, Code2, Eye, type LucideIcon } from "lucide-react";
import { type KeyboardEvent, useId, useRef, useState } from "react";

const TABS = [
  {
    id: "preview",
    label: "Preview",
    icon: Eye,
    eyebrow: "Live canvas",
    title: "Polished at every state.",
    accent: "bg-[#6f8f78]",
  },
  {
    id: "code",
    label: "Code",
    icon: Code2,
    eyebrow: "Implementation",
    title: "Small, readable, reusable.",
    accent: "bg-[#b7825c]",
  },
  {
    id: "notes",
    label: "Notes",
    icon: Bookmark,
    eyebrow: "Design notes",
    title: "The details are the product.",
    accent: "bg-[#7b7ea3]",
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function MorphingTabsDemo() {
  const [activeId, setActiveId] = useState<TabId>("preview");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const instanceId = useId();
  const activeIndex = TABS.findIndex((tab) => tab.id === activeId);
  const activeTab = TABS[activeIndex];
  const ActiveIcon: LucideIcon = activeTab.icon;

  const selectWithKeyboard = (event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex: number | undefined;

    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % TABS.length;
    if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + TABS.length) % TABS.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = TABS.length - 1;

    if (nextIndex === undefined) return;

    event.preventDefault();
    setActiveId(TABS[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section
      aria-label="Animated segmented tabs demo"
      className="flex min-h-60 w-full items-center justify-center overflow-hidden rounded-2xl bg-[#edf0ea] p-4 text-[#262a25] dark:bg-[#292b28] dark:text-[#f3f2ed]"
    >
      <div className="w-full max-w-sm rounded-[1.15rem] border border-black/5 bg-white/80 p-3 shadow-[0_18px_50px_-28px_rgba(28,36,30,0.55)] backdrop-blur dark:border-white/8 dark:bg-white/6">
        <div
          aria-label="View"
          className="relative grid grid-cols-3 rounded-xl bg-black/[0.055] p-1 dark:bg-white/[0.075]"
          role="tablist"
        >
          <span
            aria-hidden="true"
            className="absolute bottom-1 left-1 top-1 w-[calc((100%-0.5rem)/3)] rounded-lg bg-white shadow-[0_2px_8px_rgba(32,38,33,0.12)] transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none dark:bg-[#464a45]"
            style={{ transform: `translateX(${activeIndex * 100}%)` }}
          />

          {TABS.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeId === tab.id;

            return (
              <button
                aria-controls={`${instanceId}-panel`}
                aria-selected={isActive}
                className="relative z-10 flex min-w-0 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-[11px] font-medium text-black/45 outline-none transition-colors hover:text-black/70 focus-visible:ring-2 focus-visible:ring-[#66816d] focus-visible:ring-offset-1 motion-reduce:transition-none dark:text-white/45 dark:hover:text-white/80"
                id={`${instanceId}-tab-${tab.id}`}
                key={tab.id}
                onClick={() => setActiveId(tab.id)}
                onKeyDown={(event) => selectWithKeyboard(event, index)}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                role="tab"
                tabIndex={isActive ? 0 : -1}
                type="button"
              >
                <Icon aria-hidden="true" className="size-3.5 shrink-0" strokeWidth={1.8} />
                <span className={isActive ? "text-[#242824] dark:text-white" : undefined}>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div
          aria-labelledby={`${instanceId}-tab-${activeId}`}
          className="mt-3 flex min-h-28 items-end justify-between overflow-hidden rounded-xl border border-black/[0.055] bg-[#f8f8f5] p-4 dark:border-white/[0.07] dark:bg-black/15"
          id={`${instanceId}-panel`}
          role="tabpanel"
        >
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/35 dark:text-white/35">
              {activeTab.eyebrow}
            </p>
            <p className="mt-1.5 max-w-44 text-balance text-base font-semibold leading-snug">{activeTab.title}</p>
            <div className="mt-3 flex gap-1" aria-hidden="true">
              <span className={`h-1.5 w-8 rounded-full ${activeTab.accent}`} />
              <span className="h-1.5 w-3 rounded-full bg-black/10 dark:bg-white/10" />
              <span className="h-1.5 w-3 rounded-full bg-black/10 dark:bg-white/10" />
            </div>
          </div>

          <div
            aria-hidden="true"
            className="grid size-12 shrink-0 place-items-center rounded-full bg-[#e6ebe4] text-[#536a59] transition-all duration-300 motion-reduce:transition-none dark:bg-white/8 dark:text-[#b8cbbd]"
          >
            <ActiveIcon className="size-5" strokeWidth={1.7} />
          </div>
        </div>
      </div>
    </section>
  );
}
