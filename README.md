# Monumento al Divino Salvador del Mundo — sitio Astro

Sitio editorial de una sola página en español salvadoreño para el Monumento al Divino Salvador del Mundo, San Salvador.

## Stack

- Astro 7.3.1
- Tailwind CSS 4.3.3 vía `@tailwindcss/vite`
- TypeScript 6.0.3 (dentro del rango peer `^5 || ^6` de `@astrojs/check` 0.9.10)
- pnpm 12.3.4
- Node.js 24.20.0 LTS
- Cloudflare Workers Static Assets vía Wrangler 4.129.0
- GA4: `G-HXM22WWPKP`, condicionado a consentimiento analítico

## Dominio: una sola fuente de verdad

Dominio definitivo configurado: `https://divinosalvadordelmundo.com` en `const SITE = 'https://divinosalvadordelmundo.com'` de `astro.config.mjs`.

Con `SITE` completo, Astro expone `Astro.site`; canonical, Open Graph, JSON-LD (`@id` de la atracción, og:image) se derivan de ahí y `@astrojs/sitemap` genera `dist/sitemap-index.xml` automáticamente.

## Comandos

```bash
pnpm install
pnpm check
pnpm build
pnpm verify:dist
pnpm deploy
```

> Nota de entorno (solo Windows local): pnpm falla en este sandbox al crear los junctions de `node_modules` (`os error 448`, montaje no confiable). La validación local se hizo con layout npm: `npm install --no-package-lock` + `npx astro check` + `npx astro build` + `node scripts/verify-dist.mjs`. En CI Linux los comandos `pnpm` funcionan con normalidad y el `pnpm-lock.yaml` versionado es reproducible con `CI=1 corepack pnpm install --frozen-lockfile`.

Consulta `SELF-CHECK.md` para el detalle de las comprobaciones ejecutadas.

## Cloudflare

`wrangler.jsonc` publica `./dist` como Worker Static Assets. `compatibility_date` es una fecha de compatibilidad de API de Cloudflare, no una fecha editorial ni un `lastmod`.

## Fotografías

El diseño usa fotografías reales verificadas en Wikimedia Commons y muestra créditos/licencias en la página. Ver `PHOTO-SOURCES.md`.

## Fuentes editoriales principales

- Ministerio de Cultura de El Salvador — declaratoria como Bien Cultural e historia de la plaza.
- Ministerio de Educación / Universidad de El Salvador — descripción e historia del monumento.
- Google Maps / datos facilitados por el solicitante — dirección, teléfono, valoración y horario público.
- Wikimedia Commons — fotografías y licencias.
