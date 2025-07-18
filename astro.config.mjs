// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://bemytech.io', // Base URL for production
  base: '/', // Base path for the site
  trailingSlash: 'ignore', // Handle trailing slashes automatically
  output: 'static', // Ensure static output for production
  integrations: [
    tailwind(),
    sitemap() // Generate sitemap automatically for all pages
  ],
  build: {
    format: 'file', // Generate files like privacy-policy.html instead of privacy-policy/index.html
    assets: '_astro', // Keep assets in _astro folder
  },
  server: {
    host: true,
    allowedHosts: ['.trycloudflare.com'], // permite todos los subdominios de trycloudflare.com
  }
});
