import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const help = `Create a new sandbox MDX draft.

Usage:
  pnpm sandbox:new <slug> [title]

Arguments:
  slug   Kebab-case file name, for example spring-tabs
  title  Optional display title. Defaults to the slug in title case.

Options:
  -h, --help  Show this help message

Examples:
  pnpm sandbox:new spring-tabs
  pnpm sandbox:new spring-tabs "Spring Tabs"`;

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const sandboxesDirectory = fileURLToPath(new URL("../src/sandboxes/", import.meta.url));

const formatLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const titleFromSlug = (slug: string) =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const createTemplate = (title: string) => `export const metadata = {
  title: ${JSON.stringify(title)},
  description: {
    ko: "한 줄 설명",
    en: "One-line description",
  },
  createdAt: "${formatLocalDate(new Date())}",
  kind: "experiment",
  order: 0,
  layout: "half",
  draft: true,
  tags: [],
};

{/*
Optional: 인터랙티브 데모가 있다면 컴포넌트를 가져와 Preview로 내보내세요.
아래 주석을 풀고 경로와 컴포넌트 이름을 바꾸면 됩니다.

import { ExamplePreview } from "@/components/sandbox/example-preview";

export const Preview = ExamplePreview;
*/}

여기에 무엇을 만들었는지, 왜 만들었는지, 어떤 점을 실험했는지 적어주세요.

## Notes

- 구현하면서 발견한 점
- 다음에 개선하고 싶은 점
`;

const main = async () => {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    console.log(help);
    return;
  }

  const [slug, ...titleParts] = args;

  if (!slug) {
    console.error(`Missing sandbox slug.\n\n${help}`);
    process.exitCode = 1;
    return;
  }

  if (!slugPattern.test(slug)) {
    console.error(`Invalid slug "${slug}". Use kebab-case, for example "spring-tabs".`);
    process.exitCode = 1;
    return;
  }

  const providedTitle = titleParts.join(" ").trim();

  if (titleParts.length > 0 && !providedTitle) {
    console.error("Title cannot be empty.");
    process.exitCode = 1;
    return;
  }

  const title = providedTitle || titleFromSlug(slug);
  const filePath = join(sandboxesDirectory, `${slug}.mdx`);

  await mkdir(sandboxesDirectory, { recursive: true });

  try {
    await writeFile(filePath, createTemplate(title), { encoding: "utf8", flag: "wx" });
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "EEXIST") {
      console.error(`Sandbox already exists: src/sandboxes/${slug}.mdx`);
      process.exitCode = 1;
      return;
    }

    throw error;
  }

  console.log(`Created src/sandboxes/${slug}.mdx`);
  console.log("Edit the draft, then set draft to false when it is ready to publish.");
};

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
