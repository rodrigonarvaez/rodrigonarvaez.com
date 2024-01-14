import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://rodrigonarvaez.com/",
  integrations: [
    tailwind(),
    icon({
      include: {
        openmoji: ["linkedin", "github", "instagram"],
      },
    }),
    sitemap(),
  ],
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
    // locales: ["en", "es"],
  },
});
