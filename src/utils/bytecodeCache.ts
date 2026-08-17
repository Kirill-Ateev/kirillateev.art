// src/components/viewer/bytecodeCache.ts
//
// localStorage-backed cache for contract bytecode, keyed by contract address.
//
// The cache has no expiry: bytecode of an immutable generative contract never
// changes, so "forever until cleared" is the correct policy.
//
// All access to `window`/`localStorage` is guarded so this module can be
// imported safely during SSR and `next build`, where those globals do not
// exist. In those environments every function returns null / is a no-op.

const PREFIX = 'nft-bytecode:';

/** Cache key for a contract address. Lowercased so the same address written
 *  by `eth_getCode` (checksummed) and stored by the config (lowercase) both
 *  map to one entry. */
export function cacheKey(contract: string): string {
  return `${PREFIX}${contract.toLowerCase()}`;
}

function storage(): Storage | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage;
  } catch {
    // Some browsers throw when localStorage is unavailable (private mode,
    // quota exceeded). Treat as no cache rather than crashing the viewer.
    return null;
  }
}

/** Returns the cached bytecode for `contract`, or null on a miss. */
export function getCachedBytecode(contract: string): string | null {
  const s = storage();
  if (!s) return null;
  try {
    return s.getItem(cacheKey(contract));
  } catch {
    return null;
  }
}

/** Writes the bytecode for `contract` to the cache. No-op when unavailable. */
export function setCachedBytecode(contract: string, bytecode: string): void {
  const s = storage();
  if (!s) return;
  try {
    s.setItem(cacheKey(contract), bytecode);
  } catch {
    // Quota exceeded or storage disabled — the next visit will just refetch.
  }
}

/** Removes the cached bytecode for `contract`. Useful for testing. */
export function clearCachedBytecode(contract: string): void {
  const s = storage();
  if (!s) return;
  try {
    s.removeItem(cacheKey(contract));
  } catch {
    // ignore
  }
}