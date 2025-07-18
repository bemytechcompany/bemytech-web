// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://bemytech.com', // Base URL for production
  integrations: [tailwind()],
  server: {
    host: true,
    allowedHosts: ['.trycloudflare.com'], // permite todos los subdominios de trycloudflare.com
  },
});
