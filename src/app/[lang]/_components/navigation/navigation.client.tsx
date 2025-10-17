"use client";
import { Tabs, TabsList, TabsTab } from "@/components/ui/tabs";
import { Cuboid, SwatchBook, UserIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface NavigationClientProps {
  lang: string;
}

const TABS = [
  { label: "about", value: "/", icon: UserIcon },
  { label: "article", value: "/article", icon: SwatchBook },
  { label: "sandbox", value: "/sandbox", icon: Cuboid },
];

export const NavigationClient = ({ lang }: NavigationClientProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const cleaned = pathname.replace(`/${lang}`, "") || "/";
  const path = cleaned.split("/")[1];
  const value = path ? `/${path}` : "/";

  const handleValueChange = (value: string) => {
    router.push(value === "/" ? `/${lang}` : `/${lang}${value}`);
  };

  return (
    <Tabs value={value} onValueChange={handleValueChange}>
      <TabsList>
        {TABS.map((tab) => (
          <TabsTab key={tab.value} value={tab.value}>
            <tab.icon />
            {tab.label}
          </TabsTab>
        ))}
      </TabsList>
    </Tabs>
  );
};
