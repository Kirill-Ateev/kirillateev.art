## 1. Configuration & dependencies

- [x] 1.1 Add `generatesOnChain: boolean` to the `CollectionData` type in `src/constants/collections.ts`
- [x] 1.2 Set `generatesOnChain: true` for: `folds`, `frames`, `city`, `blinds`, `cocktail-straws`, `window`, `crosswalk`, `lanes`
- [x] 1.3 Set `generatesOnChain: false` for: `selection`, `attentionless`
- [ ] 1.4 Add `@ethereumjs/evm@8.3.1` (v10 line) to `package.json` dependencies and run `yarn install`
- [ ] 1.5 Add `vitest` + `@testing-library/react` + `jsdom` to devDependencies and add a `test` script

## 2. Bytecode example template

- [x] 2.1 Move the `folds` bytecode out of `collectionsData` (it was inline and would have been bundled)
- [x] 2.2 Create `src/constants/exampleBytecodes.ts` as a template-only file, never imported by the app
- [ ] 2.3 Add a lint/build guard so `exampleBytecodes.ts` cannot be accidentally imported (document in the file header)

## 3. Bytecode cache

- [ ] 3.1 Create `src/components/viewer/bytecodeCache.ts` with a `localStorage`-backed cache
- [ ] 3.2 Key format: `nft-bytecode:<lowercased-contract-address>`
- [ ] 3.3 Implement `getCachedBytecode(address)` returning `string | null` (sync, SSR-safe)
- [ ] 3.4 Implement `setCachedBytecode(address, bytecode: string)` (SSR-safe)
- [ ] 3.5 Ensure all `window`/`localStorage` access is guarded so the module imports safely during SSR and static build

## 4. EVM execution helper

- [ ] 4.1 Create `src/components/viewer/evmRunner.ts` exporting `runTokenURI(bytecode, tokenId)`
- [ ] 4.2 Use `parseAbi(['function tokenURI(uint256) external view returns (string)'])` from viem
- [ ] 4.3 `createEVM({ common: new Common({ chain: Mainnet, hardfork: Hardfork.Shanghai }) })` via dynamic import
- [ ] 4.4 Call `evm.runCode({ code: hexToBytes(bytecode), data: hexToBytes(encodeFunctionData(...)), gasLimit: 10_000_000n })`
- [ ] 4.5 On `execResult.exceptionError` set or empty `returnValue`, throw
- [ ] 4.6 Decode `returnValue` with `decodeFunctionResult('tokenURI', ...)` and return the string

## 5. On-chain viewer component

- [ ] 5.1 Create `src/components/viewer/OnChainBytecodeViewer.tsx` as a `'use client'` component
- [ ] 5.2 Props: `collectionMetadata`, `tokenId`, plus optional `baseRoute`, `showTitle` mirroring `TokenViewer`
- [ ] 5.3 On mount, read `bytecodeCache.getCachedBytecode(contract)`; if null, call `eth_getCode` via `PUBLIC_CLIENT.getBytecode`, then `setCachedBytecode`
- [ ] 5.4 Run `runTokenURI` to obtain the `tokenURI` string
- [ ] 5.5 Resolve `ipfs://` → `https://ipfs.io/ipfs/...`, decode `data:application/json;base64,...`, otherwise `fetch` the metadata
- [ ] 5.6 Reuse the same UI chrome as `TokenViewer` (title, marketplace links, padding modes, "(click for next)")
- [ ] 5.7 On any EVM/cache failure, render `<TokenViewer>` for the same collection and token as the fallback — this reuses the existing RPC `tokenURI` flow, per Q-A

## 6. Viewer selection

- [ ] 6.1 In `src/app/[lang]/view/[collection]/page.tsx`, render `<OnChainBytecodeViewer>` when `collectionMetadata.generatesOnChain` is true, else `<TokenViewer>`
- [ ] 6.2 In `src/app/[lang]/view/[collection]/[tokenId]/page.tsx`, apply the same selection
- [ ] 6.3 Wrap the viewer in `<Suspense>` exactly as before

## 7. Headers & CSP

- [x] 7.1 No CSP changes required — `@ethereumjs/evm` v10 has no WASM dependencies (uses `@noble/curves` / `@noble/hashes`); Q-B resolved

## 8. Tests

- [ ] 8.1 Add Vitest config (`vitest.config.ts`) with jsdom environment
- [ ] 8.2 Test `bytecodeCache`: cache key derivation from a mixed-case address, hit returns value, miss returns null, write then read round-trips
- [ ] 8.3 Test `OnChainBytecodeViewer` with mocked `PUBLIC_CLIENT`: uncached collection triggers exactly one `eth_getCode` call; cached collection triggers zero calls
- [ ] 8.4 Test fallback: when `runTokenURI` throws, the component renders `TokenViewer` instead
- [ ] 8.5 Test flag selection: `generatesOnChain: false` renders `TokenViewer` and never loads the EVM
- [ ] 8.6 Run `yarn test` in CI as part of the deploy pipeline

## 9. Verification

- [ ] 9.1 `yarn build` succeeds with `output: 'export'`
- [ ] 9.2 Open a generative collection (e.g. `/en/view/folds`): first load issues exactly one `eth_getCode` request and caches the bytecode
- [ ] 9.3 Reload the same collection: no `eth_getCode` request; bytecode is served from `localStorage`
- [ ] 9.4 Open a different generative collection: only that collection's bytecode is fetched
- [ ] 9.5 Open `/en/view/attentionless`: renders `TokenViewer`, no EVM runtime loaded
- [ ] 9.6 Open `/en/` (home): EVM runtime is not present in the page bundle
- [ ] 9.7 `yarn lint` passes
- [ ] 9.8 Confirm `TokenViewer.tsx` is byte-for-byte unchanged from the pre-change state