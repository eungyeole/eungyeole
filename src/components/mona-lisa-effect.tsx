"use client";

import { useEffect, useRef, useState } from "react";

const SMOOTHING = 0.08;
const DEAD_ZONE_RADIUS = 20;

interface MonaLisaEffectProps {
  children: React.ReactNode;
  max?: number;
  min?: number;
}

export const MonaLisaEffect = ({
  children,
  max = 360,
  min = -360,
}: MonaLisaEffectProps) => {
  const iconRef = useRef<HTMLDivElement>(null);

  const animationFrameId = useRef<number | null>(null);

  const currentRotation = useRef(0);
  const targetRotation = useRef(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (iconRef.current) {
        const { clientX, clientY } = event;
        const { left, top, width, height } =
          iconRef.current.getBoundingClientRect();

        const iconCenterX = left + width / 2;
        const iconCenterY = top + height / 2;

        const deltaX = clientX - iconCenterX;
        const deltaY = clientY - iconCenterY;

        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance > DEAD_ZONE_RADIUS) {
          let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;

          let normalizedAngle = angle % 360;
          if (normalizedAngle > 180) {
            normalizedAngle -= 360;
          } else if (normalizedAngle < -180) {
            normalizedAngle += 360;
          }

          if (normalizedAngle >= min && normalizedAngle <= max) {
            targetRotation.current = normalizedAngle;
          }
        }
      }
    };

    // 애니메이션을 처리하는 함수
    const animate = () => {
      let diff = targetRotation.current - currentRotation.current;

      if (diff > 180) diff -= 360;
      else if (diff < -180) diff += 360;

      currentRotation.current += diff * SMOOTHING;

      if (iconRef.current) {
        iconRef.current.style.transform = `rotate(${currentRotation.current}deg)`;
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // 마우스 이벤트 리스너 등록
    window.addEventListener("mousemove", handleMouseMove);

    // 애니메이션 루프 시작
    animationFrameId.current = requestAnimationFrame(animate);

    // 컴포넌트가 사라질 때(unmount) 이벤트 리스너와 애니메이션 루프를 정리
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div ref={iconRef} className="transition-transform duration-75 ease-linear">
      {children}
    </div>
  );
};
