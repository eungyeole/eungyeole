import { Link } from "@tanstack/react-router";
import { NAVIGATION_TABS } from "./constant";
import { NavigationIndicator } from "./navigation-indicator";

interface NavigationProps {
  lang: string;
}

export const Navigation = ({ lang }: NavigationProps) => {
  return (
    <div className="relative w-fit">
      <div className="w-full flex">
        {NAVIGATION_TABS.map((tab) => (
          <Link
            key={tab.value}
            to={tab.to}
            params={{ lang }}
            className="cursor-pointer px-2 pr-2.5 py-1 font-medium text-sm flex items-center gap-1 [&_svg]:w-3 [&_svg]:h-3"
          >
            <tab.icon />
            {tab.label}
          </Link>
        ))}
      </div>
      <NavigationIndicator lang={lang} />
    </div>
  );
};
