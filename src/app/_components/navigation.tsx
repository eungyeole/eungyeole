"use client";

import { Tabs, TabsList, TabsTab } from "@/components/ui/tabs";
import { Cuboid, SwatchBook, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split("/")[1];
  const value = `/${path}`;

  const handleValueChange = (value: string) => {
    router.push(value);
  };

  return (
    <Tabs value={value} onValueChange={handleValueChange}>
      <TabsList>
        <TabsTab value="/">
          <UserIcon />
          about
        </TabsTab>
        <TabsTab value="/article">
          <SwatchBook />
          article
        </TabsTab>
        <TabsTab value="/sandbox">
          <Cuboid />
          sandbox
        </TabsTab>
      </TabsList>
    </Tabs>
  );
};
