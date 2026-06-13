// Generates public/sitemap.xml from collection and message data
// Run: node scripts/generate-sitemap.mjs

import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SITE = 'https://kirillateev.art';
const LOCALES = ['en', 'ru'];

// Must match src/constants/collections.ts
const COLLECTIONS = {
  selection: {
    name: 'Selection',
    minIndex: 1,
    maxIndex: 4,
  },
  folds: {
    name: 'Folds',
    minIndex: 1,
    maxIndex: 512,
  },
  frames: {
    name: 'Frames',
    minIndex: 1,
    maxIndex: 512,
  },
  city: {
    name: 'City',
    minIndex: 1,
    maxIndex: 512,
  },
  blinds: {
    name: 'Blinds',
    minIndex: 1,
    maxIndex: 555,
  },
  'cocktail-straws': {
    name: 'Cocktail straws',
    minIndex: 1,
    maxIndex: 111,
  },
  window: {
    name: 'Window',
    minIndex: 1,
    maxIndex: 10000,
  },
  crosswalk: {
    name: 'Crosswalk',
    minIndex: 1,
    maxIndex: 10000,
  },
  lanes: {
    name: 'Lanes',
    minIndex: 1,
    maxIndex: 10000,
  },
  attentionless: {
    name: 'Attentionless',
    minIndex: 1,
    maxIndex: 1024,
  },
};

// Must match src/constants/text.ts
const MESSAGES = ['durability', 'from-suprematism-to-kinimalism', 'kinimalism'];

function url(loc, changefreq = 'monthly', priority = '0.8') {
  return (path) => `  <url>
    <loc>${SITE}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function generateSitemap() {
  const entries = [];

  for (const lang of LOCALES) {
    // Home
    entries.push(url(lang, 'weekly', '1.0')(`/${lang}`));

    // Messages listing
    entries.push(url(lang, 'monthly', '0.8')(`/${lang}/messages`));

    // Individual messages
    for (const msg of MESSAGES) {
      entries.push(url(lang, 'monthly', '0.8')(`/${lang}/messages/${msg}`));
    }

    // Community
    entries.push(url(lang, 'monthly', '0.8')(`/${lang}/community`));

    // Collection viewer pages
    for (const [key] of Object.entries(COLLECTIONS)) {
      entries.push(url(lang, 'weekly', '0.8')(`/${lang}/view/${key}`));

      // Individual token pages
      const col = COLLECTIONS[key];
      for (let tokenId = col.minIndex; tokenId <= col.maxIndex; tokenId++) {
        entries.push(
          url(lang, 'monthly', '0.4')(`/${lang}/view/${key}/${tokenId}`),
        );
      }
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${entries.join('\n')}

</urlset>`;

  const outPath = resolve(__dirname, '..', 'public', 'sitemap.xml');
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, xml, 'utf-8');

  const total = entries.length;
  const tokenPages = Object.values(COLLECTIONS).reduce(
    (sum, c) => sum + (c.maxIndex - c.minIndex + 1),
    0,
  );
  console.log(
    `Sitemap generated: ${total} URLs (${tokenPages} per locale for tokens, ${LOCALES.length} locales) → ${outPath}`,
  );
}

generateSitemap();