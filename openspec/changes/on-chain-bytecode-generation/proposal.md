## Why

Every collection page currently fetches NFT metadata by calling `tokenURI(tokenId)` **remotely** against an Ethereum RPC proxy (`vercel-rpc-view.vercel.app`). For the generative collections this is an unnecessary network round-trip: the artwork is produced by the contract's own code, and that code is immutable and on-chain. The site can instead fetch the contract bytecode **once, lazily, only when a token is actually opened**, execute it locally in the browser via an EVM, and derive `tokenURI` from the contract itself — with the bytecode cached in `localStorage` keyed by contract address so every subsequent open of the same collection is instant and offline-capable.

## What Changes

- **New client component `OnChainBytecodeViewer`** that replaces `TokenViewer` for generative collections. It does not modify `TokenViewer` (used as the fallback for non-generative collections).
- **Lazy, per-collection bytecode loading**: bytecode is fetched individually for the *open* collection only — never batched, never preloaded. A small module (`bytecodeCache`) wraps `localStorage` with the contract address as the key.
- **`generatesOnChain: boolean` flag** added to `CollectionData` in `src/constants/collections.ts`. Collections where the contract itself generates the work are `true`; `attentionless` and `selection` are `false` and keep the existing RPC path.
- **`@ethereumjs/evm`** added as a dependency for client-side EVM execution.
- **CSP / headers** adjusted for the EVM's WASM runtime.

## Capabilities

### New Capabilities

- `bytecode-generation`: Client-side EVM bytecode execution of `tokenURI`, with a `localStorage`-backed per-contract bytecode cache and lazy single-contract fetching.

### Modified Capabilities

- `collections`: `CollectionData` gains a required `generatesOnChain` boolean flag that selects the viewer implementation; the Collection Viewer Page requirement now renders `OnChainBytecodeViewer` when the flag is `true` and `TokenViewer` when `false`.

## Impact

- `src/constants/collections.ts` — new `generatesOnChain` field on every collection.
- `src/components/viewer/` — new `OnChainBytecodeViewer.tsx`, `bytecodeCache.ts`, `evmRunner.ts`.
- `src/app/[lang]/view/[collection]/page.tsx` and `src/app/[lang]/view/[collection]/[tokenId]/page.tsx` — select viewer by `generatesOnChain`.
- `package.json` — new `@ethereumjs/evm` dependency.
- `next.config.mjs` — `wasm-src` / `unsafe-eval` CSP additions for the EVM runtime.
- `public/` — per-collection bytecode is *not* bundled; it is fetched at runtime (and cached).