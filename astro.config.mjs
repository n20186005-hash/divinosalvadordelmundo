import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// ÚNICO lugar para configurar el dominio canónico.
// Dominio definitivo: divinosalvadordelmundo.com
const SITE = 'https://divinosalvadordelmundo.com';
const site = SITE || undefined;

export default defineConfig({
  site,
  integrations: site ? [sitemap()] : [],
  vite: {
    plugins: [tailwindcss()]
  }
});
