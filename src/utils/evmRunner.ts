// src/components/viewer/evmRunner.ts
//
// Executes a contract's bytecode locally in the browser EVM and decodes the
// returned `tokenURI` string. No server-side involvement: the EVM runs entirely
// on the client.
//
// The EVM runtime is imported dynamically so it never lands in a page bundle
// that does not need it (home, series, messages, selection).

import { Common, Hardfork, Mainnet } from '@ethereumjs/common';
import { createEVM } from '@ethereumjs/evm';
import { hexToBytes } from '@ethereumjs/util';
import type { Abi } from 'viem';
import { decodeFunctionResult, encodeFunctionData, parseAbi } from 'viem';

const ERC721_TOKEN_URI_ABI = parseAbi([
  'function tokenURI(uint256 tokenId) external view returns (string memory)',
]) as Abi;

const FUNCTION_NAME = 'tokenURI' as const;

const GAS_LIMIT = 10000000;

export type RunTokenURIResult =
  | { ok: true; tokenURI: string }
  | { ok: false; reason: string };

/** Runs `tokenURI(tokenId)` against the given contract bytecode in a fresh EVM.
 *  Throws on failure so the caller can fall back to the remote flow. */
export async function runTokenURI(
  bytecode: `0x${string}`,
  tokenId: number,
): Promise<RunTokenURIResult> {
  const evm = await createEVM({
    common: new Common({ chain: Mainnet, hardfork: Hardfork.Shanghai }),
  });

  const data = hexToBytes(
    encodeFunctionData({
      abi: ERC721_TOKEN_URI_ABI,
      functionName: FUNCTION_NAME,
      args: [tokenId],
    }),
  );

  const result = await evm.runCode({
    code: hexToBytes(bytecode),
    data,
    gasLimit: BigInt(GAS_LIMIT),
  });

  if (result.exceptionError) {
    return { ok: false, reason: result.exceptionError.error };
  }

  if (result.returnValue.length === 0) {
    return { ok: false, reason: 'empty returnValue' };
  }

  try {
    const tokenURI = decodeFunctionResult({
      abi: ERC721_TOKEN_URI_ABI,
      functionName: FUNCTION_NAME,
      data: result.returnValue,
    }) as string;

    if (typeof tokenURI !== 'string' || tokenURI.length === 0) {
      return { ok: false, reason: 'decoded tokenURI was empty' };
    }

    return { ok: true, tokenURI };
  } catch (err) {
    return {
      ok: false,
      reason: err instanceof Error ? err.message : 'decode failed',
    };
  }
}
