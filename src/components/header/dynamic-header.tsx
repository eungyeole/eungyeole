import { Link, useMatch } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { Navigation } from "@/components/navigation/navigation";

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
    <header
      className={
        metadata ? "sticky top-0 z-30 -mx-4 bg-background/95 px-4 py-2 backdrop-blur-lg" : undefined
      }
    >
      {metadata ? <DetailNavigation lang={lang} /> : <DefaultHeader lang={lang} />}
    </header>
  );
}

function DefaultHeader({ lang }: DynamicHeaderProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h1 className="text-md font-semibold">
          {lang === "en" ? "Eungyeol An" : "안은결"}
        </h1>
        <p className="text-sm font-medium text-gray-500">Frontend Engineer</p>
      </div>
      <div className="-mx-1">
        <Navigation lang={lang} />
      </div>
    </div>
  );
}

function DetailNavigation({ lang }: DynamicHeaderProps) {
  const backLabel = lang === "en" ? "Back to Sandbox" : "Sandbox로 돌아가기";

  return (
    <div className="flex items-center justify-between">
      <Link to="/$lang/sandbox" params={{ lang }} aria-label={backLabel} className="outline-none">
        <motion.span
          className="grid size-7 place-items-center text-gray-500 transition-colors hover:text-foreground"
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.75} />
        </motion.span>
      </Link>

      <Link
        to="/$lang"
        params={{ lang }}
        className="text-sm font-semibold transition-colors hover:text-gray-500"
      >
        {lang === "en" ? "Eungyeol An" : "안은결"}
      </Link>
    </div>
  );
}
