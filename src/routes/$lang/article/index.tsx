import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang/article/")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/$lang/sandbox",
      params: { lang: params.lang },
      replace: true,
    });
  },
});
