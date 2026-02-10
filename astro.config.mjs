// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";
import db from "@astrojs/db";
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://astro-http.ces-velasquez.workers.dev",
  integrations: [mdx(), sitemap(), db(), vue()],

  adapter: cloudflare(),
});
