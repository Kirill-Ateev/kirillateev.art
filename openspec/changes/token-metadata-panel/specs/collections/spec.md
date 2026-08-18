## MODIFIED Requirements

### Requirement: Collection Viewer Page

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
- THEN it emits two JSON-LD blocks: a `BreadcrumbList` and a
  `CollectionPage` (Schema.org)

#### Scenario: Random token

- GIVEN a request for `/en/view/blinds`
- WHEN the page renders
- THEN `<TokenViewer>` receives a `tokenId` equal to
  `getRandomFromRange(minIndex, maxIndex)` for that collection

#### Scenario: No centered title band

- GIVEN a token viewer page for any collection
- WHEN the page renders
- THEN the viewer does NOT render a centered "Collection #tokenId" title band
  above the image; the image is the sole hero element

### Requirement: Per-Token SSG Pages

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
- THEN the image uses `padding: 0px` and its height is capped so the whole
  viewer fits the viewport alongside the metadata panel

- GIVEN a token viewer page for a `padded: false` collection
- WHEN the image renders
- THEN the image uses `padding: 0px 30px 30px 30px` and its height is capped
  so the whole viewer fits the viewport alongside the metadata panel

#### Scenario: Marketplace token link

- GIVEN a token viewer page
- WHEN the marketplace links render
- THEN each link's `href` is `{tokenLink}{tokenId}` (e.g.
  `https://og.rarible.com/token/0x...:3024`) and the links are composed
  inside the metadata panel