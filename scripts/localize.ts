import { getConfig } from "@lingui/conf";
import { formatter } from "@lingui/format-po";
import { Septuagint } from "@septuagint/core";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error("ANTHROPIC_API_KEY is not set");
}

const septuagint = new Septuagint({
  llm: {
    provider: "anthropic",
    model: "claude-sonnet-4-5",
    apiKey: process.env.ANTHROPIC_API_KEY,
  },
});

const { catalogs = [], locales = [], sourceLocale = "ko" } = getConfig();

// 메인 함수
const localize = async () => {
  const formatte2 = formatter();
  formatte2.parse;
};

localize().catch(console.error);
