import { useLocation } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { cn } from "@/components/ui/cn";
import { useIsClient } from "@/hooks/use-is-client";
import { NAVIGATION_TABS } from "./constant";

interface NavigationIndicatorProps {
  lang: string;
}

export const NavigationIndicator = ({ lang }: NavigationIndicatorProps) => {
  const isClient = useIsClient();

  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabElementRef = useRef<HTMLSpanElement>(null);

  const pathname = useLocation({ select: (location) => location.pathname });

  const cleaned = pathname.replace(`/${lang}`, "") || "/";
  const path = cleaned.split("/")[1];
  const value = path === "article" ? "/sandbox" : path ? `/${path}` : "/";

  useEffect(() => {
    const container = containerRef.current;
    if (value && container) {
      const activeTabElement = activeTabElementRef.current;
      if (activeTabElement) {
        const { offsetLeft, offsetWidth } = activeTabElement;
        const containerWidth = container.offsetWidth;

        if (containerWidth === 0) return;

        const clipLeft = (offsetLeft / containerWidth) * 100;
        const clipRight = 100 - ((offsetLeft + offsetWidth) / containerWidth) * 100;

        container.style.clipPath = `inset(0 ${clipRight.toFixed(2)}% 0 ${clipLeft.toFixed(2)}% round 17px)`;
      }
    }
  }, [value]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      inert
      className={cn(
        "pointer-events-none absolute top-0 left-0 z-10 h-full w-full p-0.5",
        "transition-opacity duration-200",
        isClient ? "opacity-100" : "opacity-0",
      )}
    >
      <div className="flex h-full w-full rounded-full bg-accent text-accent-foreground shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
        {NAVIGATION_TABS.map((tab) => (
          <span
            key={tab.value}
            className="flex cursor-pointer items-center rounded-full px-3 py-1 text-[13px] font-medium"
            ref={tab.value === value ? activeTabElementRef : null}
          >
            {tab.label}
          </span>
        ))}
      </div>
    </div>
  );
};
