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
    }, 8000);

    return () => window.clearInterval(interval);
  }, [reduceMotion, names.length]);

  return (
    <span
      aria-label={`eungyeole, ${realName}`}
      className={cn(
        "inline-grid w-24",
        align === "end" ? "justify-items-end" : "justify-items-start",
      )}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          aria-hidden="true"
          animate={{ opacity: 1, filter: "blur(0px)" }}
          className="whitespace-nowrap [grid-area:1/1]"
          exit={{ opacity: 0, filter: "blur(1.5px)" }}
          initial={{ opacity: 0, filter: "blur(1.5px)" }}
          key={names[index]}
          style={{ willChange: "filter, opacity" }}
          transition={{
            opacity: { duration: 0.22, ease: "easeOut" },
            filter: { duration: 0.26, ease: "easeOut" },
          }}
        >
          {names[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
