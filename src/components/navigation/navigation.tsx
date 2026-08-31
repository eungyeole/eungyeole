import { Link } from "@tanstack/react-router";
import { NAVIGATION_TABS } from "./constant";
import { NavigationIndicator } from "./navigation-indicator";

interface NavigationProps {
  lang: string;
}

export const Navigation = ({ lang }: NavigationProps) => {
  return (
    <nav className="relative w-fit" aria-label="Primary navigation">
      <div className="flex w-full">
        {NAVIGATION_TABS.map((tab) => (
          <Link
            key={tab.value}
            to={tab.to}
            params={{ lang }}
            activeOptions={{ exact: tab.value === "/" }}
            className="flex cursor-pointer items-center gap-1 px-2 py-1 pr-2.5 text-sm font-medium [&_svg]:h-3 [&_svg]:w-3"
          >
            <tab.icon />
            {tab.label}
          </Link>
        ))}
      </div>
      <NavigationIndicator lang={lang} />
    </nav>
  );
};
