// @ts-check
import { defineConfig } from 'astro/config';

// rdilla es una herramienta de desarrollo (el lienzo /rdilla). Se carga de forma OPCIONAL:
// si está instalada (local), se añade la integración; si no (build de producción en Netlify),
// el import falla y seguimos sin ella. Así el deploy no depende de rdilla.
const integrations = [];
try {
  const { default: canvas } = await import('rdilla');
  integrations.push(canvas());
} catch {
  // rdilla no instalada: seguimos sin el lienzo.
}

// Sitio estático (SSG). Netlify solo sirve la carpeta dist.
export default defineConfig({
  site: 'https://www.erikz.info',
  prefetch: true,
  server: { port: 4331 },
  integrations,
});
