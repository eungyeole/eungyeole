import { lang } from "next/root-params";
import { NavigationIndicator } from "./navigation-indicator";
import { NAVIGATION_TABS } from "./constant";
import Link from "next/link";
import { Suspense } from "react";

export const Navigation = async () => {
  const data = await lang();

  return (
    <div className="relative w-fit">
      <div className="w-full flex">
        {NAVIGATION_TABS.map((tab) => (
          <Link
            key={tab.value}
            href={tab.value}
            className="cursor-pointer px-2 pr-2.5 py-1 font-medium text-sm flex items-center gap-1 [&_svg]:w-3 [&_svg]:h-3"
          >
            <tab.icon />
            {tab.label}
          </Link>
        ))}
      </div>
      <Suspense>
        <NavigationIndicator lang={await lang()} />
      </Suspense>
    </div>
  );
};
