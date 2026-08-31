"use client";

import { type PointerEvent, useEffect, useRef, useState } from "react";
import { IconEungyeole } from "@/components/assets/icon-eungyeole";
import { MonaLisaEffect } from "@/components/mona-lisa-effect";

const MIN_ANGLE = -120;
const MAX_ANGLE = -60;
const ANGLE_OFFSET = 90;
const ICON_POSITION = { x: 78, y: 50 };

export function MonaLisaEffectDemo() {
  return (
    <section
      aria-label="Mona Lisa Effect demo"
      className="relative min-h-60 w-full overflow-hidden rounded-2xl bg-preview-canvas text-preview-strong"
    >
      <DotPattern />
      <p className="absolute left-6 top-6 text-xs font-medium text-preview-muted">Move your pointer</p>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 sm:right-12">
        <span aria-hidden="true" className="absolute inset-1 rounded-full border border-black/10" />
        <MonaLisaEffect min={MIN_ANGLE} max={MAX_ANGLE} offset={ANGLE_OFFSET}>
          <div className="relative grid size-28 place-items-center rounded-full bg-preview-surface shadow-[0_24px_50px_-28px_rgba(0,0,0,0.32)]">
            <IconEungyeole className="size-20" />
          </div>
        </MonaLisaEffect>
      </div>
    </section>
  );
}

interface GeometrySample {
  angle: number;
  deltaX: number;
  deltaY: number;
  rotation: number;
  tracked: boolean;
  x: number;
  y: number;
}

const INITIAL_SAMPLE: GeometrySample = {
  angle: -90,
  deltaX: -160,
  deltaY: 0,
  rotation: 0,
  tracked: true,
  x: 24,
  y: 50,
};

export function MonaLisaGeometryDemo() {
  const surfaceRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const [sample, setSample] = useState(INITIAL_SAMPLE);

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const surface = surfaceRef.current;
    if (!surface) return;

    const bounds = surface.getBoundingClientRect();
    const localX = event.clientX - bounds.left;
    const localY = event.clientY - bounds.top;
    const deltaX = localX - (bounds.width * ICON_POSITION.x) / 100;
    const deltaY = localY - (bounds.height * ICON_POSITION.y) / 100;
    const angle = normalizeAngle(Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90);
    const tracked = Math.hypot(deltaX, deltaY) > 20 && angle >= MIN_ANGLE && angle <= MAX_ANGLE;

    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      setSample((current) => ({
        angle,
        deltaX,
        deltaY,
        rotation: tracked ? angle + ANGLE_OFFSET : current.rotation,
        tracked,
        x: (localX / bounds.width) * 100,
        y: (localY / bounds.height) * 100,
      }));
    });
  };

  return (
    <section
      aria-label="Pointer angle visualizer"
      className="relative min-h-72 w-full touch-pan-y overflow-hidden rounded-lg border border-preview-border bg-preview-surface text-preview-strong"
      onPointerMove={handlePointerMove}
      ref={surfaceRef}
    >
      <DotPattern muted />
      <p className="absolute left-5 top-4 text-xs text-preview-muted">Move inside the canvas</p>

      <svg aria-hidden="true" className="absolute inset-0 size-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <line
          x1={ICON_POSITION.x}
          y1={ICON_POSITION.y}
          x2={sample.x}
          y2={sample.y}
          stroke={sample.tracked ? "var(--preview-strong)" : "var(--preview-border)"}
          strokeDasharray="2 2"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <span
        aria-hidden="true"
        className={`absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${sample.tracked ? "bg-preview-strong" : "bg-preview-border"}`}
        style={{ left: `${sample.x}%`, top: `${sample.y}%` }}
      />

      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${ICON_POSITION.x}%`, top: `${ICON_POSITION.y}%` }}
      >
        <div
          className="grid size-20 place-items-center rounded-full bg-preview-surface shadow-sm motion-reduce:!transform-none"
          style={{ transform: `rotate(${sample.rotation}deg)` }}
        >
          <IconEungyeole aria-hidden="true" className="size-14" />
        </div>
      </div>

      <div className="absolute bottom-4 left-5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] tabular-nums text-preview-muted">
        <span>Δx {Math.round(sample.deltaX)}</span>
        <span>Δy {Math.round(sample.deltaY)}</span>
        <span>angle {Math.round(sample.angle)}°</span>
      </div>
    </section>
  );
}

export function MonaLisaTuningDemo() {
  const [smoothing, setSmoothing] = useState(0.08);
  const [deadZone, setDeadZone] = useState(20);
  const [range, setRange] = useState(30);

  return (
    <section
      aria-label="Mona Lisa Effect tuning playground"
      className="overflow-hidden rounded-lg border border-preview-border bg-preview-surface text-preview-strong"
    >
      <div className="relative min-h-64 overflow-hidden bg-preview-canvas">
        <DotPattern />
        <p className="absolute left-5 top-4 text-xs font-medium text-preview-muted">Try your settings</p>

        <div className="absolute right-9 top-1/2 -translate-y-1/2 sm:right-16">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-preview-muted/50"
            style={{ width: deadZone * 2, height: deadZone * 2 }}
          />
          <MonaLisaEffect
            deadZone={deadZone}
            min={-90 - range}
            max={-90 + range}
            offset={ANGLE_OFFSET}
            smoothing={smoothing}
          >
            <div className="grid size-24 place-items-center rounded-full bg-preview-surface shadow-[0_24px_50px_-28px_rgba(0,0,0,0.32)]">
              <IconEungyeole aria-hidden="true" className="size-17" />
            </div>
          </MonaLisaEffect>
        </div>
      </div>

      <div className="grid gap-5 p-5 sm:grid-cols-3">
        <RangeControl
          label="Smoothing"
          max={0.3}
          min={0.02}
          onChange={setSmoothing}
          step={0.01}
          value={smoothing}
          valueLabel={smoothing.toFixed(2)}
        />
        <RangeControl
          label="Dead zone"
          max={60}
          min={0}
          onChange={setDeadZone}
          step={2}
          value={deadZone}
          valueLabel={`${deadZone}px`}
        />
        <RangeControl
          label="Range"
          max={70}
          min={10}
          onChange={setRange}
          step={5}
          value={range}
          valueLabel={`±${range}°`}
        />
      </div>
    </section>
  );
}

interface RangeControlProps {
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step: number;
  value: number;
  valueLabel: string;
}

function RangeControl({ label, max, min, onChange, step, value, valueLabel }: RangeControlProps) {
  return (
    <label className="block text-xs text-preview-muted">
      <span className="flex items-center justify-between gap-3">
        <span>{label}</span>
        <output className="font-mono tabular-nums text-preview-muted">{valueLabel}</output>
      </span>
      <input
        className="mt-3 block w-full accent-preview-strong"
        max={max}
        min={min}
        onChange={(event) => onChange(Number(event.currentTarget.value))}
        step={step}
        type="range"
        value={value}
      />
    </label>
  );
}

function DotPattern({ muted = false }: { muted?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute inset-0 [background-image:radial-gradient(currentColor_0.7px,transparent_0.7px)] [background-size:13px_13px] ${muted ? "text-preview-border opacity-70" : "text-preview-muted opacity-25"}`}
    />
  );
}

function normalizeAngle(angle: number) {
  let normalized = angle % 360;
  if (normalized > 180) normalized -= 360;
  else if (normalized < -180) normalized += 360;
  return normalized;
}
