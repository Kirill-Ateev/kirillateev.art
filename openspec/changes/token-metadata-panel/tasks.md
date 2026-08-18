## 1. Type & data model

- [x] 1.1 Extend `NFTMetadata` in `TokenViewer.tsx` with an optional
      `attributes?: Array<{ type?: string; value?: string; description?: string }>`

## 2. Metadata panel component

- [x] 2.1 Create `src/components/viewer/TokenMetadataPanel.tsx` as a
      presentational component
- [x] 2.2 Render the token `description` as the panel's opening text (compact:
      extra font size, tight line height, reduced margin)
- [x] 2.3 Render `attributes` as a list showing both key (`type`) and value,
      with `description` as a caption beneath
- [x] 2.4 Skip attribute entries that have neither `type` nor `value`
- [x] 2.5 Style the panel with the site's design tokens (Nunito, primary/secondary
      colors, extra font size) — no new dependencies
- [x] 2.6 Marketplace links are NOT rendered by the panel; they live in the
      header above the artwork

## 3. Viewer layout

- [x] 3.1 Render a header above the image containing the collection name,
      "(click for next)", and marketplace links
- [x] 3.2 Position "(click for next)" absolutely, centered above the image
- [x] 3.3 Compose `TokenMetadataPanel` beside the image on wide screens
- [x] 3.4 Stack the panel beneath the image on narrow screens
- [x] 3.5 Size the image as wide as possible at a viewport-fitting height,
      with padding on the stage so the artwork does not touch the viewport
      corners
- [x] 3.6 Preserve the `padded` padding modes for the image
- [x] 3.7 Make the viewer height fluid on narrow screens (no `100vh` cap)

## 4. Verification

- [x] 4.1 `yarn lint` passes (exit 0)
- [x] 4.2 `yarn build` succeeds with `output: 'export'`
- [x] 4.3 On a wide viewport the panel renders to the right of the image
- [x] 4.4 On a narrow viewport the panel renders beneath the image
- [x] 4.5 The token `name` does not appear in the rendered output
- [x] 4.6 Marketplace links still resolve to `{tokenLink}{tokenId}`