// src/constants/bytecodes/index.ts
//
// Maps a collection key to its contract bytecode, loaded lazily by dynamic
// import so only the bytecode for the collection the user actually opens is
// ever fetched from the bundle. Importing this module does NOT load any
// bytecode; each entry is resolved with import() on demand.
//
// To add a collection's bytecode, fetch it once with
//   PUBLIC_CLIENT.getBytecode({ address, abi: ERC721_ABI })
// paste the hex string into src/constants/bytecodes/<collection>.ts under the
// matching key, and add one line below. The bytecode stays out of every page
// bundle except the viewer route that needs it.

import type { collectionsData } from '@/constants/collections';

type BytecodeModule = { default: string };

const bytecodes: Record<
  keyof typeof collectionsData,
  () => Promise<BytecodeModule>
> = {};

export function registerBytecode(
  collection: keyof typeof collectionsData,
  loader: () => Promise<BytecodeModule>,
): void {
  bytecodes[collection] = loader;
}

export async function getBytecode(
  collection: keyof typeof collectionsData,
): Promise<string | null> {
  const loader = bytecodes[collection];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}

registerBytecode('folds', () => import('./folds'));
registerBytecode('frames', () => import('./frames'));
registerBytecode('city', () => import('./city'));
registerBytecode('blinds', () => import('./blinds'));
registerBytecode('cocktail-straws', () => import('./coctail-straws'));
registerBytecode('window', () => import('./window'));
registerBytecode('crosswalk', () => import('./crosswalk'));
registerBytecode('lanes', () => import('./lanes'));
