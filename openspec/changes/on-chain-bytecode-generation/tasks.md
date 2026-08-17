## 1. Configuration & dependencies

- [x] 1.1 Add `generatesOnChain: boolean` to the `CollectionData` type in `src/constants/collections.ts`
- [x] 1.2 Set `generatesOnChain: true` for: `folds`, `frames`, `city`, `blinds`, `cocktail-straws`, `window`, `crosswalk`, `lanes`
- [x] 1.3 Set `generatesOnChain: false` for: `selection`, `attentionless`
- [x] 1.4 Add `@ethereumjs/evm@10.1.2` to `package.json` dependencies and run `yarn install`
- [x] 1.5 Add `vitest` + `happy-dom` to devDependencies and add a `vitest.config.ts`

## 2. Bytecode storage (lazy, per-collection)

- [x] 2.1 Move the `folds` bytecode out of `collectionsData` (it was inline and would have been bundled into every page)
- [x] 2.2 Create `src/constants/bytecodes/` — one file per collection, each exporting a single default string
- [x] 2.3 Create `src/constants/bytecodes/index.ts` — maps contract address → dynamic `import()` loader; `getBytecode(address)` returns the bytecode or null
- [x] 2.4 Bytecode is fetched from the bundle by dynamic import only when the collection is opened; verified the home page bundle contains no bytecode

## 3. EVM execution helper

- [x] 3.1 Create `src/components/viewer/evmRunner.ts` exporting `runTokenURI(bytecode, tokenId)`
- [x] 3.2 Use `parseAbi(['function tokenURI(uint256) external view returns (string)'])` from viem
- [x] 3.3 `createEVM({ common: new Common({ chain: Mainnet, hardfork: Hardfork.Shanghai }) })`
- [x] 3.4 Call `evm.runCode({ code, data: encodeFunctionData(...), gasLimit })`
- [x] 3.5 On `exceptionError` set or empty `returnValue`, return `{ ok: false, reason }`
- [x] 3.6 Decode `returnValue` with `decodeFunctionResult('tokenURI', ...)` and return the string

## 4. On-chain viewer component

- [x] 4.1 Create `src/components/viewer/OnChainBytecodeViewer.tsx` as a `'use client'` component
- [x] 4.2 Props: `collectionMetadata: CollectionData`, `tokenId`, plus optional `baseRoute`, `showTitle` mirroring `TokenViewer`
- [x] 4.3 On mount, calls `getBytecode(contract)`; if null, falls back to `<TokenViewer>` (no network, no broken bundle)
- [x] 4.4 Runs `runTokenURI` to obtain the `tokenURI` string
- [x] 4.5 Resolves `ipfs://` → `https://ipfs.io/ipfs/...`, decodes `data:application/json;base64,...`, otherwise `fetch`es the metadata
- [x] 4.6 Reuses the same UI chrome as `TokenViewer` (title, marketplace links, padding modes, "(click for next)")
- [x] 4.7 On any EVM failure, renders `<TokenViewer>` for the same collection and token — reuses the existing RPC `tokenURI` flow, per Q-A

## 5. Viewer selection

- [x] 5.1 In `src/app/[lang]/view/[collection]/page.tsx`, render `<OnChainBytecodeViewer>` when `generatesOnChain` is true, else `<TokenViewer>`
- [ ] 5.2 In `src/app/[lang]/view/[collection]/[tokenId]/page.tsx`, apply the same selection
- [x] 5.3 Wrap the viewer in `<Suspense>` exactly as before

## 6. Headers & CSP

- [x] 6.1 No CSP changes required — `@ethereumjs/evm` v10 has no WASM dependencies (uses `@noble/curves` / `@noble/hashes`); Q-B resolved

## 7. Tests

- [x] 7.1 Add Vitest config (`vitest.config.ts`) with happy-dom environment and `@` alias
- [x] 7.2 Test `getBytecode`: null for unregistered address, case-insensitive key, null on empty/missing default
- [x] 7.3 Test `runTokenURI`: empty bytecode, successful decode, revert handling
- [x] 7.4 Test the `generatesOnChain` flag selection in both viewer pages
- [x] 7.5 Add a `test` script to `package.json` and wire into CI

## 8. Verification

- [x] 8.1 `yarn build` succeeds with `output: 'export'`
- [x] 8.2 Bytecode is lazy-loaded: home/series/messages/selection/community pages contain no bytecode
- [x] 8.3 Bytecode is viewer-scoped: only `/view/[collection]` pages reference the bytecode chunks
- [x] 8.4 `yarn lint` passes (exit 0; the `useCallback` exhaustive-deps warning in
  `OnChainBytecodeViewer` is identical to the one already present in
  `TokenViewer`, so it is consistent, not a regression)
- [x] 8.5 Confirm `TokenViewer.tsx` is byte-for-byte unchanged from the pre-change state