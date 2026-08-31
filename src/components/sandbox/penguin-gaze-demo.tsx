"use client";

import { MousePointer2 } from "lucide-react";
import { type PointerEvent, useEffect, useRef, useState } from "react";
import { IconEungyeole } from "@/components/assets/icon-eungyeole";

interface PointerPosition {
  x: number;
  y: number;
  active: boolean;
}

const RESTING_POSITION: PointerPosition = { x: 0, y: 0, active: false };

export function PenguinGazeDemo() {
  const surfaceRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const [position, setPosition] = useState<PointerPosition>(RESTING_POSITION);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;

    const surface = surfaceRef.current;
    if (!surface) return;

    const bounds = surface.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1));
    const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1));

    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => setPosition({ x, y, active: true }));
  };

  const resetPosition = () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    setPosition(RESTING_POSITION);
  };

  return (
    <section
      aria-label="Pointer-following penguin demo"
      className="relative flex min-h-60 w-full touch-pan-y items-center justify-center overflow-hidden rounded-2xl bg-[#f2d76d] text-[#24231f]"
      onPointerLeave={resetPosition}
      onPointerMove={handlePointerMove}
      ref={surfaceRef}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30 [background-image:radial-gradient(#76651d_0.7px,transparent_0.7px)] [background-size:13px_13px]"
      />
      <div aria-hidden="true" className="absolute size-52 rounded-full border border-black/8" />
      <div aria-hidden="true" className="absolute size-36 rounded-full border border-black/8" />

      <div className="relative flex flex-col items-center">
        <div
          aria-hidden="true"
          className="relative grid size-32 place-items-center rounded-full bg-[#fff8da] shadow-[0_24px_50px_-28px_rgba(70,56,8,0.65)] transition-transform duration-300 ease-out motion-reduce:!transform-none motion-reduce:transition-none"
          style={{
            transform: `translate3d(${position.x * 8}px, ${position.y * 5}px, 0) rotate(${-position.y * 7}deg) scale(${position.active ? 1.025 : 1})`,
          }}
        >
          <IconEungyeole className="size-24 text-[#25241f]" />
          <span className="absolute right-[13%] top-[18%] size-2 rounded-full bg-white/80 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        </div>

        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-black/[0.07] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-black/55">
          <MousePointer2 aria-hidden="true" className="size-3" strokeWidth={2} />
          {prefersReducedMotion ? "Resting mode" : "Move your pointer"}
        </div>
      </div>

      <span
        aria-hidden="true"
        className={`pointer-events-none absolute size-2 rounded-full bg-[#25241f] transition-opacity duration-200 motion-reduce:hidden ${
          position.active ? "opacity-25" : "opacity-0"
        }`}
        style={{
          left: `calc(50% + ${position.x * 42}%)`,
          top: `calc(50% + ${position.y * 42}%)`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </section>
  );
}
