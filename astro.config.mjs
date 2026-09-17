// @ts-check
import { defineConfig } from 'astro/config';
import canvas from 'rdilla';

// Sitio estático (SSG). Netlify solo sirve la carpeta dist.
export default defineConfig({
  site: 'https://www.erikz.info',
  prefetch: true,
  server: { port: 4331 },
  // Lienzo de desarrollo en /rdilla. Solo corre en `astro dev`; no viaja a dist.
  integrations: [canvas()],
});
