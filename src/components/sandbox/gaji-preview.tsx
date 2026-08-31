import { ArrowUpRight } from "lucide-react";

const GAJI_URL = "https://gaji.eungyeole.com";
const GAJI_SCREENSHOT_URL = "https://raw.githubusercontent.com/eungyeole/gaji/master/docs/public/gaji-workspace.png";

export function GajiPreview() {
  return (
    <a
      aria-label="Open the Gaji product website in a new tab"
      className="group/gaji relative isolate flex min-h-72 w-full items-center justify-center overflow-hidden rounded-2xl bg-[#dfe3e6] p-4 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent sm:min-h-[360px] sm:p-9 dark:bg-[#202225]"
      href={GAJI_URL}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_5%,rgba(255,255,255,0.95),rgba(255,255,255,0)_58%)] dark:bg-[radial-gradient(circle_at_50%_5%,rgba(255,255,255,0.13),rgba(255,255,255,0)_60%)]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(36,42,48,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(36,42,48,0.08)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)] dark:opacity-20"
      />

      <span className="relative w-full max-w-[680px] translate-y-4 overflow-hidden rounded-xl border border-black/15 bg-[#202124] shadow-[0_30px_70px_-28px_rgba(17,23,28,0.65)] transition-transform duration-500 ease-out group-hover/gaji:-translate-y-0.5 group-hover/gaji:scale-[1.01] motion-reduce:transition-none sm:translate-y-7 dark:border-white/15">
        <span aria-hidden="true" className="flex h-7 items-center gap-1.5 border-b border-white/10 bg-[#2a2b2e] px-3">
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
          <span className="ml-auto font-mono text-[9px] text-white/40">Gaji</span>
        </span>
        <img
          alt="Gaji showing branches, commit history, changed files, and a code diff"
          className="block aspect-[1584/993] w-full object-cover object-top"
          decoding="async"
          height={993}
          loading="lazy"
          src={GAJI_SCREENSHOT_URL}
          width={1584}
        />
      </span>

      <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/85 px-2.5 py-1.5 text-[10px] font-semibold text-[#252a2e] shadow-sm backdrop-blur transition-transform duration-300 group-hover/gaji:-translate-y-0.5 motion-reduce:transition-none sm:bottom-5 sm:right-5 dark:border-white/10 dark:bg-[#303236]/85 dark:text-white/85">
        Visit Gaji
        <ArrowUpRight aria-hidden="true" className="size-3" strokeWidth={2} />
      </span>
    </a>
  );
}
