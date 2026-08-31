"use client";

import { ArrowRight, RotateCcw } from "lucide-react";
import { useState } from "react";

const REDIRECTS = [
  { status: 308, label: "308 Permanent" },
  { status: 307, label: "307 Temporary" },
] as const;

const DESTINATIONS = [
  { id: "a", label: "A" },
  { id: "b", label: "B" },
] as const;

type RedirectStatus = (typeof REDIRECTS)[number]["status"];
type Destination = (typeof DESTINATIONS)[number]["id"];
type ResultSource = "idle" | "server-307" | "server-308" | "cache";

export function RedirectDemo() {
  const [status, setStatus] = useState<RedirectStatus>(308);
  const [serverDestination, setServerDestination] = useState<Destination>("a");
  const [cachedDestination, setCachedDestination] = useState<Destination | null>(null);
  const [result, setResult] = useState<Destination | null>(null);
  const [resultSource, setResultSource] = useState<ResultSource>("idle");

  const requestRedirect = () => {
    if (cachedDestination) {
      setResult(cachedDestination);
      setResultSource("cache");
      return;
    }

    setResult(serverDestination);
    setResultSource(status === 308 ? "server-308" : "server-307");

    if (status === 308) {
      setCachedDestination(serverDestination);
    }
  };

  const clearCache = () => {
    setCachedDestination(null);
    setResult(null);
    setResultSource("idle");
  };

  return (
    <section
      aria-label="Redirect cache playground"
      className="w-full overflow-hidden rounded-lg border border-preview-border bg-preview-surface text-preview-strong"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-preview-border p-3">
        <div aria-label="Redirect status" className="flex rounded-md bg-preview-canvas p-0.5" role="group">
          {REDIRECTS.map((redirect) => (
            <button
              aria-pressed={status === redirect.status}
              className={`rounded-[0.3rem] px-2.5 py-1.5 font-mono text-[11px] transition-colors ${
                status === redirect.status
                  ? "bg-preview-surface text-preview-strong shadow-sm"
                  : "text-preview-muted hover:text-preview-strong"
              }`}
              key={redirect.status}
              onClick={() => setStatus(redirect.status)}
              type="button"
            >
              {redirect.label}
            </button>
          ))}
        </div>

        <button
          className="inline-flex items-center gap-1.5 text-xs text-preview-muted transition-colors hover:text-preview-strong disabled:cursor-default disabled:opacity-40"
          disabled={!cachedDestination}
          onClick={clearCache}
          type="button"
        >
          <RotateCcw aria-hidden="true" className="size-3" />
          캐시 지우기
        </button>
      </div>

      <div className="bg-preview-canvas p-4 sm:p-5">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-preview-muted">서버 목적지</span>
          <div aria-label="Server destination" className="flex gap-1" role="group">
            {DESTINATIONS.map((destination) => (
              <button
                aria-pressed={serverDestination === destination.id}
                className={`grid size-7 place-items-center rounded-md text-xs font-medium transition-colors ${
                  serverDestination === destination.id
                    ? "bg-preview-strong text-preview-surface"
                    : "bg-preview-surface text-preview-muted hover:text-preview-strong"
                }`}
                key={destination.id}
                onClick={() => setServerDestination(destination.id)}
                type="button"
              >
                {destination.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2">
          <RouteNode label="요청" path="/login" />
          <ArrowRight aria-hidden="true" className="size-4 text-preview-muted" strokeWidth={1.8} />
          <RouteNode label={resultSourceLabel(resultSource)} path={result ? `/workspaces/${result}` : "—"} />
        </div>

        <button
          className="mt-4 w-full rounded-md bg-preview-strong px-3 py-2 text-xs font-medium text-preview-surface transition-opacity hover:opacity-80"
          onClick={requestRedirect}
          type="button"
        >
          요청 보내기
        </button>
      </div>

      <div
        aria-live="polite"
        className="flex items-center justify-between gap-3 border-t border-preview-border px-4 py-3"
      >
        <span className="text-xs text-preview-muted">브라우저 캐시</span>
        <code className="border-0 bg-transparent p-0 text-[11px] text-preview-strong">
          {cachedDestination ? `/login → /workspaces/${cachedDestination}` : "비어 있음"}
        </code>
      </div>
    </section>
  );
}

function resultSourceLabel(source: ResultSource) {
  if (source === "cache") return "브라우저 캐시";
  if (source === "server-308") return "서버 · 308";
  if (source === "server-307") return "서버 · 307";
  return "결과";
}

interface RouteNodeProps {
  label: string;
  path: string;
}

function RouteNode({ label, path }: RouteNodeProps) {
  return (
    <div className="min-w-0 rounded-lg border border-preview-border bg-preview-surface px-3 py-3">
      <p className="text-[10px] text-preview-muted">{label}</p>
      <p className="mt-1 truncate font-mono text-[11px] font-medium">{path}</p>
    </div>
  );
}
