import { createFileRoute } from "@tanstack/react-router";
import Ping from "@/content/ping.mdx";

export const Route = createFileRoute("/$lang/ping")({
  component: () => <Ping />,
});
