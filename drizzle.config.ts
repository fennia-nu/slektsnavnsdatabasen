import { defineConfig } from "drizzle-kit";

export default defineConfig({
  driver: "d1-http",
  schema: "./src/schema/*",
  out: "./drizzle",
  // dbCredentials: {
  //   url: "./prisma/slektsnavn.db",
  // },
});
