import { Link } from "@tanstack/react-router";
import { NAVIGATION_TABS } from "./constant";
import { NavigationIndicator } from "./navigation-indicator";

interface NavigationProps {
  lang: string;
}

export const Navigation = ({ lang }: NavigationProps) => {
  return (
    <nav className="relative w-fit rounded-full bg-surface-muted p-0.5" aria-label="Primary navigation">
      <div className="flex w-full">
        {NAVIGATION_TABS.map((tab) => (
          <Link
            key={tab.value}
            to={tab.to}
            params={{ lang }}
            activeOptions={{ exact: tab.value === "/" }}
            className="relative z-0 flex cursor-pointer items-center rounded-full px-3 py-1.5 text-[13px] font-medium text-muted transition-colors duration-200 hover:text-foreground"
          >
            {tab.label}
          </Link>
        ))}
      </div>
      <NavigationIndicator lang={lang} />
    </nav>
  );
};
