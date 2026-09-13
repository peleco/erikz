// @ts-check
import { defineConfig } from 'astro/config';

// Sitio estático (SSG). Netlify solo sirve la carpeta dist.
export default defineConfig({
  site: 'https://www.erikz.info',
  prefetch: true,
  server: { port: 4331 },
});
