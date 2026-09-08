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

Edita únicamente `const SITE = ''` en `astro.config.mjs`.

- Si queda vacío: el sitio construye sin canonical absoluto, sin `og:url` absoluto y sin sitemap.
- Si se completa con un dominio real: Astro expone `Astro.site`; canonical, Open Graph y JSON-LD se derivan de ahí, y `@astrojs/sitemap` se activa automáticamente.

## Comandos

En un entorno con acceso a npm, genera y versiona primero el lockfile:

```bash
corepack enable
pnpm install
rm -rf node_modules
CI=1 corepack pnpm install --frozen-lockfile
pnpm check
pnpm build
pnpm verify:dist
pnpm deploy
```

Consulta `SELF-CHECK.md`: el contenedor usado para preparar esta entrega no tiene acceso DNS a `registry.npmjs.org`, por lo que no se falsificó un lockfile ni un resultado de build.

## Cloudflare

`wrangler.jsonc` publica `./dist` como Worker Static Assets. `compatibility_date` es una fecha de compatibilidad de API de Cloudflare, no una fecha editorial ni un `lastmod`.

## Fotografías

El diseño usa fotografías reales verificadas en Wikimedia Commons y muestra créditos/licencias en la página. Ver `PHOTO-SOURCES.md`.

## Fuentes editoriales principales

- Ministerio de Cultura de El Salvador — declaratoria como Bien Cultural e historia de la plaza.
- Ministerio de Educación / Universidad de El Salvador — descripción e historia del monumento.
- Google Maps / datos facilitados por el solicitante — dirección, teléfono, valoración y horario público.
- Wikimedia Commons — fotografías y licencias.
