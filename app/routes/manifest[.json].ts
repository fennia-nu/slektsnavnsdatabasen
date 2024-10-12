import { json } from "react-router";
import androidChrome192 from "~/assets/android-chrome-192x192.png";
import androidChrome512 from "~/assets/android-chrome-512x512.png";

export const APP_NAME = "Slektsnavnsdatabasen";

const manifest = {
  name: APP_NAME,
  short_name: "Slektsnavn",
  icons: [
    { src: androidChrome192, sizes: "192x192", type: "image/png" },
    { src: androidChrome512, sizes: "512x512", type: "image/png" },
  ],
  theme_color: __THEME_COLOR__,
  background_color: __BACKGROUND_COLOR__,
  display: "standalone",
} as const;

export async function loader() {
  return json(manifest);
}
