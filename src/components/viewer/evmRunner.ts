import type { Abi, Hex } from 'viem';
import { decodeFunctionResult, encodeFunctionData, parseAbi } from 'viem';
import { Common, Hardfork, Mainnet } from '@ethereumjs/common';
import { createEVM } from '@ethereumjs/evm';
import { hexToBytes } from '@ethereumjs/util';

const ERC721_TOKEN_URI_ABI = parseAbi([
  'function tokenURI(uint256 tokenId) external view returns (string memory)',
]) as Abi;

const FUNCTION_NAME = 'tokenURI' as const;
const GAS_LIMIT = BigInt(10_000_000);

export type RunTokenURIResult =
  | { ok: true; tokenURI: string }
  | { ok: false; reason: string };

export async function runTokenURI(
  bytecode: string,
  tokenId: number,
): Promise<RunTokenURIResult> {
  if (!bytecode || !bytecode.startsWith('0x')) {
    return { ok: false, reason: 'bytecode is empty or not 0x-prefixed' };
  }

  const evm = await createEVM({
    common: new Common({ chain: Mainnet, hardfork: Hardfork.Shanghai }),
  });

  const data = hexToBytes(
    encodeFunctionData({
      abi: ERC721_TOKEN_URI_ABI,
      functionName: FUNCTION_NAME,
      args: [tokenId],
    }) as Hex,
  );

  const result = await evm.runCode({
    code: hexToBytes(bytecode as Hex),
    data,
    gasLimit: GAS_LIMIT,
  });

  if (result.exceptionError) {
    return { ok: false, reason: result.exceptionError.error };
  }

  if (result.returnValue.length === 0) {
    return { ok: false, reason: 'empty returnValue' };
  }

  try {
    const hex = `0x${Buffer.from(result.returnValue).toString('hex')}` as Hex;
    const tokenURI = decodeFunctionResult({
      abi: ERC721_TOKEN_URI_ABI,
      functionName: FUNCTION_NAME,
      data: hex,
    });

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