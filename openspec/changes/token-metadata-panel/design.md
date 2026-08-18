## Context

See `proposal.md` for the motivation. The current `TokenViewer`
(`src/components/viewer/TokenViewer.tsx:139-207`) and
`OnChainBytecodeViewer` (`src/components/viewer/OnChainBytecodeViewer.tsx:133-201`)
both render a centered title band above the image plus marketplace links, and
both discard the fetched `name`, `description`, and `attributes`. The viewer
container is `height: calc(100vh - 94px)` with `flex-direction: column`
(`src/components/viewer/styles.module.css:1-8`).

Real on-chain metadata (decoded from Blinds #1's base64 `tokenURI`) carries
`attributes` as an array of `{type, value, description}` — `type` is the trait
category, `value` is the trait collectors search on, `description` is the
human label.

Design tokens in play: Nunito, `--primary-color #333` (weight 600),
`--secondary-color #555` (weight 200), `--extra-font-size 14px`. Breakpoints
(`src/hooks/useBreakpoints.ts`): xs ≤640, sm 641–767, md 768–1024, lg ≥1025.

## Goals / Non-Goals

**Goals**

- Render `description` and `attributes` beside the artwork on wide screens,
  beneath it on narrow ones.
- Keep the artwork dominant: widest possible at a viewport-fitting height.
- Reuse the existing marketplace-link rendering and padding modes.
- Scope to `TokenViewer` only; `OnChainBytecodeViewer` is untouched.

**Non-Goals**

- Rendering the token `name`.
- Touching `OnChainBytecodeViewer` (it duplicates the same UI but is out of
  scope for this change).
- Adding i18n strings (on-chain metadata is inherently source-language).
- New dependencies.

## Decisions

### D1 — Presentational component, not inline markup

A new `TokenMetadataPanel` component renders description, attributes, and
marketplace links. `TokenViewer` composes it.

**Alternatives:** inline the panel markup in `TokenViewer`. Rejected — the
viewer already holds metadata state and click handling; splitting the
presentational piece keeps `TokenViewer` as the state owner and makes the panel
unit-testable in isolation.

### D2 — Adjacent (right) on wide, stacked (below) on narrow

A flex row on wide, a flex column on narrow. The panel is content-bounded
(`max-width`/`flex-basis`), so the image keeps the majority of the width on
wide screens and full width on narrow ones.

**Alternatives:** an overlay inspector floated over the image. Rejected — it
occludes part of the artwork and needs z-index/pointer-handling complexity for
marginal visual gain. A flow layout is more robust and accessible.

### D3 — Image sized to fit, not stretched

The image uses `width: 100%` and `height: auto` (or `object-fit: contain` with
an explicit aspect), capped by the viewer's `calc(100vh - 94px)` minus the
panel's measured height. On narrow screens the panel sits below, so the image
takes the full width and its natural height is preserved until it would
overflow — then it shrinks to fit.

**Alternatives:** fixed 512×512 like the collection cards. Rejected — the
viewer is meant to showcase the work at scale; a fixed box wastes space on
large monitors and crops on small ones.

### D4 — Attributes as a restrained list

`value` is the lead (primary, weight 600); `type` is a small muted label above
it; `description` is a caption beneath. Grouped in a vertical list.

**Alternatives:** a 2-column grid. Considered — saves vertical space when
attributes run long, but the list reads more deliberately and matches the
site's restrained aesthetic. Grid deferred; revisit if attributes routinely
exceed ~6 entries.

### D5 — No token name anywhere

Per the scope decision, `metadata.name` is not rendered. The panel opens with
the description.

## Risks / Trade-offs

- **[Long descriptions] → [Mitigation]** On-chain descriptions can be several
  sentences. The panel scrolls independently so the image is never pushed out
  of view.
- **[Many attributes] → [Mitigation]** The panel scrolls; the list keeps each
  entry compact (type/value/description on three small lines).
- **[Image aspect varies] → [Mitigation]** `object-fit: contain` preserves the
  artwork's proportions; nothing is cropped.
- **[Hydration mismatch] → [Mitigation]** All layout is driven by CSS media
  queries, not JS breakpoint state, so SSR and client render match.
- **[OnChainBytecodeViewer divergence] → [Mitigation]** Deliberately out of
  scope; if it is later refactored to share `TokenViewer`'s chrome, the panel
  comes along for free.

## Migration Plan

- `TokenViewer.tsx` gains the panel and loses the title band; behavior is
  additive for the metadata flow (fetch, IPFS/base64 resolution, retry) which
  is unchanged.
- No route, URL, or data-model changes, so no redirect or rollback data is
  needed. If the new layout regresses visually, revert to the previous
  `TokenViewer.tsx` render block.
- After deploy, verify a token page renders the panel beside the image on
  desktop and beneath on mobile.

## Open Questions

- Should attributes be grouped by `type` (collapsing repeated descriptions)
  now or later? Deferred — a visual enhancement, not a behavior change.
- Exact panel width cap (e.g. 420px) is a styling detail to finalize during
  implementation against the live layout.