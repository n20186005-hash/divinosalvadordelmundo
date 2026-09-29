# Informe de auto-verificación

## Estado verificado (2026-09-29)

Dominio configurado (`https://divinosalvadordelmundo.com`) y compilación verificada en el sandbox Windows con Node 24.19.0:

- `node node_modules/astro/bin/astro.mjs check` → 0 errores, 0 warnings, 0 hints (14 archivos).
- `node node_modules/astro/bin/astro.mjs build` → 5 páginas: `/`, `/historia/`, `/como-llegar/`, `/fotos/`, `/404.html` + `sitemap-index.xml`.
- `node scripts/verify-dist.mjs` → sin violaciones.
- JSON-LD de las 5 páginas analizado con `JSON.parse`: `WebSite`+`Organization` en todas; `TouristAttraction`, `FAQPage`, `BreadcrumbList` y `WebPage` en la portada; `WebPage`+`BreadcrumbList`+`FAQPage` en las guías. Todos válidos.
- `dist/_headers` y `dist/_redirects` presentes en el build.

### Optimización SEO aplicada (datos de Search Console)

- Canonicalización: `public/_redirects` con 301 de `http://` y `https://www.` al apex; canonical absoluto en las 4 páginas indexables; la 404 no emite canonical y sí `noindex`.
- CTR: títulos y descripciones reescritos con intención de búsqueda (`historia`, `cómo llegar`, `fotos`, `horario`, `acceso gratuito`).
- Cobertura de consultas: tres guías long-tail nuevas con `FAQPage` y `BreadcrumbList` propios y enlazado interno cruzado desde la portada.
- Datos actualizados: valoración 4.6 con 21 045 reseñas.
- Rendimiento móvil: las fotografías pasan de `upload.wikimedia.org` a copias locales en `/images/` y la imagen LCP se precarga con `rel="preload"`.

## Histórico

### Estado verificado (2026-09-09)

La entrega ya tiene dominio configurado (`https://divinosalvadordelmundo.com`) y fue compilada y verificada:

- `npx astro check` → 0 errores, 0 warnings.
- `npx astro build` → éxito, 1 página en `dist/` + `sitemap-index.xml`.
- `node scripts/verify-dist.mjs` → sin violaciones.
- `pnpm-lock.yaml` completo (149 KB) generado y versionado; reproducible en CI Linux con `CI=1 corepack pnpm install --frozen-lockfile`.
- `pnpm-workspace.yaml` con `allowBuilds` para `esbuild` y `workerd`.

Limitación del sandbox local (solo Windows): `pnpm` no puede materializar `node_modules` porque sus junctions provocan `os error 448` (montaje no confiable). La instalación/validación local se hizo con layout npm (`npm install --no-package-lock`), sin generar `package-lock.json` y sin alterar la gestión pnpm del repositorio.

Histórico de la preparación anterior:

## Comprobaciones estáticas realizadas

- `pnpm-workspace.yaml`: no existe (proyecto de un solo paquete).
- Versiones en `package.json`: valores exactos, sin `latest`, `*`, `^` ni `~`.
- Node y pnpm fijados en `engines`, `.node-version` y `packageManager`.
- El dominio se configura únicamente mediante `SITE` en `astro.config.mjs`.
- Si `SITE` está vacío, sitemap queda desactivado y canonical/OG URL se omiten.
- No se escribe `lastmod` manualmente.
- El proyecto incluye `scripts/verify-dist.mjs` para revisar `example.com`, `localhost`, `chrome-extension://`, URLs de sitemap y ausencia de `lastmod` después de una compilación real.

## Secuencia de aceptación a ejecutar en un entorno con red

```bash
rm -rf node_modules
corepack enable
CI=1 corepack pnpm install
# El primer install genera pnpm-lock.yaml. Después debe versionarse.
rm -rf node_modules
CI=1 corepack pnpm install --frozen-lockfile
pnpm check
pnpm build
pnpm verify:dist
```

Una entrega que afirme cumplir literalmente la prueba solicitada debe ejecutar esos pasos con acceso al registro de npm y conservar el `pnpm-lock.yaml` resultante.
