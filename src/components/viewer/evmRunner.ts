import { CollectionData, DEFAULT_ADDRESS } from '@/constants/collections';
import { Common, Hardfork, Mainnet } from '@ethereumjs/common';
import { createEVM } from '@ethereumjs/evm';
import {
  bytesToHex,
  createAddressFromString,
  hexToBytes,
} from '@ethereumjs/util';
import type { Hex } from 'viem';
import {
  decodeFunctionResult,
  encodeAbiParameters,
  encodeFunctionData,
  parseAbi,
  parseAbiParameters,
} from 'viem';

const ABI = parseAbi([
  'function tokenURI(uint256 tokenId) public view returns (string memory)',
  'function mintBatch(address to, uint256 quantity) external',
]);

const GAS_LIMIT = BigInt(30_000_000_000);

export type RunTokenURIResult =
  | { ok: true; tokenURI: string }
  | { ok: false; reason: string };

export async function runTokenURI(
  creationBytecode: string,
  collectionMetadata: CollectionData,
  tokenId: number,
): Promise<RunTokenURIResult> {
  // 1. Проверяем, что это байткод деплоя (обычно он длиннее и содержит инпут конструктора в конце)
  if (!creationBytecode || !creationBytecode.startsWith('0x')) {
    return { ok: false, reason: 'bytecode is empty or not 0x-prefixed' };
  }

  if (!collectionMetadata.constructorParams) {
    return { ok: false, reason: 'constructor params must be specified' };
  }

  const common = new Common({ chain: Mainnet, hardfork: Hardfork.Cancun });
  const evm = await createEVM({ common });

  // Адрес, который будет деплоить контракт и станет его Owner-ом
  const ownerAddress = createAddressFromString(DEFAULT_ADDRESS);

  // 2. КОДИРУЕМ АРГУМЕНТЫ КОНСТРУКТОРА
  // Они должны строго соответствовать контракту:
  // constructor(string name_, string symbol_, string contractUri_, address initialOwner_, uint96 royaltyBasisPoints_)
  const encodedArgs = encodeAbiParameters(
    parseAbiParameters(collectionMetadata.constructorParams.abi),
    collectionMetadata.constructorParams.arguments,
  );

  // Склеиваем байткод деплоя и аргументы
  const deployData = (creationBytecode + encodedArgs.slice(2)) as Hex;

  // 3. ДЕПЛОИМ КОНТРАКТ В ЛОКАЛЬНУЮ EVM
  // В runCall, если не указать параметр `to`, EVM считает это созданием контракта
  const deployResult = await evm.runCall({
    caller: ownerAddress,
    data: hexToBytes(deployData),
    gasLimit: GAS_LIMIT,
  });

  if (deployResult.execResult.exceptionError) {
    return {
      ok: false,
      reason: `Deploy failed: ${deployResult.execResult.exceptionError.error}`,
    };
  }

  // Получаем адрес задеплоенного контракта
  const contractAddress = deployResult.createdAddress;
  if (!contractAddress) {
    return { ok: false, reason: 'Contract address was not created' };
  }

  // 4. ВЫЗЫВАЕМ mintBatch (минтим 10000 штук)
  const mintData = hexToBytes(
    encodeFunctionData({
      abi: ABI,
      functionName: 'mintBatch',
      args: [DEFAULT_ADDRESS, BigInt(collectionMetadata.maxIndex)],
    }) as Hex,
  );

  const mintResult = await evm.runCall({
    to: contractAddress,
    caller: ownerAddress, // Вызываем от имени овнера, чтобы пройти проверку onlyOwner
    data: mintData,
    gasLimit: GAS_LIMIT,
  });

  console.log(mintResult);

  if (mintResult.execResult.exceptionError) {
    const revertData = bytesToHex(mintResult.execResult.returnValue);
    return {
      ok: false,
      reason: `Mint failed: ${mintResult.execResult.exceptionError.error} (revert: ${revertData})`,
    };
  }

  // 5. ВЫЗЫВАЕМ tokenURI
  const tokenUriData = hexToBytes(
    encodeFunctionData({
      abi: ABI,
      functionName: 'tokenURI',
      args: [BigInt(tokenId)],
    }) as Hex,
  );

  const result = await evm.runCall({
    to: contractAddress,
    caller: ownerAddress,
    data: tokenUriData,
    gasLimit: GAS_LIMIT,
  });

  const execResult = result.execResult;

  if (execResult.exceptionError) {
    const revertData = bytesToHex(execResult.returnValue);
    return {
      ok: false,
      reason: `${execResult.exceptionError.error} (revert: ${revertData})`,
    };
  }

  if (execResult.returnValue.length === 0) {
    return { ok: false, reason: 'empty returnValue' };
  }

  // 6. ДЕКОДИРУЕМ РЕЗУЛЬТАТ
  try {
    const hex = bytesToHex(execResult.returnValue) as Hex;
    const tokenURI = decodeFunctionResult({
      abi: ABI,
      functionName: 'tokenURI',
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
