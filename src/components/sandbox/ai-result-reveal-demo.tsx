"use client";

import { Check, ChevronDown, Pause, Play, RefreshCw, Sparkles } from "lucide-react";
import { type CSSProperties, useState } from "react";
import "./ai-result-reveal-demo.css";

const ROTATE_DURATION = 1200;
const FILL_DURATION = 800;
const REVEAL_DURATION = 600;
const SECTION_DELAY = 300;

interface Playback {
  fillAngle: number;
  rotation: number;
  sections: number[];
}

interface AiSummaryCardProps {
  compact?: boolean;
  onToggle: () => void;
  open: boolean;
  playback?: Playback;
}

export function AiResultRevealPreview() {
  return <AiResultRevealExperience compact />;
}

export function AiResultRevealDemo() {
  return <AiResultRevealExperience />;
}

export function AiGradientLayerDemo() {
  const [playing, setPlaying] = useState(true);

  return (
    <section
      aria-label="Rotating gradient background layer"
      className="relative overflow-hidden rounded-lg border border-preview-border bg-preview-canvas"
    >
      <button
        aria-label={playing ? "Pause gradient" : "Play gradient"}
        className="absolute top-3 right-3 z-10 grid size-8 place-items-center rounded-full text-preview-muted transition-[color,transform] hover:text-preview-strong active:scale-95"
        onClick={() => setPlaying((value) => !value)}
        type="button"
      >
        {playing ? (
          <Pause aria-hidden="true" className="size-3.5" />
        ) : (
          <Play aria-hidden="true" className="size-3.5" />
        )}
      </button>

      <div className="grid min-h-64 place-items-center p-7 sm:p-10">
        <div
          aria-hidden="true"
          className={`ai-gradient-layer-canvas aspect-[8/5] w-full max-w-sm ${
            playing ? "" : "ai-gradient-layer-canvas--paused"
          }`}
        />
      </div>
    </section>
  );
}

export function AiGradientInterpolationDemo() {
  const [playing, setPlaying] = useState(true);
  const canvases = [
    { className: "ai-gradient-comparison-canvas--discrete", label: "background-image" },
    { className: "ai-gradient-comparison-canvas--property", label: "@property" },
  ];

  return (
    <section
      aria-label="Gradient animation comparison"
      className="relative overflow-hidden rounded-lg border border-preview-border bg-preview-canvas"
    >
      <button
        aria-label={playing ? "Pause comparison" : "Play comparison"}
        className="absolute top-3 right-3 z-10 grid size-8 place-items-center rounded-full text-preview-muted transition-[color,transform] hover:text-preview-strong active:scale-95"
        onClick={() => setPlaying((value) => !value)}
        type="button"
      >
        {playing ? (
          <Pause aria-hidden="true" className="size-3.5" />
        ) : (
          <Play aria-hidden="true" className="size-3.5" />
        )}
      </button>

      <div className="grid min-h-64 grid-cols-2 items-center gap-3 px-4 py-10 sm:gap-5 sm:px-8">
        {canvases.map((canvas) => (
          <div className="min-w-0" key={canvas.label}>
            <div
              aria-label={`${canvas.label} gradient result`}
              className={`ai-gradient-comparison-canvas aspect-[4/3] w-full ${canvas.className} ${
                playing ? "" : "ai-gradient-comparison-canvas--paused"
              }`}
              role="img"
            >
              <span
                aria-hidden="true"
                className="absolute inset-[2px] rounded-[11px] bg-preview-surface shadow-[inset_0_0_0_1px_var(--preview-border)]"
              />
            </div>
            <p className="mt-2 text-center font-mono text-[10px] text-preview-muted">{canvas.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AiGradientMaskDemo() {
  const [cardOpacity, setCardOpacity] = useState(100);

  return (
    <section
      aria-label="Gradient background and card layer"
      className="overflow-hidden rounded-lg border border-preview-border bg-preview-surface text-preview-strong"
    >
      <div className="grid min-h-64 place-items-center bg-preview-canvas p-7 sm:p-10">
        <div className="ai-gradient-layer-canvas aspect-[8/5] w-full max-w-sm">
          <span
            aria-hidden="true"
            className="absolute inset-[2px] rounded-[13px] bg-preview-surface shadow-[inset_0_0_0_1px_var(--preview-border)]"
            style={{ opacity: cardOpacity / 100 }}
          />
        </div>
      </div>

      <label className="flex items-center gap-4 border-t border-preview-border px-4 py-3 text-xs text-preview-muted">
        <span>Card layer</span>
        <input
          aria-label="Card layer opacity"
          className="min-w-0 flex-1 accent-preview-strong"
          max={100}
          min={0}
          onChange={(event) => setCardOpacity(Number(event.currentTarget.value))}
          type="range"
          value={cardOpacity}
        />
        <output className="w-9 text-right font-mono tabular-nums">{cardOpacity}%</output>
      </label>
    </section>
  );
}

export function AiGradientFillDemo() {
  const [angle, setAngle] = useState(90);
  const style = { "--ai-demo-fill-angle": `${angle}deg` } as CSSProperties;

  return (
    <section
      aria-label="Gradient fill angle"
      className="overflow-hidden rounded-lg border border-preview-border bg-preview-surface text-preview-strong"
    >
      <div className="grid min-h-64 place-items-center bg-preview-canvas p-7 sm:p-10">
        <div className="ai-gradient-fill-canvas aspect-[8/5] w-full max-w-sm" style={style}>
          <span
            aria-hidden="true"
            className="absolute inset-[2px] rounded-[13px] bg-preview-surface shadow-[inset_0_0_0_1px_var(--preview-border)]"
          />
        </div>
      </div>

      <label className="flex items-center gap-4 border-t border-preview-border px-4 py-3 text-xs text-preview-muted">
        <span>Fill angle</span>
        <input
          aria-label="Gradient fill angle"
          className="min-w-0 flex-1 accent-preview-strong"
          max={360}
          min={90}
          onChange={(event) => setAngle(Number(event.currentTarget.value))}
          type="range"
          value={angle}
        />
        <output className="w-10 text-right font-mono tabular-nums">{angle}°</output>
      </label>
    </section>
  );
}

export function AiResultTimelineDemo() {
  const [elapsed, setElapsed] = useState(1200);
  const [open, setOpen] = useState(true);
  const rotationProgress = easeInOut(clamp(elapsed / ROTATE_DURATION));
  const fillProgress = easeOut(clamp((elapsed - ROTATE_DURATION) / FILL_DURATION));
  const playback: Playback = {
    rotation: rotationProgress * 360,
    fillAngle: 90 + fillProgress * 270,
    sections: [0, 1, 2].map((index) =>
      easeOut(clamp((elapsed - index * SECTION_DELAY) / REVEAL_DURATION)),
    ),
  };

  return (
    <section
      aria-label="AI result reveal timeline"
      className="overflow-hidden rounded-lg border border-preview-border bg-preview-surface text-preview-strong"
    >
      <div className="grid min-h-[25rem] place-items-center bg-preview-canvas px-4 py-10 sm:px-8">
        <AiSummaryCard onToggle={() => setOpen((value) => !value)} open={open} playback={playback} />
      </div>

      <label className="flex items-center gap-4 border-t border-preview-border px-4 py-3 text-xs text-preview-muted">
        <span>Progress</span>
        <input
          aria-label="Animation progress"
          className="min-w-0 flex-1 accent-preview-strong"
          max={ROTATE_DURATION + FILL_DURATION}
          min={0}
          onChange={(event) => setElapsed(Number(event.currentTarget.value))}
          step={10}
          type="range"
          value={elapsed}
        />
        <output className="w-9 text-right font-mono tabular-nums">{(elapsed / 1000).toFixed(1)}s</output>
      </label>
    </section>
  );
}

function AiResultRevealExperience({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(true);
  const [cycle, setCycle] = useState(0);

  const toggle = () => {
    if (open) {
      setOpen(false);
      return;
    }

    setOpen(true);
    setCycle((value) => value + 1);
  };

  const replay = () => {
    setOpen(true);
    setCycle((value) => value + 1);
  };

  return (
    <section
      aria-label="AI result reveal"
      className={`relative grid w-full place-items-center overflow-hidden bg-preview-canvas px-4 ${
        compact ? "min-h-60 py-5" : "min-h-[25rem] rounded-lg border border-preview-border py-12 sm:px-8"
      }`}
    >
      {!compact ? (
        <button
          aria-label="Replay animation"
          className="absolute top-3 right-3 z-10 grid size-8 place-items-center rounded-full text-preview-muted transition-[color,transform] hover:text-preview-strong active:scale-95"
          onClick={replay}
          type="button"
        >
          <RefreshCw aria-hidden="true" className="size-4" />
        </button>
      ) : null}

      <AiSummaryCard compact={compact} key={cycle} onToggle={toggle} open={open} />
    </section>
  );
}

function AiSummaryCard({ compact = false, onToggle, open, playback }: AiSummaryCardProps) {
  const frameStyle = playback
    ? ({
        "--ai-reveal-controlled-fill-angle": `${playback.fillAngle}deg`,
        "--ai-reveal-controlled-rotation": `${playback.rotation}deg`,
      } as CSSProperties)
    : undefined;

  return (
    <div
      className={`ai-result-frame w-full ${compact ? "max-w-[21rem]" : "max-w-[34rem]"} ${
        playback ? "ai-result-frame--controlled" : ""
      }`}
      style={frameStyle}
    >
      <div className="ai-result-card shadow-[0_20px_55px_-35px_rgba(43,42,40,0.55)]">
        <button
          aria-expanded={open}
          className={`flex w-full items-center justify-between gap-2 text-left ${
            compact ? "px-3 py-2.5" : "px-4 py-3"
          }`}
          onClick={onToggle}
          type="button"
        >
          <span className="flex min-w-0 items-center gap-1.5">
            <Sparkles aria-hidden="true" className="size-3.5 shrink-0 text-accent" strokeWidth={1.8} />
            <span className="truncate text-xs font-semibold">AI 문서 요약</span>
          </span>

          <ChevronDown
            aria-hidden="true"
            className={`size-3.5 shrink-0 text-preview-muted transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div
              className={`flex flex-col border-t border-preview-border/70 ${
                compact ? "gap-3 px-3 pt-3 pb-4" : "gap-5 px-4 pt-4 pb-5"
              }`}
            >
              <RevealSection index={0} playback={playback}>
                <p className={`${compact ? "text-[11px] leading-5" : "text-sm leading-6"} text-preview-strong`}>
                  긴 문서에서 반복되는 내용을 덜어내고 핵심 흐름을 세 문장으로 정리했습니다.
                </p>
              </RevealSection>

              <RevealSection index={1} playback={playback}>
                <ResultGroup compact={compact} title="핵심 내용">
                  <ResultItem>문제의 배경과 목표가 명확하게 연결되어 있어요</ResultItem>
                  {!compact ? <ResultItem>결론을 뒷받침하는 근거가 세 가지 있어요</ResultItem> : null}
                </ResultGroup>
              </RevealSection>

              {!compact ? (
                <RevealSection index={2} playback={playback}>
                  <ResultGroup title="더 살펴볼 내용">
                    <p className="text-xs leading-5 text-preview-muted">본문에서 인용한 수치의 출처를 확인해 보세요.</p>
                  </ResultGroup>
                </RevealSection>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RevealSection({
  children,
  index,
  playback,
}: {
  children: React.ReactNode;
  index: number;
  playback?: Playback;
}) {
  const progress = playback?.sections[index];
  const style =
    progress === undefined
      ? { animationDelay: `${index * SECTION_DELAY}ms` }
      : {
          opacity: progress,
          filter: `blur(${(1 - progress) * 2}px)`,
          transform: `translateY(${(1 - progress) * 5}px)`,
        };

  return (
    <div
      className={`ai-result-section ${playback ? "ai-result-section--controlled" : ""}`}
      style={style}
    >
      {children}
    </div>
  );
}

function ResultGroup({
  children,
  compact = false,
  title,
}: {
  children: React.ReactNode;
  compact?: boolean;
  title: string;
}) {
  return (
    <div className="space-y-2">
      <p className={`${compact ? "text-[11px]" : "text-xs"} font-semibold`}>{title}</p>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function ResultItem({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-2 text-[11px] leading-5 text-preview-muted">
      <Check aria-hidden="true" className="mt-1 size-3 shrink-0 text-accent" strokeWidth={2.2} />
      <span>{children}</span>
    </p>
  );
}

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function easeOut(value: number) {
  return 1 - (1 - value) ** 3;
}

function easeInOut(value: number) {
  return value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2;
}
