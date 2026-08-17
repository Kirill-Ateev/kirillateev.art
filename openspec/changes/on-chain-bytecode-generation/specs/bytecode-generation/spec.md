## Purpose

Generates a token's artwork by executing the collection's own contract bytecode
locally in the browser via an EVM, instead of calling `tokenURI` over a remote
RPC. Bytecode is fetched lazily — one contract at a time, only when a token is
actually opened — and cached in `localStorage` keyed by contract address so the
same collection is served from cache on every later visit.

The remote `tokenURI` flow is **not** replaced: `TokenViewer` is the fallback
for non-generative collections and for any local-execution failure, and it
keeps its existing RPC call, IPFS resolution, base64 handling, and retry
behavior unchanged.

## ADDED Requirements

### Requirement: Per-collection bytecode cache

The system SHALL cache contract bytecode in the client's `localStorage`,
keyed by the lowercased contract address, with no expiry.

#### Scenario: Cache hit avoids the network

- GIVEN the user has previously opened `window` (contract `0x4aA41C7C9eCF9cdE5Aa1CC215AAe5d9bB91D0952`)
- WHEN the user opens any token of `window` again
- THEN no `eth_getCode` request is issued; the cached bytecode is used

#### Scenario: Cache miss fetches once

- GIVEN the user opens `window` for the first time
- WHEN the token viewer mounts
- THEN exactly one `eth_getCode` request is issued for the contract address
- AND the response is written to `localStorage` before the token is generated

#### Scenario: Cache key granularity

- GIVEN two collections with different contract addresses
- WHEN both are opened
- THEN each contract has its own cache entry; opening one does not serve the other's bytecode

#### Scenario: Cache persistence across reloads

- GIVEN the bytecode is cached
- WHEN the page is reloaded
- THEN the cache survives and is reused

### Requirement: Bytecode source is eth_getCode, never the config

The system SHALL obtain bytecode exclusively from `eth_getCode` over the
existing RPC transport. The `generationContractBytecode` field on
`CollectionData` is **not used at runtime** and must stay empty.

#### Scenario: Config bytecode is not bundled

- GIVEN `collectionsData`
- WHEN the site is built
- THEN no collection's bytecode is included in any page bundle

#### Scenario: Example bytecodes live outside the build graph

- GIVEN `src/constants/exampleBytecodes.ts`
- WHEN the site is built
- THEN that module is not imported anywhere in `src/` and contributes
  nothing to the build output; it is a template for pasting bytecodes by hand

### Requirement: Lazy single-contract bytecode fetching

The system SHALL fetch bytecode for exactly one contract at a time — the one
being viewed — and MUST NOT preload, batch, or eagerly load bytecode for any
collection that the user has not opened.

#### Scenario: Only the open collection is fetched

- GIVEN the home page lists 10 collections
- WHEN the user opens `/en/view/window`
- THEN bytecode is fetched only for `window`; no request is made for any other collection

#### Scenario: Bytecode is fetched from the RPC

- GIVEN a generative collection with contract address `0x4aA41C7C9eCF9cdE5Aa1CC215AAe5d9bB91D0952`
- WHEN the bytecode is needed and not cached
- THEN the system calls `eth_getCode` for that block number `latest` over the existing RPC transport

### Requirement: Remote tokenURI flow is reused, not replaced

The system SHALL not introduce a new network path for fetching `tokenURI`.
The only new network call is `eth_getCode`, issued at most once per
uncached collection.

#### Scenario: Fallback reuses TokenViewer

- GIVEN a generative collection whose bytecode fails to execute locally
- WHEN the token viewer cannot produce an image
- THEN the system renders `<TokenViewer>` for the same collection and token,
  which performs the existing `PUBLIC_CLIENT.readContract` `tokenURI` call

#### Scenario: Non-generative collections keep the existing path

- GIVEN `attentionless` or `selection` (`generatesOnChain: false`)
- WHEN the token viewer mounts
- THEN no EVM is loaded and no `eth_getCode` is issued; the existing
  `TokenViewer` RPC flow is used unchanged

### Requirement: Local EVM execution of tokenURI

The system SHALL execute the contract bytecode in the browser EVM and decode
the returned `tokenURI` string, without any server-side involvement.

#### Scenario: Successful generation

- GIVEN a generative collection and a cached bytecode value
- WHEN the token viewer mounts with `tokenId = 3024`
- THEN the EVM runs the bytecode with `data` = `encodeFunctionData('tokenURI', [3024])`
- AND the returned `returnValue` is decoded via `decodeFunctionResult('tokenURI', ...)`
- AND the decoded `tokenURI` string is used as the image source

#### Scenario: Execution failure falls back

- GIVEN a generative collection whose bytecode fails to execute (e.g. `exceptionError` set or empty `returnValue`)
- WHEN the EVM run throws or returns no data
- THEN the system falls back to the remote `tokenURI` read via `PUBLIC_CLIENT.readContract`

### Requirement: Generative flag on collections

The system SHALL mark which collections generate their artwork from contract
bytecode via a `generatesOnChain: boolean` flag on `CollectionData`.

#### Scenario: Generative collections

- GIVEN `collectionsData`
- WHEN the flag is consulted
- THEN `window`, `crosswalk`, `lanes`, `blinds`, `city`, `frames`, `folds`, and `cocktail-straws` have `generatesOnChain: true`

#### Scenario: Non-generative collections

- GIVEN `collectionsData`
- WHEN the flag is consulted
- THEN `attentionless` and `selection` have `generatesOnChain: false` and keep the existing RPC viewer

### Requirement: Viewer selection by flag

The system SHALL render `OnChainBytecodeViewer` when `generatesOnChain` is `true`
and `TokenViewer` when `false`, for both the collection route and the per-token
route.

#### Scenario: Collection route

- GIVEN `/en/view/window` (`generatesOnChain: true`)
- WHEN the page renders
- THEN it renders `<OnChainBytecodeViewer>`

- GIVEN `/en/view/attentionless` (`generatesOnChain: false`)
- WHEN the page renders
- THEN it renders `<TokenViewer>`

#### Scenario: Per-token route

- GIVEN `/en/view/window/3024` (`generatesOnChain: true`)
- WHEN the page renders
- THEN it renders `<OnChainBytecodeViewer>` bound to token `3024`

### Requirement: TokenViewer is unchanged

The system SHALL not modify `TokenViewer`; it remains the fallback component
and keeps its existing retry/`Loading…` behavior.

#### Scenario: TokenViewer untouched

- GIVEN the change is applied
- WHEN `TokenViewer.tsx` is inspected
- THEN it contains no modifications from its pre-change state

### Requirement: EVM runtime constraints

The system SHALL load the EVM runtime lazily so it is never included in the
home, series, messages, or selection pages.

#### Scenario: EVM is route-scoped

- GIVEN a request for `/en/` (home)
- WHEN the page bundle is built
- THEN the EVM runtime is not imported

#### Scenario: EVM is loaded only on view pages

- GIVEN a request for `/en/view/window`
- WHEN the page bundle is built
- THEN the EVM runtime is included in that route's chunk