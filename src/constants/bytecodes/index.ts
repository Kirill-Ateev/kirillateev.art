// src/constants/bytecodes/index.ts
//
// Maps a contract address to its bytecode, loaded lazily by dynamic import so
// only the bytecode for the collection the user actually opens is ever fetched
// from the bundle. Importing this module does NOT load any bytecode; each
// entry is resolved with import() on demand.
//
// To add a collection's bytecode, fetch it once with
//   PUBLIC_CLIENT.getBytecode({ address, abi: ERC721_ABI })
// paste the hex string into src/constants/bytecodes/<collection>.ts and add
// one registerBytecode() line below. The bytecode stays out of every page
// bundle except the viewer route that needs it.

type BytecodeModule = { default: string };

const bytecodes: Record<string, () => Promise<BytecodeModule>> = {};

export function registerBytecode(
  contractAddress: string,
  loader: () => Promise<BytecodeModule>,
): void {
  bytecodes[contractAddress.toLowerCase()] = loader;
}

export async function getBytecode(contractAddress: string): Promise<string | null> {
  const loader = bytecodes[contractAddress.toLowerCase()];
  if (!loader) return null;
  const mod = await loader();
  return mod.default || null;
}

registerBytecode('0x1332cba03717a9ae8346fa034a9e0bffb0cfba91', () => import('./folds'));
registerBytecode('0x99014b9511494088e0ba380fd2aaaeeda8bc5f95', () => import('./frames'));
registerBytecode('0x7cdb18d151b672f5532f97ba33feab2cc05cddcb', () => import('./city'));
registerBytecode('0x15802dcc0de04ad51d671b41ecb41ed519bc4ee2', () => import('./blinds'));
registerBytecode('0x871b5048d20505d5e2acc3f9487c674441d297d4', () => import('./cocktail-straws'));
registerBytecode('0x4aa41c7c9ecf9cde5aa1cc215aae5d9bb91d0952', () => import('./window'));
registerBytecode('0x1a8deb6deb554cf80d8202c169d31538d449c99b', () => import('./crosswalk'));
registerBytecode('0x580731911b8d5df910b7ed9b776f1b2e70de6752', () => import('./lanes'));