"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/components/ui/cn";

interface IdentityNameProps {
  align?: "start" | "end";
  lang: string;
}

export function IdentityName({ align = "start", lang }: IdentityNameProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const realName = lang === "en" ? "Eungyeol An" : "안은결";
  const names = ["eungyeole", realName];

  useEffect(() => {
    if (reduceMotion) return;

    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % names.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [reduceMotion, names.length]);

  return (
    <span
      aria-label={`eungyeole, ${realName}`}
      className={cn(
        "inline-grid h-[1.25em] w-24 items-center overflow-hidden leading-[1.25]",
        align === "end" ? "justify-items-end" : "justify-items-start",
      )}
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.span
          aria-hidden="true"
          animate={{ opacity: 1, filter: "blur(0px)", y: "0%" }}
          className="whitespace-nowrap [grid-area:1/1]"
          exit={{ opacity: 0, filter: "blur(2px)", y: "-75%" }}
          initial={{ opacity: 0, filter: "blur(2px)", y: "75%" }}
          key={names[index]}
          style={{ willChange: "filter, opacity" }}
          transition={{
            y: { duration: 0.52, ease: [0.76, 0, 0.24, 1] },
            opacity: { duration: 0.34, ease: "easeOut" },
            filter: { duration: 0.4, ease: "easeOut" },
          }}
        >
          {names[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
