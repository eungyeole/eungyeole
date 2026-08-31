import type { ComponentType } from "react";

export type LocalizedText = string | { ko: string; en: string };

export type SandboxKind = "project" | "experiment" | "note";

export type SandboxLayout = "wide" | "half";

export interface SandboxMetadata {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  kind: SandboxKind;
  layout: SandboxLayout;
  createdAt: string;
  order: number;
  href?: string;
  source?: string;
  tags?: string[];
  draft?: boolean;
  featured?: boolean;
}

interface SandboxMetadataInput {
  title?: LocalizedText;
  description?: LocalizedText;
  kind?: SandboxKind;
  layout?: SandboxLayout;
  createdAt?: string;
  date?: string;
  order?: number;
  href?: string;
  source?: string;
  tags?: string[];
  draft?: boolean;
  featured?: boolean;
}

type SandboxComponent = ComponentType<Record<string, unknown>>;

interface SandboxModule {
  default: SandboxComponent;
  Preview?: SandboxComponent;
  metadata?: SandboxMetadataInput;
}

interface RegisteredSandbox {
  component: SandboxComponent;
  metadata: SandboxMetadata | null;
  preview: SandboxComponent | null;
}

const articleModules = import.meta.glob<SandboxModule>("../articles/**/*.mdx", {
  eager: true,
});

const sandboxModules = import.meta.glob<SandboxModule>("../sandboxes/**/*.mdx", {
  eager: true,
});

const sandboxes = new Map<string, RegisteredSandbox>();

const isLocalizedText = (value: unknown): value is LocalizedText =>
  typeof value === "string" ||
  (typeof value === "object" &&
    value !== null &&
    typeof (value as { ko?: unknown }).ko === "string" &&
    typeof (value as { en?: unknown }).en === "string");

const deriveSlug = (path: string) => path.replace(/^\.\.\/(?:articles|sandboxes)\//, "").replace(/\.mdx$/, "");

const normalizeMetadata = (
  slug: string,
  metadata: SandboxMetadataInput | undefined,
  collection: "article" | "sandbox",
): SandboxMetadata | null => {
  if (!metadata || !isLocalizedText(metadata.title) || !isLocalizedText(metadata.description)) {
    return null;
  }

  const kind = metadata.kind ?? (collection === "article" ? "note" : "experiment");
  const createdAt = metadata.createdAt ?? metadata.date ?? "";

  return {
    slug,
    title: metadata.title,
    description: metadata.description,
    kind,
    layout: metadata.layout ?? (kind === "experiment" ? "half" : "wide"),
    createdAt,
    order: Number.isFinite(metadata.order) ? (metadata.order ?? 0) : 0,
    ...(metadata.href ? { href: metadata.href } : {}),
    ...(metadata.source ? { source: metadata.source } : {}),
    ...(metadata.tags ? { tags: [...metadata.tags] } : {}),
    ...(metadata.draft !== undefined ? { draft: metadata.draft } : {}),
    ...(metadata.featured !== undefined ? { featured: metadata.featured } : {}),
  };
};

const registerModules = (modules: Record<string, SandboxModule>, collection: "article" | "sandbox") => {
  for (const [path, module] of Object.entries(modules).sort(([a], [b]) => a.localeCompare(b))) {
    const slug = deriveSlug(path);

    sandboxes.set(slug, {
      component: module.default,
      metadata: normalizeMetadata(slug, module.metadata, collection),
      preview: module.Preview ?? null,
    });
  }
};

// Register legacy articles first so a sandbox with the same slug always wins.
registerModules(articleModules, "article");
registerModules(sandboxModules, "sandbox");

export const getAllSandboxMetadata = (): SandboxMetadata[] =>
  [...sandboxes.values()]
    .map(({ metadata }) => metadata)
    .filter((metadata): metadata is SandboxMetadata => metadata !== null && !metadata.draft)
    .sort((a, b) => b.order - a.order || b.createdAt.localeCompare(a.createdAt) || a.slug.localeCompare(b.slug));

export const getSandboxMetadata = (slug: string): SandboxMetadata | null => {
  const metadata = sandboxes.get(slug)?.metadata;

  return metadata && !metadata.draft ? metadata : null;
};

export const getSandboxComponent = (slug: string): SandboxComponent | null => sandboxes.get(slug)?.component ?? null;

export const getSandboxPreview = (slug: string): SandboxComponent | null => sandboxes.get(slug)?.preview ?? null;

export const resolveSandboxText = (value: LocalizedText, lang: string): string =>
  typeof value === "string" ? value : value[lang === "en" ? "en" : "ko"];
