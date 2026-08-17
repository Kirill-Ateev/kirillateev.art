# Bytecode Generation Specification

## Purpose

Generates a token's artwork by executing the collection's own contract bytecode
locally in the browser via an EVM. Bytecode is bundled per collection and loaded
lazily by dynamic import — only the bytecode for the collection the user actually
opens is ever fetched from the bundle, so home, series, messages, selection, and
community pages carry none of it. The remote `tokenURI` flow is not replaced:
`TokenViewer` is the fallback for non-generative collections and for any
local-execution failure, and keeps its existing RPC call, IPFS resolution,
base64 handling, and retry behavior unchanged.

## Requirements

### Requirement: Per-collection bytecode loading

The system SHALL load bytecode for exactly one contract at a time — the one
being viewed — and MUST NOT preload, batch, or eagerly load bytecode for any
collection the user has not opened.

#### Scenario: Only the open collection is fetched

- GIVEN the home page lists 10 collections
- WHEN the user opens `/en/view/folds`
- THEN bytecode is fetched only for `folds`; no bytecode is loaded for any other collection

#### Scenario: Bytecode is sourced from the bundle, not the network

- GIVEN a generative collection with contract address `0x1332cba03717a9ae8346fa034a9e0bffb0cfba91`
- WHEN the bytecode is needed
- THEN it is resolved by dynamic `import()` of `src/constants/bytecodes/folds.ts`
  and is never fetched over the network

#### Scenario: Bytecode is not bundled into non-viewer pages

- GIVEN the home, series, messages, selection, and community pages
- WHEN the site is built
- THEN none of those page bundles contain any contract bytecode

#### Scenario: Bytecode is viewer-scoped

- GIVEN a request for `/en/view/window`
- WHEN the page bundle is built
- THEN the bytecode chunk for `window` is included in that route's bundle

### Requirement: Bytecode is never taken from the config

The system SHALL obtain bytecode exclusively from the per-collection dynamic
imports in `src/constants/bytecodes/`. The `generationContractBytecode` field on
`CollectionData` is **not used at runtime** and must stay empty.

#### Scenario: Config bytecode is not bundled

- GIVEN `collectionsData`
- WHEN the site is built
- THEN no collection's bytecode is included in any page bundle via the config

### Requirement: Lazy bytecode loader registry

The system SHALL expose `getBytecode(contractAddress)` from
`src/constants/bytecodes/index.ts`, which returns the bytecode for a registered
address or `null` when no loader is registered.

#### Scenario: Returns null for an unregistered address

- GIVEN an address with no registered loader
- WHEN `getBytecode(address)` is called
- THEN it returns `null`

#### Scenario: Lookup is case-insensitive

- GIVEN a loader registered for `0xAbCdEf...`
- WHEN `getBytecode` is called with `0xABCDEF...`
- THEN it returns the registered bytecode

#### Scenario: Returns null for an empty default export

- GIVEN a loader whose module exports an empty string
- WHEN `getBytecode(address)` is called
- THEN it returns `null`

### Requirement: Local EVM execution of tokenURI

The system SHALL execute the contract bytecode in the browser EVM and decode
the returned `tokenURI` string, without any server-side involvement.

#### Scenario: Successful generation

- GIVEN a generative collection and a bytecode value
- WHEN the token viewer mounts with `tokenId = 3024`
- THEN the EVM runs the bytecode with `data` = `encodeFunctionData('tokenURI', [3024])`
- AND the returned `returnValue` is decoded via `decodeFunctionResult('tokenURI', ...)`
- AND the decoded `tokenURI` string is used as the image source

#### Scenario: Execution failure falls back

- GIVEN a generative collection whose bytecode fails to execute (e.g. `exceptionError`
  set, empty `returnValue`, or a revert)
- WHEN the EVM run throws or returns no data
- THEN the system renders `<TokenViewer>` for the same collection and token,
  which performs the existing `PUBLIC_CLIENT.readContract` `tokenURI` call

#### Scenario: Empty or malformed bytecode is rejected

- GIVEN an empty string or a value without a `0x` prefix
- WHEN `runTokenURI` is called
- THEN it returns `{ ok: false }` without invoking the EVM

### Requirement: Remote tokenURI flow is reused, not replaced

The system SHALL not introduce a new network path for fetching `tokenURI`.
The only new data path is the lazy dynamic import of bytecode.

#### Scenario: Fallback reuses TokenViewer

- GIVEN a generative collection whose bytecode fails to execute locally
- WHEN the token viewer cannot produce an image
- THEN the system renders `<TokenViewer>` for the same collection and token,
  which performs the existing `PUBLIC_CLIENT.readContract` `tokenURI` call

#### Scenario: Non-generative collections keep the existing path

- GIVEN `attentionless` or `selection` (`generatesOnChain: false`)
- WHEN the token viewer mounts
- THEN no EVM is loaded; the existing `TokenViewer` RPC flow is used unchanged

### Requirement: Generative flag on collections

The system SHALL mark which collections generate their artwork from contract
bytecode via a `generatesOnChain: boolean` flag on `CollectionData`.

#### Scenario: Generative collections

- GIVEN `collectionsData`
- WHEN the flag is consulted
- THEN `folds`, `frames`, `city`, `blinds`, `cocktail-straws`, `window`,
  `crosswalk`, and `lanes` have `generatesOnChain: true`

#### Scenario: Non-generative collections

- GIVEN `collectionsData`
- WHEN the flag is consulted
- THEN `attentionless` and `selection` have `generatesOnChain: false` and keep
  the existing RPC viewer

#### Scenario: Every generative collection has a bytecode loader

- GIVEN a collection with `generatesOnChain: true`
- WHEN `getBytecode(contract)` is called
- THEN it returns a non-null, `0x`-prefixed bytecode

#### Scenario: No off-chain collection has a bytecode loader

- GIVEN a collection with `generatesOnChain: false`
- WHEN `getBytecode(contract)` is called
- THEN it returns `null`

### Requirement: Viewer selection by flag

The system SHALL render `OnChainBytecodeViewer` when `generatesOnChain` is `true`
and `TokenViewer` when `false`, for both the collection route and the per-token
route.

#### Scenario: Collection route

- GIVEN `/en/view/folds` (`generatesOnChain: true`)
- WHEN the page renders
- THEN it renders `<OnChainBytecodeViewer>`

- GIVEN `/en/view/attentionless` (`generatesOnChain: false`)
- WHEN the page renders
- THEN it renders `<TokenViewer>`

#### Scenario: Per-token route

- GIVEN `/en/view/folds/1` (`generatesOnChain: true`)
- WHEN the page renders
- THEN it renders `<OnChainBytecodeViewer>` bound to token `1`

### Requirement: TokenViewer is unchanged

The system SHALL not modify `TokenViewer`; it remains the fallback component and
keeps its existing retry/`Loading…` behavior.

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

- GIVEN a request for `/en/view/folds`
- WHEN the page bundle is built
- THEN the EVM runtime is included in that route's chunk