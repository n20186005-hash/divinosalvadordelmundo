# Monumento al Divino Salvador del Mundo — sitio Astro

Sitio editorial en español salvadoreño para el Monumento al Divino Salvador del Mundo, San Salvador.

## Páginas

| Ruta | Contenido |
| --- | --- |
| `/` | Portada: horario, acceso, valoración, mapa, FAQ y enlaces a las guías |
| `/historia/` | Origen (1942), terremoto de 1986, Bien Cultural 2012, materiales |
| `/como-llegar/` | Dirección, Plus Code, autobús, taxi, auto, estacionamiento y mapa |
| `/fotos/` | Galería, cuatro miradores y consejos de fotografía |
| `/404.html` | Página de error, `noindex` |

## Arquitectura

- `src/data/site.ts` — única fuente de verdad del monumento (NAP, geo, valoración) y `SITE_NAME`.
- `src/data/faqs.ts` — preguntas frecuentes por página (alimentan texto visible y `FAQPage`).
- `src/lib/schema.ts` — constructores JSON-LD: `WebSite`/`Organization`, `TouristAttraction`, `FAQPage`, `BreadcrumbList`, `WebPage`.
- `src/layouts/BaseLayout.astro` — TDK, canonical, Open Graph, Twitter Card, JSON-LD, cabecera, pie, consentimiento y service worker.
- `src/pages/*.astro` — contenido de cada página.

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

`wrangler.jsonc` publica `./dist` como Worker Static Assets, con `not_found_handling: "404-page"` para que las rutas inexistentes devuelvan `404.html` y no un 200 blando. `compatibility_date` es una fecha de compatibilidad de API de Cloudflare, no una fecha editorial ni un `lastmod`.

### Canonicalización del dominio

El dominio canónico es `https://divinosalvadordelmundo.com` (HTTPS, sin `www`).

1. `public/_redirects` declara los 301 de `http://` y `https://www.` hacia el apex para el tráfico servido por assets.
2. **Además**, hay que configurar en el panel de Cloudflare:
   - *SSL/TLS → Edge Certificates → Always Use HTTPS*.
   - *Rules → Redirect Rules*: `http://*` y hostname `www.divinosalvadordelmundo.com` → `https://divinosalvadordelmundo.com` (301).

Sin la regla del panel, Google seguirá registrando las tres variantes por separado (se detectaron `https://`, `https://www.` y `http://` en Search Console).

### Cabeceras de seguridad

`public/_headers` emite HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy` y una CSP que permite únicamente lo necesario (Google Maps embebido y GA4 con consentimiento). `sw.js` se sirve sin caché.

## Fotografías

El diseño usa fotografías reales verificadas en Wikimedia Commons y muestra créditos/licencias en la página. Ver `PHOTO-SOURCES.md`.

## Fuentes editoriales principales

- Ministerio de Cultura de El Salvador — declaratoria como Bien Cultural e historia de la plaza.
- Ministerio de Educación / Universidad de El Salvador — descripción e historia del monumento.
- Google Maps / datos facilitados por el solicitante — dirección, teléfono, valoración y horario público.
- Wikimedia Commons — fotografías y licencias.
