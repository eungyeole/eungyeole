import { Cuboid, UserIcon } from "lucide-react";

export const NAVIGATION_TABS = [
  { label: "about", value: "/", to: "/$lang", icon: UserIcon },
  { label: "sandbox", value: "/sandbox", to: "/$lang/sandbox", icon: Cuboid },
] as const;
