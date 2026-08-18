## 1. Type & data model

- [ ] 1.1 Extend `NFTMetadata` in `TokenViewer.tsx` with an optional
      `attributes?: Array<{ type?: string; value?: string; description?: string }>`

## 2. Metadata panel component

- [ ] 2.1 Create `src/components/viewer/TokenMetadataPanel.tsx` as a
      presentational component
- [ ] 2.2 Render the token `description` as the panel's opening text
- [ ] 2.3 Render `attributes` as a list: `value` lead, `type` muted label
      above, `description` caption beneath
- [ ] 2.4 Skip attribute entries that have no `value`
- [ ] 2.5 Render each marketplace link with `href` = `{tokenLink}{tokenId}`,
      opening in a new tab
- [ ] 2.6 Style the panel with the site's design tokens (Nunito, primary/secondary
      colors, extra font size) — no new dependencies

## 3. Viewer layout

- [ ] 3.1 Remove the centered "Collection #tokenId" title band from
      `TokenViewer.tsx`
- [ ] 3.2 Compose `TokenMetadataPanel` beside the image on wide screens
- [ ] 3.3 Stack the panel beneath the image on narrow screens
- [ ] 3.4 Size the image as wide as possible at a viewport-fitting height
- [ ] 3.5 Keep the "(click for next)" subtitle and random-navigation click
      behavior intact
- [ ] 3.6 Preserve the `padded` padding modes for the image

## 4. Verification

- [ ] 4.1 `yarn lint` passes (exit 0)
- [ ] 4.2 `yarn build` succeeds with `output: 'export'`
- [ ] 4.3 On a wide viewport the panel renders to the right of the image
- [ ] 4.4 On a narrow viewport the panel renders beneath the image
- [ ] 4.5 The token `name` does not appear in the rendered output
- [ ] 4.6 Marketplace links still resolve to `{tokenLink}{tokenId}`