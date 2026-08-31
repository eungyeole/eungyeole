import { Link, useMatch } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { IdentityName } from "@/components/header/identity-name";
import { Navigation } from "@/components/navigation/navigation";
import { resolveSandboxText, type SandboxMetadata } from "@/utils/sandbox";

interface DynamicHeaderProps {
  lang: string;
}

export function DynamicHeader({ lang }: DynamicHeaderProps) {
  const metadata = useMatch({
    from: "/$lang/sandbox/$",
    shouldThrow: false,
    select: (match) => match.loaderData,
  });

  return (
    <header>{metadata ? <ContentHeader lang={lang} metadata={metadata} /> : <DefaultHeader lang={lang} />}</header>
  );
}

function DefaultHeader({ lang }: DynamicHeaderProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h1 className="text-md font-semibold">
          <IdentityName lang={lang} />
        </h1>
        <p className="text-sm font-medium text-gray-500">Frontend Engineer</p>
      </div>
      <div className="-mx-1">
        <Navigation lang={lang} />
      </div>
    </div>
  );
}

interface ContentHeaderProps {
  lang: string;
  metadata: SandboxMetadata;
}

function ContentHeader({ lang, metadata }: ContentHeaderProps) {
  const backLabel = lang === "en" ? "Back to Sandbox" : "Sandbox로 돌아가기";
  const visitLabel = lang === "en" ? "Visit project" : "프로젝트 보기";
  const sourceLabel = lang === "en" ? "View source" : "소스 보기";

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link
          to="/$lang/sandbox"
          params={{ lang }}
          aria-label={backLabel}
          className="outline-none"
        >
          <span className="grid size-7 place-items-center rounded-full text-gray-500 transition-colors hover:bg-accent-soft hover:text-accent">
            <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.75} />
          </span>
        </Link>

        <Link
          to="/$lang"
          params={{ lang }}
          className="text-sm font-semibold transition-colors hover:text-gray-500"
        >
          <IdentityName align="end" lang={lang} />
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <h1 id="content-title" className="truncate text-lg font-medium">
            {resolveSandboxText(metadata.title, lang)}
          </h1>
          <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-500">
            {resolveSandboxText(metadata.description, lang)}
          </p>
        </div>

        <HeaderActions metadata={metadata} sourceLabel={sourceLabel} visitLabel={visitLabel} />
      </div>
    </div>
  );
}

interface HeaderActionsProps {
  metadata: SandboxMetadata;
  sourceLabel: string;
  visitLabel: string;
}

function HeaderActions({ metadata, sourceLabel, visitLabel }: HeaderActionsProps) {
  if (!metadata.href && !metadata.source) return null;

  return (
    <div className="flex items-center gap-1">
      {metadata.href ? (
        <a
          href={metadata.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={visitLabel}
          title={visitLabel}
          className="grid size-7 place-items-center rounded-full text-gray-500 transition-colors hover:bg-surface-muted hover:text-foreground"
        >
          <ExternalLink aria-hidden="true" className="size-4" strokeWidth={1.75} />
        </a>
      ) : null}
      {metadata.source && metadata.source !== metadata.href ? (
        <a
          href={metadata.source}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={sourceLabel}
          title={sourceLabel}
          className="grid size-7 place-items-center rounded-full text-gray-500 transition-colors hover:bg-surface-muted hover:text-foreground"
        >
          <Github aria-hidden="true" className="size-4" strokeWidth={1.75} />
        </a>
      ) : null}
    </div>
  );
}
