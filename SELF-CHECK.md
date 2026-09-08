# Informe de auto-verificación

## Estado del entorno de ejecución actual

El proyecto y su configuración fueron preparados, pero este contenedor no permite resolver `registry.npmjs.org` ni descargar archivos binarios externos. La llamada de Corepack a `pnpm@12.3.4` termina con `getaddrinfo EAI_AGAIN registry.npmjs.org`.

Por esa limitación externa:

- No fue posible generar de forma legítima un `pnpm-lock.yaml` sincronizado.
- No fue posible ejecutar `CI=1 corepack pnpm install --frozen-lockfile`.
- Sin dependencias instaladas, no fue posible ejecutar `pnpm check` ni `pnpm build`.
- Tampoco fue posible descargar los JPG de Wikimedia Commons al paquete; se mantienen las URLs reales verificadas y sus licencias en `PHOTO-SOURCES.md`.

No se ha fabricado un lockfile ni se ha marcado falsamente la compilación como aprobada.

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
