import { Cuboid, SwatchBook, UserIcon } from "lucide-react";

export const NAVIGATION_TABS = [
  { label: "about", value: "/", icon: UserIcon },
  { label: "article", value: "/article", icon: SwatchBook },
  { label: "sandbox", value: "/sandbox", icon: Cuboid },
] as const;
