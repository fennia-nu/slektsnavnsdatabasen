import { json } from "react-router";
import androidChrome192 from "~/assets/android-chrome-192x192.png";
import androidChrome512 from "~/assets/android-chrome-512x512.png";
import tailwindConfig from "../../tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

const { theme } = resolveConfig(tailwindConfig);
export const APP_NAME = "Slektsnavnsdatabasen";

const manifest = {
  name: APP_NAME,
  short_name: "Slektsnavn",
  icons: [
    { src: androidChrome192, sizes: "192x192", type: "image/png" },
    { src: androidChrome512, sizes: "512x512", type: "image/png" },
  ],
  theme_color: theme.colors.amber[500],
  background_color: theme.colors.amber[100],
  display: "standalone",
} as const;

export async function loader() {
  return json(manifest);
}
