import { createRouter } from "@tanstack/react-router";
import { Loader } from "lucide-react";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createRouter({
    routeTree,
    defaultPreload: "intent",
    scrollRestoration: true,
    defaultPendingComponent: () => (
      <div className="z-50 fixed inset-0 bg-background text-base flex items-center justify-center">
        <Loader className="animate-spin text-gray-500" />
      </div>
    ),
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
