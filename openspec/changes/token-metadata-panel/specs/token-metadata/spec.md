## Purpose

Renders on-chain token properties (description and attributes) alongside the
artwork in the token viewer, in a responsive layout that keeps the image
dominant: the panel sits to the right of the artwork on wide screens and slides
beneath it on narrow ones.

## ADDED Requirements

### Requirement: Metadata panel renders token properties

The system SHALL render a panel containing the token's `description` and
`attributes` alongside the artwork whenever on-chain metadata resolves.

#### Scenario: Panel renders after metadata loads

- **WHEN** `TokenViewer` resolves metadata for a token
- **THEN** the `description` is rendered in the panel

#### Scenario: Attributes render as a list

- **WHEN** the metadata carries an `attributes` array
- **THEN** each attribute renders with its `value` as the lead element, its
  `type` as a muted label above the value, and its `description` as a caption
  beneath the value

#### Scenario: Empty attributes are skipped

- **WHEN** the metadata carries no `attributes` array, or an empty one
- **THEN** no attribute entries render (the panel shows description only)

#### Scenario: Marketplace links render in the panel

- **WHEN** the panel renders
- **THEN** each collection marketplace link renders with `href` equal to
  `{tokenLink}{tokenId}`, opening in a new tab

### Requirement: Token name is not rendered

The token's `name` property SHALL NOT be rendered anywhere in the viewer.

#### Scenario: Name absent from the DOM

- **WHEN** `TokenViewer` renders for any token
- **THEN** the token `name` does not appear in the rendered output

### Requirement: Responsive layout

The system SHALL place the panel to the right of the artwork on wide screens
and beneath the artwork on narrow screens.

#### Scenario: Wide screen

- **WHEN** the viewport is wide
- **THEN** the artwork and the panel are arranged side by side, panel on the right

#### Scenario: Narrow screen

- **WHEN** the viewport is narrow
- **THEN** the artwork and the panel are stacked vertically, panel beneath the
  artwork

### Requirement: Artwork is dominant

The artwork SHALL be sized as wide as possible at a height that still fits the
viewport, and the panel SHALL be content-bounded so it never crowds the image.

#### Scenario: Image fills available width

- **WHEN** the viewer renders on a wide screen
- **THEN** the image width expands to fill the space beside the panel

#### Scenario: Image fills available height

- **WHEN** the viewer renders
- **THEN** the image height is capped so the whole viewer fits the viewport
  without the panel pushing the image out of view

#### Scenario: Panel does not grow the image

- **WHEN** the panel content is tall
- **THEN** the panel scrolls independently and the image dimensions are
  unaffected

### Requirement: Loading state

While metadata is unresolved, the viewer SHALL show a loading indicator and
shall not render the panel.

#### Scenario: Loading indicator

- **WHEN** metadata has not yet resolved
- **THEN** a loading indicator renders and no panel renders