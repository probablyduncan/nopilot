// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import mdx from '@astrojs/mdx';
import remarkBreaks from 'remark-breaks';

// https://astro.build/config
export default defineConfig({
    adapter: netlify(),
    integrations: [mdx()],
    markdown: {
        remarkPlugins: [
            remarkBreaks,
        ]
    }
});