## Context

See proposal.md — Why. This change adds local EVM execution of `tokenURI` to
the collection viewer.

Key constraints from the existing codebase:

- `next.config.mjs` sets `output: 'export'` — a fully static site. There is no
  Node server at runtime, so "pull bytecode from the server" cannot mean our
  server. Bytecode must come from the browser calling `eth_getCode` over the
  existing RPC proxy (`vercel-rpc-view.vercel.app/api/view`, already in
  `connect-src`).
- **Q-A resolved: the existing flow is reused.** The remote `tokenURI` read
  already lives in `TokenViewer` via `PUBLIC_CLIENT.readContract` with
  `ERC721_ABI`. The new component does not invent a new data path: on cache
  miss or EVM failure it renders `<TokenViewer>`, which keeps the exact same
  RPC call, IPFS resolution, base64 handling, and silent retry loop. The only
  *new* network call is `eth_getCode`, and it happens at most once per
  collection.
- `TokenViewer` (client component) already implements the remote `tokenURI`
  read, IPFS resolution, base64 handling, and a silent retry loop. It is the
  designated fallback and must not be modified.
- `ERC721StandaloneViewer.tsx` contains an earlier, commented-out prototype of
  exactly this feature (EVM + `tokenURI`), but it assumed the passed bytecode
  *is* the `tokenURI` implementation and depended on `@ethereumjs/evm`, which
  is not installed.
- `viem` is already a dependency and provides `parseAbi`,
  `encodeFunctionData`, and `decodeFunctionResult` — no new ABI library is
  needed.
- `collectionsData` already has a `generationContractBytecode` field. It is
  **not used at runtime**: bytecode comes from `eth_getCode`. The field is
  kept for backward compatibility only.

## Library choice: `@ethereumjs/evm` v10

`@ethereumjs/evm` v10.x is the chosen EVM runtime (the v8 line depended on
`mcl-wasp` and `rustbn.js`, two ~1.3 MB WASM packages). v10 replaced those with
pure-JS `@noble/curves` / `@noble/hashes`, so:

- **No WASM at all** — no `wasm-src` CSP directive is needed and no
  `'unsafe-eval'` probe is required. **Q-B resolved: the production CSP in
  `next.config.mjs` needs no changes.**
- Unpacked size is ~2.8 MB for `evm` plus ~0.6 MB `common` and ~1 MB `util`,
  all in the viewer route chunk only.

API (confirmed via the package docs):

```ts
import { createEVM } from '@ethereumjs/evm'
import { Common, Hardfork, Mainnet } from '@ethereumjs/common'
import { hexToBytes } from '@ethereumjs/util'

const evm = await createEVM({ common: new Common({ chain: Mainnet, hardfork: Hardfork.Shanghai }) })
const res = await evm.runCode({
  code: hexToBytes(bytecode),
  data: hexToBytes(encodeFunctionData(...)),
  gasLimit: 10_000_000n,
})
// res.exceptionError  -> set on failure
// res.returnValue    -> Uint8Array, decode with decodeFunctionResult
```

`runCode` (not `runCall`) is the documented method for executing raw bytecode
without a message/transaction context, which is exactly what we need.

## Goals / Non-Goals

**Goals:**

- Generate the artwork from the contract's own bytecode, executed in-browser.
- Fetch bytecode lazily, one contract at a time, only when a token is opened.
- Cache bytecode in `localStorage` keyed by contract address, forever.
- Keep `TokenViewer` untouched as the fallback for non-generative collections.
- Keep the EVM runtime out of every route except the viewer pages.

**Non-Goals:**

- Do not modify `TokenViewer`.
- Do not bundle bytecode into the site; it is fetched at runtime.
- Do not support collections whose generative logic lives in a *separate*
  deployer contract that the ERC-721 calls out to (see Risks).
- Do not change the per-token SSG build; generation stays client-side.

## Decisions

### 1. New component `OnChainBytecodeViewer`, not a fork of `TokenViewer`

`TokenViewer` is the fallback and must stay untouched. The new component is a
separate client component that wraps the same UI chrome (title, marketplace
links, padding modes) but resolves the image through local EVM execution. It
is selected by the `generatesOnChain` flag in the two viewer pages.

### 2. Lazy, dynamic import of the EVM runtime

`@ethereumjs/evm` is a heavy bundle (~2.8 MB unpacked). It is imported with
`import()` inside the component module so it lands in the viewer route chunk
only. The module is created at component-load time, never eagerly at app
bootstrap. This keeps the EVM runtime out of the home, series, messages, and
selection page bundles — verified in task 7.6.

### 3. Bytecode cache module (`bytecodeCache.ts`)

A small, dependency-free module wraps `localStorage`:

- Key: `nft-bytecode:<lowercased-contract-address>`
- Value: the raw hex bytecode string (with `0x` prefix)
- Read: synchronous `getItem` — no network on cache hit
- Write: `setItem` after a successful `eth_getCode`
- Guard: all `localStorage`/`window` access is wrapped so the module imports
  safely during SSR and `next build`

### 4. Bytecode source is `eth_getCode`, not the config

The config's `generationContractBytecode` field is **not used at runtime**.
Bytecode is fetched at runtime because:

- the bytecode is on-chain and immutable,
- shipping it in the bundle would defeat the lazy-loading requirement,
- and `eth_getCode` is the canonical, always-correct source.

The `folds` bytecode that was temporarily inline in `collectionsData` has been
moved to `src/constants/exampleBytecodes.ts` as a **template only**. That file
is never imported by the app — it exists so the remaining bytecodes can be
pasted in the same format when they are collected. It must stay out of the
build graph.

### 5. Fallback path reuses `TokenViewer`

On EVM failure (empty `returnValue`, `exceptionError`, or a fetch that cannot
be cached), the component renders `<TokenViewer>` for the same collection and
token. This reuses the existing retry/`Loading…` UX rather than inventing new
error states, and — per Q-A — reuses the exact same RPC `tokenURI` flow
(`PUBLIC_CLIENT.readContract` with `ERC721_ABI`) that `TokenViewer` already
implements.

### 6. ABI encoding via viem

`parseAbi`, `encodeFunctionData`, and `decodeFunctionResult` come from `viem`,
already present. The single-function ABI used is the same `ERC721_ABI`
already defined in `src/utils/data.ts`.

### 7. Test suite

A Vitest suite under `src/components/viewer/__tests__/` covers the pure
logic that is cheap to test and critical to get right: cache key derivation,
cache hit/miss behaviour, `eth_getCode` being called exactly once per
uncached collection, and EVM success/failure decoding. The EVM runtime itself
is not exercised in CI (it requires a real bytecode sample and a browser
context); those paths are verified manually in task 7.2–7.4.

## Risks / Trade-offs

- **[Correctness — pure-function assumption]** The EVM is run with `to: 0x0`,
  `caller: 0x0`, no storage, no value. `tokenURI` will only compute correctly
  if it is a pure function of `tokenId`. Any collection whose `tokenURI` reads
  storage (baseURI, ownerOf, a delegate) will return garbage. Mitigation:
  per-collection verification, and the fallback to `TokenViewer` on any
  execution error.
- **[Generative delegation]** The field is named `generationContractBytecode`,
  implying generation may live in a *separate* contract. If a collection's
  ERC-721 bytecode does not itself produce the image, local execution yields
  nothing useful. Mitigation: the `generatesOnChain` flag must be set only
  after confirming the contract at `collectionsData[x].contract` is the
  generator.
- **[WASM / CSP]** Resolved: `@ethereumjs/evm` v10 has **no WASM dependencies**
  (it uses `@noble/curves` / `@noble/hashes`). No `wasm-src` directive and no
  `'unsafe-eval'` probe is needed. The production CSP in `next.config.mjs` is
  unchanged.
- **[Bundle size]** EVM + viem + common + util is roughly 5 MB unpacked. It
  lands only in the viewer route chunk via dynamic import. Acceptable for a
  viewer-only path; verified in task 7.6 that the home page bundle is clean.
- **[Infinite retry]** `TokenViewer` silently retries forever on error. If the
  EVM run throws inside the fallback path, the same silent loop applies.
  Mitigation: the fallback is a hard switch to `TokenViewer`, which keeps its
  existing behavior; no new retry logic is introduced.
- **[Static export]** `next build` with `output: 'export'` must not break.
  The EVM code is client-only and dynamically imported, so the static renderer
  never touches it. The viewer pages render `OnChainBytecodeViewer` (a client
  component) inside `<Suspense>`, exactly as they already do with `TokenViewer`.

## Migration Plan

1. Add `generatesOnChain` to `collectionsData` for all 10 collections.
   **Done** — `true` for `folds`, `frames`, `city`, `blinds`,
   `cocktail-straws`, `window`, `crosswalk`, `lanes`; `false` for `selection`
   and `attentionless`.
2. Add `@ethereumjs/evm` to `package.json`.
3. Create `bytecodeCache.ts` and `evmRunner.ts` utilities.
4. Create `OnChainBytecodeViewer.tsx`.
5. Select the viewer by flag in both viewer pages.
6. **No CSP changes required** — see the WASM risk above.
7. Move the `folds` example bytecode out of `collectionsData` into
   `src/constants/exampleBytecodes.ts` (template only, never imported).
8. Add the Vitest suite in `src/components/viewer/__tests__/`.
9. Build and verify: cache hit path issues no network request; non-generative
   collections still use `TokenViewer`; home page bundle contains no EVM.

## Open Questions

- **Q-A: RESOLVED.** The existing RPC proxy supports `eth_getCode` (it is the
  same transport viem uses for `readContract`). The new component reuses the
  existing `tokenURI` flow via `TokenViewer` as the fallback — no new data
  path is invented.
- **Q-B: RESOLVED.** `@ethereumjs/evm` v10 is pure JS; no `'unsafe-eval'` or
  `wasm-src` is needed. The production CSP is unchanged.
- **Q-C: RESOLVED.** All collections are on Ethereum mainnet, so a bare
  lowercased address is an unambiguous cache key. Revisit if a non-mainnet
  collection is added.
- **Q-D (new):** Does the `folds` bytecode, when executed locally, actually
  reproduce the on-chain `tokenURI`? The `folds` contract reads no storage in
  its disassembly, so the pure-function assumption holds for it. Each
  remaining collection must be verified the same way before its
  `generatesOnChain` flag is trusted — the flag is a claim, not a guarantee.