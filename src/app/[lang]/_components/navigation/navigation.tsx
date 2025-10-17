import { lang } from "next/root-params";
import { NavigationClient } from "./navigation.client";
import { Suspense } from "react";

export const Navigation = async () => {
  return (
    <Suspense fallback={null}>
      <NavigationClient lang={await lang()} />
    </Suspense>
  );
};
