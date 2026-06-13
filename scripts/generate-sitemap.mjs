import { mkdirSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = resolve(__dirname, '..', 'public');

const SITE = 'https://kirillateev.art';
const LOCALES = ['en', 'ru'];

const COLLECTIONS = {
  selection: { name: 'Selection', minIndex: 1, maxIndex: 4 },
  folds: { name: 'Folds', minIndex: 1, maxIndex: 512 },
  frames: { name: 'Frames', minIndex: 1, maxIndex: 512 },
  city: { name: 'City', minIndex: 1, maxIndex: 512 },
  blinds: { name: 'Blinds', minIndex: 1, maxIndex: 555 },
  'cocktail-straws': { name: 'Cocktail straws', minIndex: 1, maxIndex: 111 },
  window: { name: 'Window', minIndex: 1, maxIndex: 10000 },
  crosswalk: { name: 'Crosswalk', minIndex: 1, maxIndex: 10000 },
  lanes: { name: 'Lanes', minIndex: 1, maxIndex: 10000 },
  attentionless: { name: 'Attentionless', minIndex: 1, maxIndex: 1024 },
};

const MESSAGES = ['durability', 'from-suprematism-to-kinimalism', 'kinimalism'];

function urlTag(path, changefreq, priority) {
  return `  <url>
    <loc>${SITE}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function sitemapTag(path) {
  return `  <sitemap>
    <loc>${SITE}${path}</loc>
  </sitemap>`;
}

function writeSitemap(filename, urls) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${urls.join('\n')}

</urlset>`;
  const outPath = resolve(PUBLIC, filename);
  writeFileSync(outPath, xml, 'utf-8');
  return urls.length;
}

function generate() {
  mkdirSync(PUBLIC, { recursive: true });

  // ── Static pages sitemap ─────────────────────────────────────────────
  const pagesUrls = [];

  for (const lang of LOCALES) {
    pagesUrls.push(urlTag(`/${lang}`, 'weekly', '1.0'));
    pagesUrls.push(urlTag(`/${lang}/messages`, 'monthly', '0.8'));
    for (const msg of MESSAGES) {
      pagesUrls.push(urlTag(`/${lang}/messages/${msg}`, 'monthly', '0.8'));
    }
    pagesUrls.push(urlTag(`/${lang}/community`, 'monthly', '0.8'));
    pagesUrls.push(urlTag(`/${lang}/selection`, 'monthly', '0.8'));
    pagesUrls.push(urlTag(`/${lang}/series`, 'monthly', '0.8'));

    // Collection viewer pages (one per collection)
    for (const key of Object.keys(COLLECTIONS)) {
      pagesUrls.push(urlTag(`/${lang}/view/${key}`, 'weekly', '0.8'));
    }
  }

  const pagesCount = writeSitemap('sitemap-pages.xml', pagesUrls);
  console.log(`  sitemap-pages.xml: ${pagesCount} URLs`);

  // ── Per-collection token sitemaps ────────────────────────────────────
  const indexEntries = [sitemapTag('/sitemap-pages.xml')];
  let totalUrls = pagesCount;

  for (const [key, col] of Object.entries(COLLECTIONS)) {
    const tokenUrls = [];

    for (const lang of LOCALES) {
      for (let id = col.minIndex; id <= col.maxIndex; id++) {
        tokenUrls.push(urlTag(`/${lang}/view/${key}/${id}`, 'monthly', '0.4'));
      }
    }

    const filename = `sitemap-${key}.xml`;
    const count = writeSitemap(filename, tokenUrls);
    indexEntries.push(sitemapTag(`/${filename}`));
    totalUrls += count;

    console.log(`  ${filename}: ${count} URLs`);
  }

  // ── Sitemap index ────────────────────────────────────────────────────
  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${indexEntries.join('\n')}

</sitemapindex>`;

  writeFileSync(resolve(PUBLIC, 'sitemap.xml'), indexXml, 'utf-8');

  console.log(
    `\n✓ Sitemap index: ${indexEntries.length} sub-sitemaps, ${totalUrls} total URLs → ${PUBLIC}/sitemap.xml`,
  );
}

generate();
