import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "./tailwind.config";

const { theme } = resolveConfig(tailwindConfig);

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
  define: {
    __THEME_COLOR__: JSON.stringify(theme.colors.amber[500]),
    __BACKGROUND_COLOR__: JSON.stringify(theme.colors.amber[100]),
  },
});
