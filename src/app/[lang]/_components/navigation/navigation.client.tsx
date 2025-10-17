"use client";
import { cn } from "@/components/ui/cn";
import { Cuboid, SwatchBook, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NAVIGATION_TABS } from "./constant";
import { useEffect, useRef } from "react";
import { useIsClient } from "@/hooks/use-is-client";

interface NavigationClientProps {
  lang: string;
}

export const NavigationClient = ({ lang }: NavigationClientProps) => {
  const isClient = useIsClient();

  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabElementRef = useRef<HTMLSpanElement>(null);

  const pathname = usePathname();

  const cleaned = pathname.replace(`/${lang}`, "") || "/";
  const path = cleaned.split("/")[1];
  const value = path ? `/${path}` : "/";

  useEffect(() => {
    const container = containerRef.current;
    if (value && container) {
      const activeTabElement = activeTabElementRef.current;
      if (activeTabElement) {
        const { offsetLeft, offsetWidth } = activeTabElement;
        const containerWidth = container.offsetWidth;

        if (containerWidth === 0) return;

        const clipLeft = (offsetLeft / containerWidth) * 100;
        const clipRight =
          100 - ((offsetLeft + offsetWidth) / containerWidth) * 100;

        container.style.clipPath = `inset(0 ${clipRight.toFixed(
          2
        )}% 0 ${clipLeft.toFixed(2)}% round 17px)`;
      }
    }
  }, [value]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      inert
      className={cn(
        "absolute top-0 left-0 w-full h-full",
        "transition-all duration-300",
        isClient ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="w-full flex bg-emerald-950 rounded-[17px] text-white">
        {NAVIGATION_TABS.map((tab) => (
          <span
            key={tab.value}
            className="cursor-pointer px-2 pr-2.5 py-1 font-medium text-sm flex items-center gap-1 [&_svg]:w-3 [&_svg]:h-3"
            ref={tab.value === value ? activeTabElementRef : null}
          >
            <tab.icon />
            {tab.label}
          </span>
        ))}
      </div>
    </div>
  );
};
