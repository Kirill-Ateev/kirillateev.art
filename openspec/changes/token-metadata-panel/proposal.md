## Why

Every token viewer on the site fetches on-chain metadata (`name`, `description`,
`attributes`) and then renders only the `image` — the fetched properties are
discarded. Collectors and the NFT community visit these pages to learn what a
work *is*, not just to look at it, and the attributes (trait type + value) are
exactly the signal they search and filter on. Rendering them beside the artwork
turns each token page from a bare image viewer into a proper artwork page.

## What Changes

- **New presentational component `TokenMetadataPanel`** that renders a token's
  `description` and `attributes` (plus the marketplace links), co-located with
  the artwork.
- **`TokenViewer` is the only consumer** (per scope decision). The panel is
  injected into the existing viewer layout; the old centered
  "Collection #tokenId" title band is removed and the token `name` is not
  rendered anywhere.
- **Responsive layout**: on wide screens the panel sits to the right of the
  artwork; on narrow screens it slides beneath it. The artwork is the hero —
  it is sized as wide as possible at a height that still fits the viewport, and
  the panel is content-bounded so it never crowds the image.
- **`NFTMetadata` type gains an `attributes` field** so the fetched payload is
  typed, not ignored.

No new dependencies. No i18n strings added (all rendered text comes from
on-chain metadata, which is inherently English/source-language).

## Capabilities

### New Capabilities

- `token-metadata`: Rendering of on-chain token properties (`description`,
  `attributes`) alongside the artwork in `TokenViewer`, with a responsive
  adjacent/below layout that keeps the image dominant.

### Modified Capabilities

- `collections`: the Collection Viewer Page / Per-Token SSG Pages requirements
  change — the viewer no longer renders a centered "Collection #tokenId" title
  band above the image; the image becomes the sole hero and a metadata panel
  is composed beside (wide) or below (narrow) it. Padding-mode and
  "(click for next)" behavior are preserved.

## Impact

- `src/components/viewer/TokenViewer.tsx` — gains the panel, loses the title
  band; `NFTMetadata` type extended with `attributes`.
- `src/components/viewer/TokenMetadataPanel.tsx` — new component (proposal
  only; implementation is a later change).
- `src/components/viewer/styles.module.css` — layout rules for the row/column
  split and image sizing.
- `openspec/specs/collections/spec.md` — viewer rendering scenarios updated to
  describe the panel (delta spec to be written with implementation).
- `src/app/[lang]/view/[collection]/[tokenId]/page.tsx` — unaffected
  (metadata is fetched client-side by `TokenViewer`; no server change).