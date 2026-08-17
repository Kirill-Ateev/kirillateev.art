# Collections Module

## Purpose

The Collections module renders the artist's NFT collections as horizontally
draggable carousels (Embla Carousel). It is the primary visual entry point of
the site: the home page (`/`) and the Selection page (`/selection`) both
compose collection cards. Each collection has its own client component
(`CollectionFolds`, `CollectionBlinds`, etc.), a metadata record in
`collectionsData`, and a dedicated route `/[lang]/view/[collection]` plus a
per-token SSG route `/[lang]/view/[collection]/[tokenId]`.

## Architecture

- **10 active collections** defined in `src/constants/collections.ts` as
  `collectionsData: Record<string, CollectionData>`.
- **10 client components** in `src/components/collections/`:
  `CollectionFolds`, `CollectionFrames`, `CollectionCity`, `CollectionBlinds`,
  `CollectionCocktailStraws`, `CollectionWindow`, `CollectionCrosswalk`,
  `CollectionLanes`, `CollectionAttentionless`, `CollectionSelection`.
- All components share one CSS module `src/components/collections/styles.module.css`.
- Components are composed on `src/app/[lang]/page.tsx` (home) and
  `src/app/[lang]/selection/page.tsx`. Collections below the 3rd position are
  wrapped in `<LazyHydrate>` for deferred client hydration.
- The collection viewer page
  `src/app/[lang]/view/[collection]/page.tsx` renders `<TokenViewer>`, a client
  component that fetches on-chain metadata via `viem`.

## Collection Data Model

Each `CollectionData` record MUST contain:

| Field                        | Type                                        | Required |
| ---------------------------- | ------------------------------------------- | -------- |
| `name`                       | string                                      | yes      |
| `network`                    | string (always `'Ethereum'`)                | yes      |
| `standard`                   | string (e.g. `'ERC-721'`)                   | yes      |
| `contract`                   | Ethereum address                            | yes      |
| `minIndex`                   | number                                      | yes      |
| `maxIndex`                   | number                                      | yes      |
| `padded`                     | boolean                                     | yes      |
| `imageExt`                   | `'svg' \| 'webp' \| null`                   | yes      |
| `description`                | string (fallback, English)                  | yes      |
| `descriptions`               | `Record<'en' \| 'ru', string>`              | yes      |
| `marketplaces`               | `Record<string, { name, link, tokenLink }>` | yes      |
| `generationContractBytecode` | string (optional, only used by `window`)    | no       |

## Requirement: Carousel Rendering

The system SHALL render each collection as a horizontally draggable carousel
built with `embla-carousel-react` configured with `dragFree: true` and
`containScroll: 'trimSnaps'`.

#### Scenario: Carousel structure

- GIVEN a collection component mounted in the browser
- WHEN the component renders
- THEN the carousel contains exactly three kinds of slides in order:
  - an info card (`card_first`) with the collection name, network/date,
    work count, description, and two links ("View collection" and marketplace)
  - N image slides (6 per collection, except `Selection` which has 4)
  - a final arrow slide (`container_arrow`) linking to the marketplace

#### Scenario: Drag behavior

- GIVEN a user opens a collection carousel on a desktop or touch device
- WHEN the user drags the carousel
- THEN the carousel scrolls freely with `dragFree` momentum and snaps to slides

## Requirement: Image Loading

The system SHALL load collection sample images from the bundled `public/`
directory via `next/image` with `unoptimized: true`.

#### Scenario: Image source path

- GIVEN a collection with key `folds` and `imageExt: 'svg'`
- WHEN the `CollectionFolds` component renders an image with id `174`
- THEN the image `src` is `${basePath}/images/folds/174.svg`

#### Scenario: Image dimensions

- GIVEN a standard collection image slide
- WHEN the image renders
- THEN the image is 512×512 pixels

#### Scenario: WebP images

- GIVEN the `attentionless` collection with `imageExt: 'webp'`
- WHEN the `CollectionAttentionless` component renders an image
- THEN the image `src` ends with `.webp`

#### Scenario: Alt text

- GIVEN any collection image
- WHEN the image renders
- THEN the `alt` attribute is `"<CollectionName> #<imageId> by Kirill Ateev"`

## Requirement: Lazy Hydration

The system SHALL defer client hydration of collections positioned below the
third slot on the home page.

#### Scenario: Lazy-wrapped collections

- GIVEN the home page at `/[lang]/`
- WHEN the page renders
- THEN `CollectionFolds`, `CollectionFrames`, and `CollectionCity` render
  immediately (not wrapped)
- AND `CollectionBlinds`, `CollectionCocktailStraws`, `CollectionWindow`,
  `CollectionCrosswalk`, `CollectionLanes`, and `CollectionAttentionless` are
  each wrapped in `<LazyHydrate placeholderHeight="508px">`

#### Scenario: Intersection trigger

- GIVEN a collection wrapped in `<LazyHydrate>`
- WHEN the user scrolls the placeholder into the viewport (with 50px root margin)
- THEN the collection's client component hydrates and renders

## Requirement: Navigation Links

The system SHALL provide two outbound navigation links per collection card:
a "View collection" link and a marketplace link.

#### Scenario: View collection link

- GIVEN a collection card for `blinds`
- WHEN the user clicks "View collection >"
- THEN the browser navigates to `/{locale}/view/blinds/{randomTokenId}`
  where `randomTokenId` is a random integer in `[minIndex, maxIndex]`

#### Scenario: Marketplace link

- GIVEN any collection card
- WHEN the user clicks the marketplace link (e.g. "Rarible >")
- THEN the browser opens `collectionsData[<key>].marketplaces.rarible.link`
  in a new tab (`target="_blank"`, `rel="nreferrer"`)

#### Scenario: Arrow slide

- GIVEN the final arrow slide of a carousel
- WHEN the user clicks the `ArrowRight` icon
- THEN the browser opens the collection's marketplace link in a new tab

## Requirement: i18n

The system SHALL render all user-facing text in the current locale using
Lingui macros (`Trans`), with English as the source locale and Russian as the
fallback target.

#### Scenario: Locale-aware view link

- GIVEN a collection card rendered on the `/ru/` page
- WHEN the "View collection" link is generated
- THEN the link path starts with `/ru/view/...`

#### Scenario: Translatable strings

- GIVEN a collection card
- WHEN it renders
- THEN the collection name is hardcoded (not translated), but the network,
  date, work count, description, on-chain note, and "View collection" label
  are wrapped in `<Trans>`

## Requirement: Collection Viewer Page

The system SHALL provide a server-rendered page per collection at
`/[lang]/view/[collection]` that displays a random token from that
collection via `<TokenViewer>`.

#### Scenario: Static params

- GIVEN the build process
- WHEN `generateStaticParams()` runs
- THEN it returns one path per `(lang, collection)` pair for every key in
  `collectionsData` and every locale in `lingui.config`

#### Scenario: Metadata

- GIVEN a request for `/en/view/window`
- WHEN `generateMetadata()` runs
- THEN the page title is `"<CollectionName> by <SiteName>"`, the description
  is the locale-specific `descriptions[lang]`, and OpenGraph/Twitter cards
  use `/og/<collection>.png` as the image

#### Scenario: Structured data

- GIVEN a collection viewer page
- WHEN it renders
- THEN it emits two JSON-LD blocks: a `BreadcrumbList` and a `CollectionPage`
  (Schema.org)

#### Scenario: Random token

- GIVEN a request for `/en/view/blinds`
- WHEN the page renders
- THEN `<TokenViewer>` receives a `tokenId` equal to
  `getRandomFromRange(minIndex, maxIndex)` for that collection

## Requirement: Per-Token SSG Pages

The system SHALL pre-render one static page per token at
`/[lang]/view/[collection]/[tokenId]`.

#### Scenario: Static params

- GIVEN the build process
- WHEN `generateStaticParams()` runs for the token route
- THEN it returns one path per `(lang, collection, tokenId)` where
  `tokenId` ranges from `minIndex` to `maxIndex` inclusive

#### Scenario: On-chain metadata fetch

- GIVEN a per-token page for `window` token `3024`
- WHEN `<TokenViewer>` mounts
- THEN it calls `tokenURI(3024)` on the collection's Ethereum contract via
  `PUBLIC_CLIENT.readContract` with the `ERC721_ABI`

#### Scenario: IPFS resolution

- GIVEN a `tokenURI` of `ipfs://Qm...`
- WHEN `<TokenViewer>` resolves it
- THEN the metadata URL becomes `https://ipfs.io/ipfs/Qm...`

#### Scenario: On-chain base64 metadata

- GIVEN a `tokenURI` of `data:application/json;base64,...`
- WHEN `<TokenViewer>` resolves it
- THEN it decodes the base64 payload and parses the result as JSON metadata

#### Scenario: Retry behavior

- GIVEN a metadata fetch that fails (invalid contract, network error, or
  non-OK HTTP response)
- WHEN the fetch throws
- THEN `<TokenViewer>` retries after a 100 ms delay and shows a
  "Loading…" indicator with animated dots; it never displays an error

#### Scenario: Random navigation

- GIVEN a token viewer page for a non-`padded` collection
- WHEN the user clicks the rendered image or the "(click for next)" subtitle
- THEN the page navigates to `/{lang}/view/{collection}/{randomTokenId}`
  with a new random token in `[minIndex, maxIndex]`

#### Scenario: Padding mode

- GIVEN a token viewer page for a `padded: true` collection (e.g. `window`)
- WHEN the image renders
- THEN the image uses `padding: 0px` and `maxHeight: calc(100% - 21.5px)`

- GIVEN a token viewer page for a `padded: false` collection
- WHEN the image renders
- THEN the image uses `padding: 0px 30px 30px 30px` and
  `maxHeight: calc(100% - 37.5px)`

#### Scenario: Marketplace token link

- GIVEN a token viewer page
- WHEN the marketplace links render
- THEN each link's `href` is `{tokenLink}{tokenId}` (e.g.
  `https://og.rarible.com/token/0x...:3024`)

## Requirement: Selection Collection

The system SHALL render the `Selection` collection as a special variant with
non-uniform image sizes.

#### Scenario: Selection card variants

- GIVEN the `CollectionSelection` component
- WHEN it renders its image slides
- THEN images whose id starts with `Berry` use `card_berry` (384×512) and
  display a human-readable title (`Berry #1`, `Berry #2`); all other images
  use `card_nights` (512×512) and display their raw id

## Requirement: Archived Collections

The system SHALL keep archived collections (KindWords, LifeIsAnIllusion)
commented out in the home page rather than rendering them.

#### Scenario: Archived components

- GIVEN the home page source
- WHEN the page renders
- THEN `CollectionLanes`, `CollectionKindWords`, and
  `CollectionLifeIsAnIllusion` are not rendered (their JSX is commented out)
