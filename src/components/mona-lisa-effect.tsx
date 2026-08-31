"use client";

import { type HTMLAttributes, type ReactNode, useEffect, useRef } from "react";

const DEFAULT_SMOOTHING = 0.08;
const DEFAULT_DEAD_ZONE = 20;
const SETTLED_THRESHOLD = 0.01;

interface MonaLisaEffectProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children: ReactNode;
  deadZone?: number;
  max?: number;
  min?: number;
  offset?: number;
  smoothing?: number;
}

export const MonaLisaEffect = ({
  children,
  deadZone = DEFAULT_DEAD_ZONE,
  max = 360,
  min = -360,
  offset = 0,
  smoothing = DEFAULT_SMOOTHING,
  ...props
}: MonaLisaEffectProps) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const currentRotation = useRef(0);
  const targetRotation = useRef(0);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = motionPreference.matches;

    const stopAnimation = () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };

    const animate = () => {
      let diff = targetRotation.current - currentRotation.current;

      if (diff > 180) diff -= 360;
      else if (diff < -180) diff += 360;

      if (Math.abs(diff) <= SETTLED_THRESHOLD) {
        currentRotation.current = targetRotation.current;
        if (iconRef.current) iconRef.current.style.transform = `rotate(${currentRotation.current}deg)`;
        animationFrameId.current = null;
        return;
      }

      const smoothingFactor = Math.min(1, Math.max(0.01, smoothing));
      currentRotation.current += diff * smoothingFactor;

      if (iconRef.current) {
        iconRef.current.style.transform = `rotate(${currentRotation.current}deg)`;
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (animationFrameId.current === null) {
        animationFrameId.current = requestAnimationFrame(animate);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const icon = iconRef.current;
      if (!icon || prefersReducedMotion) return;

      const { left, top, width, height } = icon.getBoundingClientRect();
      const deltaX = event.clientX - (left + width / 2);
      const deltaY = event.clientY - (top + height / 2);

      if (Math.hypot(deltaX, deltaY) <= deadZone) return;

      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
      let normalizedAngle = angle % 360;

      if (normalizedAngle > 180) normalizedAngle -= 360;
      else if (normalizedAngle < -180) normalizedAngle += 360;

      if (normalizedAngle < min || normalizedAngle > max) return;

      targetRotation.current = normalizedAngle + offset;
      startAnimation();
    };

    const handleMotionPreference = () => {
      prefersReducedMotion = motionPreference.matches;

      if (prefersReducedMotion) {
        stopAnimation();
        currentRotation.current = 0;
        targetRotation.current = 0;
        if (iconRef.current) iconRef.current.style.transform = "rotate(0deg)";
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    motionPreference.addEventListener("change", handleMotionPreference);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      motionPreference.removeEventListener("change", handleMotionPreference);
      stopAnimation();
    };
  }, [deadZone, max, min, offset, smoothing]);

  return (
    <div ref={iconRef} {...props}>
      {children}
    </div>
  );
};
