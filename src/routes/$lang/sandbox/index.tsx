import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/sandbox/card";

export const Route = createFileRoute("/$lang/sandbox/")({
  component: Sandbox,
});

function Sandbox() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {Array.from({ length: 10 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static placeholder list
        <Card key={index}>adad</Card>
      ))}
    </div>
  );
}
