# kirillateev.art

Personal landing page of contemporary artist **Kirill Ateev** (Кирилл Атеев), creator of _kinimalism_ — algorithmic generative art minted as on-chain ERC-721 NFTs on Ethereum.

[https://kirillateev.art](https://kirillateev.art)

## Overview

Multilingual (EN / RU) static site built with Next.js and deployed to GitHub Pages. Features 10 active NFT collections with on-chain SVG viewers, philosophical articles, and community links.

## Tech Stack

| Layer           | Technology                    |
| --------------- | ----------------------------- |
| Framework       | Next.js 15 (App Router)       |
| Language        | TypeScript                    |
| Runtime         | React 18                      |
| Package manager | Yarn                          |
| i18n            | Lingui v5 (macro-based)       |
| Carousel        | embla-carousel-react          |
| Blockchain      | ethers.js v6                  |
| Analytics       | Google Tag Manager            |
| SVG imports     | @svgr/webpack                 |
| Deployment      | GitHub Actions → GitHub Pages |

## Quick Start

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command        | Description                                    |
| -------------- | ---------------------------------------------- |
| `yarn dev`     | Development server on :3000                    |
| `yarn build`   | Generate sitemap + static export to `./out`    |
| `yarn start`   | Serve production build                         |
| `yarn lint`    | ESLint                                         |
| `yarn extract` | Extract i18n keys from code → `.po` files      |
| `yarn compile` | Compile `.po` → `.js` message catalogs         |
| `yarn sitemap` | Generate `public/sitemap.xml` from config data |

### Before deploying

```bash
yarn extract && yarn compile && yarn build
```

## Project Structure

```
├── public/
│   ├── images/{collection}/    # Sample images per collection
│   ├── sitemap.xml             # Sitemap index
│   ├── robots.txt
│   └── llm.txt                 # AI crawler documentation
├── src/
│   ├── app/
│   │   ├── [lang]/             # i18n routes
│   │   │   ├── page.tsx        # Home / Series
│   │   │   ├── selection/      # Selection page
│   │   │   ├── community/      # Community page
│   │   │   ├── messages/       # Articles listing + detail
│   │   │   └── view/[collection]/
│   │   │       ├── page.tsx    # Collection viewer
│   │   │       └── [tokenId]/  # Per-token SSG page
│   ├── components/
│   │   ├── collections/        # Collection card components
│   │   ├── viewer/             # ERC721Viewer, TokenViewer
│   │   ├── header/             # Header, Logo, Language Switcher
│   │   └── ...
│   ├── constants/
│   │   ├── collections.ts      # NFT collection metadata
│   │   └── text.ts             # Article content (EN + RU)
│   ├── locales/                # en.po, ru.po + compiled .js
│   └── hooks/
├── scripts/
│   └── generate-sitemap.mjs    # Sitemap XML generator
└── .github/workflows/          # CI/CD deploy to GitHub Pages
```

## Architecture

### Static Site Generation

- `output: 'export'` — fully static site, zero Node.js server
- `generateStaticParams()` pre-renders all `[lang]` × `[collection]` × `[tokenId]` combinations at build time
- Server components for layouts, pages, meta tags, JSON-LD
- Client components for carousels, NFT viewer, language switcher
- `LazyHydrate` wraps below-the-fold collections with `IntersectionObserver`

### i18n (Lingui v5)

- Macro-based translations: `t` and `Trans` compiled at build time via SWC plugin
- Server-side: `appRouterI18n.ts` preloads catalogs; HOCs inject `I18n` instance
- Client-side: `LinguiClientProvider` wraps children with `I18nProvider`
- Locale switching via `<select>` → `router.push()` to `/[lang]/...` path

### NFT Viewer

1. Reads `?item=` query param or uses `minIndex` as default
2. Calls `tokenURI(tokenId)` on Ethereum contract via `ethers.js` + proxy RPC
3. Resolves `ipfs://` URIs → `https://ipfs.io/ipfs/...`
4. Handles `data:application/json;base64,...` inline metadata
5. Renders via `next/image` with `unoptimized: true`

## Adding Content

### New Collection

1. Add sample images to `public/images/{collectionKey}/` (4–6 files)
2. Add metadata to `src/constants/collections.ts`
3. Create collection card in `src/components/collections/`
4. Add to home page in `src/app/[lang]/page.tsx`
5. Add static params in viewer route pages
6. Run `yarn extract`, translate in `src/locales/ru.po`, run `yarn compile`
7. Update `scripts/generate-sitemap.mjs`, run `yarn sitemap`
8. Update `public/llm.txt`

### New Article

1. Add content to `src/constants/text.ts` with `en` and `ru` translations
2. Add static param in `src/app/[lang]/messages/[message]/page.tsx`
3. Run `yarn extract && yarn compile`
4. Update `scripts/generate-sitemap.mjs`, run `yarn sitemap`
5. Update `public/llm.txt`

## SEO

- Per-page `<title>`, `<meta>`, Open Graph, Twitter Cards
- Canonical + alternate hreflang for multilingual indexing
- JSON-LD structured data (`Schema.org/VisualArtwork`) on per-token pages
- Sitemap index with per-collection sub-sitemaps
- `robots.txt` with sitemap pointer
- PWA manifest

## Deployment

Push to `main` triggers GitHub Actions → builds → deploys to GitHub Pages at `kirillateev.art`.

## External Dependencies

| Service                         | Purpose                       |
| ------------------------------- | ----------------------------- |
| Ethereum RPC proxy (vercel.app) | On-chain contract reads       |
| ipfs.io                         | IPFS gateway for token images |
| og.rarible.com                  | Marketplace links             |
| Google Tag Manager              | Analytics                     |
