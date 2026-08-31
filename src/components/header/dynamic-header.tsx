import { Trans } from "@lingui/react/macro";
import { Link, useMatch } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { motion, MotionConfig } from "motion/react";
import { Navigation } from "@/components/navigation/navigation";
import { resolveSandboxText } from "@/utils/sandbox";

interface DynamicHeaderProps {
  lang: string;
}

export function DynamicHeader({ lang }: DynamicHeaderProps) {
  const metadata = useMatch({
    from: "/$lang/sandbox/$",
    shouldThrow: false,
    select: (match) => match.loaderData,
  });

  const backLabel = lang === "en" ? "Back to Sandbox" : "Sandbox로 돌아가기";
  const visitLabel = lang === "en" ? "Visit project" : "프로젝트 보기";
  const sourceLabel = lang === "en" ? "View source" : "소스 보기";

  return (
    <MotionConfig reducedMotion="user">
      <header>
        {metadata ? (
          <div>
            <div className="flex items-center justify-between">
              <Link
                to="/$lang/sandbox"
                params={{ lang }}
                aria-label={backLabel}
                className="grid size-7 place-items-center text-gray-500 outline-none transition-colors hover:text-foreground"
              >
                <motion.span
                  className="grid size-7 place-items-center"
                  whileHover={{ x: -2 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                >
                  <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.75} />
                </motion.span>
              </Link>

              <Link
                to="/$lang"
                params={{ lang }}
                className="text-sm font-semibold transition-colors hover:text-gray-500"
              >
                <Trans>안은결</Trans>
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

              {metadata.href || metadata.source ? (
                <div className="flex items-center gap-1">
                  {metadata.href ? (
                    <a
                      href={metadata.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={visitLabel}
                      title={visitLabel}
                      className="grid size-7 place-items-center text-gray-500 transition-colors hover:text-foreground"
                    >
                      <motion.span whileHover={{ y: -1 }} whileTap={{ scale: 0.94 }}>
                        <ExternalLink aria-hidden="true" className="size-4" strokeWidth={1.75} />
                      </motion.span>
                    </a>
                  ) : null}
                  {metadata.source && metadata.source !== metadata.href ? (
                    <a
                      href={metadata.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={sourceLabel}
                      title={sourceLabel}
                      className="grid size-7 place-items-center text-gray-500 transition-colors hover:text-foreground"
                    >
                      <motion.span whileHover={{ y: -1 }} whileTap={{ scale: 0.94 }}>
                        <Github aria-hidden="true" className="size-4" strokeWidth={1.75} />
                      </motion.span>
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <h1 className="text-md font-semibold">
                <Trans>안은결</Trans>
              </h1>
              <p className="text-sm font-medium text-gray-500">Frontend Engineer</p>
            </div>
            <div className="-mx-1">
              <Navigation lang={lang} />
            </div>
          </div>
        )}
      </header>
    </MotionConfig>
  );
}
