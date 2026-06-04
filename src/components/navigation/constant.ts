import { Cuboid, SwatchBook, UserIcon } from "lucide-react";

export const NAVIGATION_TABS = [
  { label: "about", value: "/", to: "/$lang", icon: UserIcon },
  { label: "article", value: "/article", to: "/$lang/article", icon: SwatchBook },
  { label: "sandbox", value: "/sandbox", to: "/$lang/sandbox", icon: Cuboid },
] as const;
