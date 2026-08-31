"use client";

import { Check, ChevronDown, RefreshCw, Sparkles } from "lucide-react";
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

interface AiReviewCardProps {
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
        <AiReviewCard onToggle={() => setOpen((value) => !value)} open={open} playback={playback} />
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

      <AiReviewCard compact={compact} key={cycle} onToggle={toggle} open={open} />
    </section>
  );
}

function AiReviewCard({ compact = false, onToggle, open, playback }: AiReviewCardProps) {
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
          className={`flex w-full items-center justify-between gap-3 text-left ${compact ? "p-3" : "p-4"}`}
          onClick={onToggle}
          type="button"
        >
          <span className="flex min-w-0 items-center gap-2">
            <Sparkles aria-hidden="true" className="size-4 shrink-0 text-accent" strokeWidth={1.8} />
            <span className="truncate text-sm font-semibold">AI 서류 평가</span>
            <span className="rounded-full bg-accent-soft px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-accent">
              BETA
            </span>
          </span>

          <span className="flex shrink-0 items-center gap-2">
            <span className="rounded-md border border-preview-border px-2 py-1 text-[10px] text-preview-muted">
              86점 예측
            </span>
            <ChevronDown
              aria-hidden="true"
              className={`size-4 text-preview-muted transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </span>
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
                  제품의 문제를 정의하고 여러 직군과 협업해 개선한 경험이 고르게 드러납니다.
                </p>
              </RevealSection>

              <RevealSection index={1} playback={playback}>
                <ResultGroup compact={compact} title="선호 조건에 일치해요">
                  <ResultItem>사용자 관점에서 문제를 정의한 경험</ResultItem>
                  {!compact ? <ResultItem>디자인과 개발을 연결한 협업 경험</ResultItem> : null}
                </ResultGroup>
              </RevealSection>

              {!compact ? (
                <RevealSection index={2} playback={playback}>
                  <ResultGroup title="면접에서 확인해 보세요">
                    <p className="text-xs leading-5 text-preview-muted">성과를 판단한 기준과 개선 이후의 변화를 확인해 보세요.</p>
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
