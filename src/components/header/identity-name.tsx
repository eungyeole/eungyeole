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
  const names = [realName, "eungyeole"];
  const characters = Array.from(names[index]);
  const gaps = Math.max(characters.length - 1, 1);

  useEffect(() => {
    if (reduceMotion) return;

    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % names.length);
    }, 8000);

    return () => window.clearInterval(interval);
  }, [reduceMotion, names.length]);

  return (
    <span
      aria-label={`${realName}, eungyeole`}
      className={cn(
        "inline-grid w-24",
        align === "end" ? "justify-items-end" : "justify-items-start",
      )}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          aria-hidden="true"
          animate="visible"
          className="whitespace-nowrap [grid-area:1/1]"
          exit="exit"
          initial="hidden"
          key={names[index]}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.24 / gaps } },
            exit: { transition: { staggerChildren: 0.16 / gaps, staggerDirection: -1 } },
          }}
        >
          {characters.map((character, characterIndex) => (
            <motion.span
              className="inline-block"
              key={`${character}-${characterIndex}`}
              style={{ willChange: "filter, opacity" }}
              variants={{
                hidden: { opacity: 0, filter: "blur(2px)" },
                visible: {
                  opacity: 1,
                  filter: "blur(0px)",
                  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                },
                exit: {
                  opacity: 0,
                  filter: "blur(2px)",
                  transition: { duration: 0.26, ease: [0.7, 0, 0.84, 0] },
                },
              }}
            >
              {character === " " ? "\u00a0" : character}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
