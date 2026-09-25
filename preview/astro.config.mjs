import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  site: "http://localhost:4321",
  integrations: [react(), mdx()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      fs: { allow: [".."] },
    },
    resolve: {
      alias: {
        "@": path.resolve("./src"),
        "@brands-config": path.resolve("../brands.config.ts"),
      },
    },
  },
});
