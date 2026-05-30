import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { satteri } from '@astrojs/markdown-satteri';
import tailwindcss from "@tailwindcss/vite";
import compress from 'astro-compress';
import icon from "astro-icon";
import devtoolsJson from 'vite-plugin-devtools-json';

// https://astro.build/config
export default defineConfig({
  site: 'https://pride.puz.fun',
  compressHTML: true,
  integrations: [mdx(), icon(), compress()],
    markdown: {
    processor: satteri({
      features: { directive: true },
    }),
  },
  vite: {
    plugins: [devtoolsJson(), tailwindcss()],
  },
})
