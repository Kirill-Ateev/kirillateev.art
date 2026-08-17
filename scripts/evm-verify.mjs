import { readFileSync } from 'node:fs';
import { createPublicClient, http, parseAbi, encodeFunctionData, decodeFunctionResult } from 'viem';
import { createEVM } from '@ethereumjs/evm';
import { Common, Hardfork, Mainnet } from '@ethereumjs/common';
import { hexToBytes } from '@ethereumjs/util';

// folds bytecode, mirrored from src/constants/exampleBytecodes.ts
const FOLDS = '0x1332cba03717a9ae8346fa034a9e0bffb0cfba91';
const bytecode = readFileSync('/tmp/folds-bytecode.txt', 'utf8').trim();

const client = createPublicClient({
  transport: http('https://eth.llamarpc.com'),
});
const abi = parseAbi(['function tokenURI(uint256 tokenId) external view returns (string memory)']);

const tokenId = 1;
const onChain = await client.readContract({
  address: FOLDS,
  abi,
  functionName: 'tokenURI',
  args: [BigInt(tokenId)],
});

const evm = await createEVM({ common: new Common({ chain: Mainnet, hardfork: Hardfork.Shanghai }) });
const data = hexToBytes(encodeFunctionData({ abi, functionName: 'tokenURI', args: [tokenId] }));
const res = await evm.runCode({ code: hexToBytes('0x' + bytecode), data, gasLimit: 10_000_000n });

console.log('on-chain tokenURI:', JSON.stringify(onChain));
console.log('exceptionError:', res.exceptionError?.error ?? 'none');
console.log('returnValue bytes:', res.returnValue.length);
const local = decodeFunctionResult({ abi, functionName: 'tokenURI', data: res.returnValue });
console.log('local tokenURI  :', JSON.stringify(local));
console.log('MATCH:', onChain === local);