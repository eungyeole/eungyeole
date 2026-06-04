declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}

declare module "*.mdx" {
  import type { ComponentType } from "react";

  export const metadata:
    | {
        title: string;
        description: string;
        createdAt: string;
      }
    | undefined;

  const MDXComponent: ComponentType<Record<string, unknown>>;
  export default MDXComponent;
}
