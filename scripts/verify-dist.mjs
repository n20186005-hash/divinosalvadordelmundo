import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
if (!fs.existsSync(dist)) {
  console.error('dist/ no existe. Ejecuta pnpm build primero.');
  process.exit(1);
}

const forbidden = ['example.com', 'localhost', 'chrome-extension://'];
const textExtensions = new Set(['.html', '.xml', '.js', '.css', '.json', '.txt', '.webmanifest']);
const files = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (textExtensions.has(path.extname(entry.name))) files.push(full);
  }
};
walk(dist);

let failed = false;
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  for (const token of forbidden) {
    if (content.includes(token)) {
      console.error(`Contenido prohibido: ${token} en ${path.relative(dist, file)}`);
      failed = true;
    }
  }
}

const sitemapFiles = files.filter((file) => /sitemap.*\.xml$/i.test(path.basename(file)));
for (const file of sitemapFiles) {
  const xml = fs.readFileSync(file, 'utf8');
  if (/<lastmod>/i.test(xml)) {
    console.error(`Sitemap contiene lastmod no deseado: ${path.relative(dist, file)}`);
    failed = true;
  }
  const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  for (const loc of locs) {
    if (!/^https:\/\//.test(loc)) {
      console.error(`URL de sitemap no absoluta/HTTPS: ${loc}`);
      failed = true;
    }
  }
}

if (failed) process.exit(1);
console.log(`Verificación completada: ${files.length} archivos de texto revisados.`);
