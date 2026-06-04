import { lingui } from "@lingui/vite-plugin";
import mdx from "@mdx-js/rollup";
import { nitro } from "nitro/vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    { enforce: "pre", ...mdx() },
    lingui(),
    tailwindcss(),
    tanstackStart(),
    nitro(),
    viteReact({
      plugins: [["@lingui/swc-plugin", {}]],
    }),
  ],
});
