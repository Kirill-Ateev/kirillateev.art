import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..'); // если скрипт лежит в scripts/, иначе resolve(__dirname, '.')
const PUBLIC = resolve(ROOT, 'public');

const IMAGES_DIR = resolve(PUBLIC, 'images');
const ICONS_DIR = resolve(PUBLIC, 'icons');
const OG_DIR = resolve(PUBLIC, 'og');
const OUTPUT_ICONS_DIR = resolve(PUBLIC, 'icons');

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const ICON_SIZES = [192, 512];
const MASKABLE_SIZE = 512;
const MASKABLE_SAFE_RATIO = 0.8;

const IMAGE_EXTENSIONS = ['.svg', '.png', '.jpg', '.jpeg', '.webp'];

async function generate() {
  mkdirSync(OG_DIR, { recursive: true });
  mkdirSync(OUTPUT_ICONS_DIR, { recursive: true });

  let count = 0;

  // ---------- Логотип (один раз ищем, используем для home.png и иконок) ----------
  const logoFile = findLogoFile(ICONS_DIR);

  // Генерация home.png из логотипа
  if (logoFile) {
    const homePng = await renderImage(logoFile, OG_WIDTH, OG_HEIGHT);
    writeFileSync(resolve(OG_DIR, 'home.png'), homePng);
    count++;
    console.log(`✓ home.png (из ${logoFile})`);
  } else {
    console.warn('⚠ Логотип не найден — home.png не создан');
  }

  // ---------- Open Graph постеры из коллекций ----------
  const entries = readdirSync(IMAGES_DIR, { withFileTypes: true });
  const collections = entries.filter((e) => e.isDirectory());

  for (const collection of collections) {
    const collectionName = collection.name;
    const collectionDir = resolve(IMAGES_DIR, collectionName);

    const imageFiles = readdirSync(collectionDir)
      .filter((f) => IMAGE_EXTENSIONS.includes(extname(f).toLowerCase()))
      .map((f) => resolve(collectionDir, f));

    if (imageFiles.length === 0) {
      console.warn(
        `⚠ Пропуск "${collectionName}": нет поддерживаемых изображений`,
      );
      continue;
    }

    const randomImage =
      imageFiles[Math.floor(Math.random() * imageFiles.length)];
    const pngBuffer = await renderImage(randomImage, OG_WIDTH, OG_HEIGHT);
    writeFileSync(resolve(OG_DIR, `${collectionName}.png`), pngBuffer);
    count++;
    console.log(`✓ ${collectionName}.png (из ${randomImage})`);
  }

  // ---------- PWA иконки из логотипа ----------
  if (logoFile) {
    for (const size of ICON_SIZES) {
      const png = await renderIcon(logoFile, size);
      writeFileSync(resolve(OUTPUT_ICONS_DIR, `icon-${size}.png`), png);
      count++;
    }
    const maskable = await renderIcon(
      logoFile,
      MASKABLE_SIZE,
      MASKABLE_SAFE_RATIO,
    );
    writeFileSync(
      resolve(OUTPUT_ICONS_DIR, `icon-maskable-${MASKABLE_SIZE}.png`),
      maskable,
    );
    count++;
    console.log(`✓ Иконки сгенерированы из ${logoFile}`);
  } else {
    console.warn(
      '⚠ В public/icons/ нет файла logo.svg/png/jpg/jpeg/webp — иконки не созданы',
    );
  }

  console.log(`✓ Всего сгенерировано ${count} PNG файлов`);
}

function findLogoFile(dir) {
  for (const ext of IMAGE_EXTENSIONS) {
    const candidate = resolve(dir, `logo${ext}`);
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

async function renderImage(imagePath, width, height) {
  const isSvg = extname(imagePath).toLowerCase() === '.svg';
  const pipeline = isSvg
    ? sharp(imagePath, { density: 300 })
    : sharp(imagePath);

  return pipeline
    .resize(width, height, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
}

async function renderIcon(imagePath, size, safeRatio = 1) {
  const artSize = Math.round(size * safeRatio);
  const isSvg = extname(imagePath).toLowerCase() === '.svg';
  let pipeline = isSvg ? sharp(imagePath, { density: 300 }) : sharp(imagePath);

  pipeline = pipeline.resize(artSize, artSize, {
    fit: 'contain',
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  });

  if (safeRatio !== 1) {
    const pad = Math.round((size - artSize) / 2);
    const padOther = size - artSize - pad;
    pipeline.extend({
      top: pad,
      bottom: padOther,
      left: pad,
      right: padOther,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    });
  }

  return pipeline
    .png({ compressionLevel: 9, adaptiveFiltering: true, palette: true })
    .toBuffer();
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
