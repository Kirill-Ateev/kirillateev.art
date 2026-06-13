# AGENTS.md — kirillateev.art

## Project Identity

**Personal landing page** of contemporary artist **Kirill Ateev** (Кирилл Атеев), working in the style of _kinimalism_ — algorithmic generative art minted as **on-chain ERC-721 NFTs** on Ethereum. The site is a multilingual (EN/RU for now) **static site generator** built with Next.js, deployed to **GitHub Pages** at [`kirillateev.art`](https://kirillateev.art).

- **Domain:** `kirillateev.art` (CNAME in `public/CNAME`)
- **GitHub Pages repo:** serves from `./out` directory
- **Target audience:** art collectors, NFT community, search engines, AI crawlers
- **Content:** 10 active NFT collections (on-chain SVGs), 3 philosophical articles (messages), community links

---

## Tech Stack

| Layer           | Technology                                 | Version  |
| --------------- | ------------------------------------------ | -------- |
| Framework       | Next.js (App Router)                       | 15.4.10  |
| Language        | TypeScript                                 | ^5       |
| Runtime         | React                                      | ^18      |
| Package manager | Yarn                                       | lockfile |
| i18n            | `@lingui` (macro-based)                    | ^5.4.1   |
| Carousel        | `embla-carousel-react`                     | ^8.5.2   |
| Blockchain      | `ethers.js`                                | ^6.15.0  |
| Analytics       | Google Tag Manager (`@next/third-parties`) | ^15.4.7  |
| SVG imports     | `@svgr/webpack`                            | ^8.1.0   |
| Polyfills       | `core-js`                                  | ^3.47.0  |
| Linting         | ESLint (`next/core-web-vitals`)            | ^8       |
| Deployment      | GitHub Actions → GitHub Pages              |          |

### Build output

- **`output: 'export'`** in `next.config.mjs` → fully static site, zero Node.js server
- **`images.unoptimized: true`** → required for static export
- **SWC plugin:** `@lingui/swc-plugin` for compile-time i18n macro transformation
- **Webpack:** custom rules for `.po` (Lingui loader) and `.svg` (SVGR)

---

## Commands

```bash
yarn dev           # Development server on :3000
yarn build         # Static export to ./out
yarn start         # Serve production build
yarn lint          # ESLint (next lint)
yarn extract       # Extract i18n keys from code → .po files
yarn compile       # Compile .po → .js message catalogs
```

**Before deploying**, always run:

```bash
yarn extract && yarn compile && yarn build
```

---

## Project Structure

```
.
├── public/
│   ├── CNAME                   # "kirillateev.art"
│   ├── favicon.ico
│   ├── robots.txt              # Allow all, sitemap pointer
│   ├── sitemap.xml             # All EN+RU pages
│   ├── llm.txt                 # AI crawler documentation
│   └── images/
│       ├── icons/logo.svg
│       └── {collection}/       # 4-6 sample images per collection (.svg or .webp)
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (polyfills, pass-through)
│   │   ├── page.tsx            # Redirect / → /ru
│   │   ├── manifest.ts         # PWA manifest
│   │   ├── not-found.tsx       # Custom 404 with SEO meta
│   │   ├── polyfills.ts        # Client-side core-js
│   │   └── [lang]/             # i18n route group
│   │       ├── layout.tsx      # Main layout: meta tags, GTM, LinguiProvider
│   │       ├── page.tsx        # Home / Series tab
│   │       ├── series/page.tsx # = Home
│   │       ├── selection/page.tsx
│   │       ├── community/page.tsx
│   │       ├── messages/
│   │       │   ├── page.tsx            # Article listing
│   │       │   └── [message]/page.tsx # Article detail
│   │       └── view/[collection]/page.tsx  # NFT viewer
│   ├── appRouterI18n.ts        # Server-side i18n catalog preloader
│   ├── withLingui.tsx          # HOC wrappers: withLinguiPage / withLinguiLayout
│   ├── components/
│   │   ├── collections/        # 10 collection cards + styles
│   │   ├── oldCollections/     # Archived: KindWords, LifeIsAnIllusion
│   │   ├── viewer/
│   │   │   └── ERC721Viewer.tsx   # On-chain NFT viewer (client component)
│   │   ├── header/             # Header, Logo, lang Switcher
│   │   ├── layout/             # LazyHydrate (IntersectionObserver)
│   │   ├── GTM/                # Google Tag Manager
│   │   ├── lingui/             # LinguiClientProvider, Switcher
│   │   └── common/             # ArrowRight icon
│   ├── constants/
│   │   ├── collections.ts      # collectionsData: all NFT collection metadata
│   │   ├── text.ts             # messagesList: article content (EN+RU)
│   │   └── index.ts            # isDevelopment flag
│   ├── hooks/                  # useBreakpoints, useLinguiInit, useMediaQuery
│   ├── locales/
│   │   ├── en.po / en.js       # English translations
│   │   └── ru.po / ru.js       # Russian translations
│   └── utils/                  # color.ts, numbers.ts
├── next.config.mjs
├── tsconfig.json
├── lingui.config.js
└── .github/workflows/nextjs.yml  # CI/CD deploy to GitHub Pages
```

---

## Architecture Patterns

### SSG with Client Hydration

- **Build time:** `generateStaticParams()` pre-renders all `[lang]` × `[collection]` × `[message]` combinations
- **Server components:** layouts, pages, meta tags
- **Client components:** all collection cards (Embla carousel requires browser), NFT viewer, lang switcher, Logo (random colors)
- **`LazyHydrate`:** wraps lower collections on home page with `IntersectionObserver` for deferred render

### i18n with Lingui v5

- **Macro-based:** `t(i18n)` , `Trans` compiled at build time via SWC plugin
- **Server-side:** `appRouterI18n.ts` preloads all `.po` catalogs; `withLinguiLayout`/`withLinguiPage` HOCs inject `I18n` instance
- **Client-side:** `LinguiClientProvider` wraps children with runtime `I18nProvider`
- **Locale switching:** `<select>` in `Switcher.tsx` → `router.push()` to new `/[lang]/...` path
- **Disabled middleware:** `src/NOTUSED:middleware.ts` has `Accept-Language` auto-detection (commented out; currently hard-redirects `/` → `/ru`)

### Content Model — Collection

```ts
// src/constants/collections.ts → collectionsData
{
  [key: string]: {
    name: string;              // Display name
    network: 'Ethereum';
    standard: 'ERC-721';
    contract: string;          // Ethereum address
    minIndex: number;          // Token ID range start
    maxIndex: number;          // Token ID range end
    padded: boolean;           // Viewer padding mode
    generationContractBytecode?: string;  // Only Window collection
    marketplaces: {
      rarible: {
        name: 'Rarible';
        link: string;          // Collection page
        tokenLink: string;     // Individual token link
      };
    };
  };
}
```

### Content Model — Message/Article

```ts
// src/constants/text.ts → messagesList
{
  [key: string]: {
    [lang: 'en' | 'ru']: {
      key: string;
      title: string;
      text: string;  // Full article body (markdown-ish, no HTML)
    };
  };
}
```

### NFT Data Flow

1. ERC721Viewer is a `'use client'` component
2. Reads `?item=` query param or falls back to `minIndex`
3. Calls `tokenURI(tokenId)` on the Ethereum contract via `ethers.js` + proxy RPC (`https://vercel-rpc-view.vercel.app/api/view`)
4. Resolves `ipfs://` URIs → `https://ipfs.io/ipfs/...`
5. Handles `data:application/json;base64,...` inline metadata
6. Renders via `next/image` with `unoptimized: true`

---

## SEO & Indexing Strategy

### Current Setup

| Asset                              | Location                 | Purpose                            |
| ---------------------------------- | ------------------------ | ---------------------------------- |
| `<title>`, `<meta>` tags           | `[lang]/layout.tsx`      | Primary SEO (i18n-aware)           |
| Open Graph / Twitter Cards         | `[lang]/layout.tsx`      | Social sharing previews            |
| `canonical` + `alternate` hreflang | `[lang]/layout.tsx`      | Multi-locale indexing              |
| `robots.txt`                       | `public/robots.txt`      | Crawler directives + sitemap link  |
| `sitemap.xml`                      | `public/sitemap.xml`     | All EN+RU pages with priority/freq |
| `llm.txt`                          | `public/llm.txt`         | AI crawler context                 |
| PWA manifest                       | `src/app/manifest.ts`    | Installable web app                |
| GTM `GTM-TWZXMCQQ`                 | `components/GTM/GTM.tsx` | Analytics                          |
| Custom 404                         | `src/app/not-found.tsx`  | SEO meta on 404 page               |

### Gaps & Recommendations for Scaling

- **JSON-LD structured data:** Not yet implemented. Add `Schema.org/VisualArtwork` or `CollectionPage` markup on collection/view pages.
- **Dynamic sitemap:** Currently a static XML. As collections grow, generate `public/sitemap.xml` at build time via a script or `generateSitemap()` in Next.js.
- **Per-collection meta tags:** Currently all pages share the same global meta. Add `generateMetadata()` to `view/[collection]/page.tsx` for collection-specific title, description, and og:image.
- **OpenGraph image per collection:** Generate or select a representative image for each collection's social card.
- **Alt text audit:** Ensure every `<Image>` has descriptive `alt` attributes (currently partial).

### Adding a New Page → Sitemap Checklist

1. Add `<url>` entry to `public/sitemap.xml` for both EN and RU
2. If the page has its own layout, add `generateMetadata()` with locale-aware meta
3. Add hreflang alternates in the page `<head>`
4. Link from existing pages (internal link graph)

---

## How to Add a New Collection

1. **Add sample images** to `public/images/{collectionKey}/` (4–6 `.svg` or `.webp` files)
2. **Add metadata** to `src/constants/collections.ts`:
   ```ts
   'collection-key': {
     name: 'Display Name',
     network: 'Ethereum',
     standard: 'ERC-721',
     contract: '0x...',
     minIndex: 1,
     maxIndex: 512,
     padded: false,
     marketplaces: {
       rarible: {
         name: 'Rarible',
         link: 'https://og.rarible.com/...',
         tokenLink: 'https://og.rarible.com/token/...',
       },
     },
   },
   ```
3. **Create collection card component** in `src/components/collections/CollectionDisplayName.tsx` — follow the existing pattern: Embla carousel, first slide = info text, 6 image slides, last slide = marketplace link.
4. **Add to home page** in `src/app/[lang]/page.tsx` — wrap in `<LazyHydrate>` for collections below the fold.
5. **Add static params** in `src/app/[lang]/view/[collection]/page.tsx` — include new key in the returned array.
6. **Add i18n keys** — run `yarn extract`, translate the new entries in `src/locales/ru.po`, then `yarn compile`.
7. **Update sitemap** — add EN+RU entries to `public/sitemap.xml`.
8. **Update llm.txt** — add new collection URL.
9. **Add Rarible links** — ensure marketplace links in constants and collection component.

---

## How to Add a New Article/Message

1. **Add content** to `src/constants/text.ts` under a new key with `en` and `ru` translations.
2. **Add static params** in `src/app/[lang]/messages/[message]/page.tsx` — add the new key.
3. **Run i18n pipeline:**
   ```bash
   yarn extract && yarn compile
   ```
4. **Update sitemap** — add `<url>` entries for both locales.
5. **Update llm.txt** — add the new article link.

---

## Code Conventions

- **File naming:** PascalCase for components (`CollectionBlinds.tsx`), kebab-case for routes, camelCase for utilities
- **Client components:** always start with `'use client';` directive
- **i18n:** always use `Trans` or `t(i18n)` macros — never hardcode user-facing strings
- **Styling:** CSS Modules (`.module.css` co-located with components)
- **Lazy loading:** collections below the 3rd position on home page use `<LazyHydrate placeholderHeight="508px">`
- **TypeScript:** strict mode; explicit types for function parameters and return values
- **No comments in code** unless critical — let the code speak for itself

---

## Deployment

**Trigger:** push to `main` → GitHub Actions (`.github/workflows/nextjs.yml`)

- Detects Yarn, installs dependencies, runs `next build`
- Uploads `./out` to GitHub Pages artifact
- Deploys to `kirillateev.art`

**Manual deploy:**

```bash
yarn extract && yarn compile && yarn build
# Commit ./out or let CI handle it
```

**Important:** `next.config.mjs` has `output: 'export'` — do not use server-side features (API routes, middleware in production, `next/headers`, etc.).

---

## i18n Pipeline

```
yarn extract   # Scan src/ for t`` and Trans macros → update .po files
               # Edit .po files manually for translations
yarn compile   # Compile .po → .js catalogs (committed to repo)
yarn build     # Next.js build picks up compiled catalogs
```

- **Source locale:** `en` (English)
- **Target locale:** `ru` (Russian)
- **Fallback:** unknown locale → `en`
- **Config:** `lingui.config.js` scans `src/` for both locales

---

## External Dependencies

| Service                               | Purpose                               | Failure mode               |
| ------------------------------------- | ------------------------------------- | -------------------------- |
| `vercel-rpc-view.vercel.app/api/view` | Ethereum RPC proxy for on-chain reads | Viewer shows error message |
| `ipfs.io`                             | IPFS gateway for token images         | Images fail to load        |
| `og.rarible.com`                      | Marketplace links (outbound)          | Dead links; non-critical   |
| Google Tag Manager                    | Analytics                             | Silent failure             |
| GitHub Pages                          | Hosting                               | Site unavailable           |

---

## Scaling Roadmap Considerations

1. **Headless CMS integration** — if content volume grows, consider a git-based CMS (e.g., TinaCMS) or structured content in separate JSON/MDX files instead of inline constants.
2. **Image pipeline** — currently images are static files in `public/`. For 10,000+ collections, consider a CDN or on-demand generation.
3. **Automated sitemap generation** — generate `sitemap.xml` at build time from `collectionsData` and `messagesList`.
4. **Structured data (JSON-LD)** — implement `Schema.org` types for better rich results in Google.
5. **Performance** — add Lighthouse CI to the CI pipeline; monitor Core Web Vitals.
6. **i18n expansion** — the current pattern supports more locales by adding to `lingui.config.js` locales array and creating new `.po` files.
7. **Unit/E2E tests** — currently no test framework. Consider Vitest + Playwright for critical paths (viewer, i18n switching, navigation).
