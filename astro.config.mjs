import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// ÚNICO lugar para configurar el dominio canónico.
// Ejemplo al desplegar: const SITE = 'https://tudominio.com';
// Déjalo vacío mientras el dominio no esté decidido.
const SITE = '';
const site = SITE || undefined;

export default defineConfig({
  site,
  integrations: site ? [sitemap()] : [],
  vite: {
    plugins: [tailwindcss()]
  }
});
