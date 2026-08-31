declare module "*.po" {
  import type { Messages } from "@lingui/core";

  export const messages: Messages;
}

declare module "*.mdx" {
  import type { ComponentType } from "react";

  type LocalizedText = string | { ko: string; en: string };

  export const metadata:
    | {
        title: LocalizedText;
        description: LocalizedText;
        kind?: "project" | "experiment" | "note";
        layout?: "wide" | "half";
        createdAt?: string;
        date?: string;
        order?: number;
        href?: string;
        source?: string;
        tags?: string[];
        draft?: boolean;
        featured?: boolean;
      }
    | undefined;

  export const Preview: ComponentType<Record<string, unknown>> | undefined;

  const MDXComponent: ComponentType<Record<string, unknown>>;
  export default MDXComponent;
}
