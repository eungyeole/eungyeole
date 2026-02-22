import type { LinguiConfig } from "@lingui/conf";

const config: LinguiConfig = {
  locales: ["ko", "en"],
  sourceLocale: "ko",
  catalogs: [
    {
      path: "src/locales/{locale}",
      include: ["src"],
    },
  ],
  format: "po",
};

export default config;
