// 'use client';
// import { getRandomFromRange, isNumeric } from '@/utils/numbers';
// import Image from 'next/image';
// import Link from 'next/link';
// import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import React, { useCallback, useEffect, useState } from 'react';
// import collectionStyles from './../collections/styles.module.css';
// import styles from './styles.module.css';

// type CollectionMetadata = {
//   name: string;
//   generationContractBytecode: string;
//   marketplaces: {
//     [service: string]: { name: string; link: string; tokenLink: string };
//   };
//   contract: string;
//   minIndex: number;
//   maxIndex: number;
//   padded: boolean;
// };

// type NFTMetadata = {
//   image: string;
//   name?: string;
//   description?: string;
// };

// export const ERC721_ABI = [
//   'function tokenURI(uint256 tokenId) external view returns (string memory)',
// ];

// // Локальное выполнение pure функции
// // const executePureFunction = async (
// //   bytecode: string,
// //   functionName: string,
// //   params: any[] = []
// // ) => {
// //   try {
// //     // Инициализация Common с актуальным хардфорком
// //     const common = new Common({ chain: Mainnet, hardfork: Hardfork.Shanghai });

// //     // Создание экземпляра EVM
// //     const evm = await createEVM({ common });

// //     // Создание интерфейса для кодирования данных вызова
// //     const iface = new Interface(ERC721_ABI);
// //     const data = iface.encodeFunctionData(functionName, params);

// //     // Выполнение call в EVM
// //     const result = await evm.runCall({
// //       to: Address.zero(), // Для выполнения кода без деплоя
// //       caller: Address.zero(), // Нулевой адрес вызывающего
// //       origin: Address.zero(), // Нулевой адрес происхождения
// //       data: Buffer.from(data.slice(2), 'hex'), // Данные вызова
// //       code: Buffer.from(bytecode.slice(2), 'hex'), // Байткод контракта
// //       gasLimit: BigInt(10_000_000), // Достаточный лимит газа для вычислений
// //     });

// //     // Декодирование результата
// //     if (result.execResult.returnValue.length === 0) {
// //       throw new Error('Empty return value from contract');
// //     }

// //     const returnData =
// //       '0x' + Buffer.from(result.execResult.returnValue).toString('hex');
// //     return iface.decodeFunctionResult(functionName, returnData)[0];
// //   } catch (error) {
// //     console.error('Error executing pure function:', error);
// //     throw error;
// //   }
// // };

// export const ERC721StandaloneViewer: React.FC<{
//   collectionMetadata: CollectionMetadata;
// }> = ({ collectionMetadata }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const [currentIndex, setCurrentIndex] = useState<number>(
//     isNumeric(searchParams.get('item'))
//       ? Number(searchParams.get('item'))
//       : collectionMetadata.minIndex
//   );
//   const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   // Функция для получения метаданных
//   const fetchNFTMetadata = useCallback(
//     async (tokenId: number) => {
//       try {
//         const tokenURI = await executePureFunction(
//           collectionMetadata.generationContractBytecode,
//           'tokenURI',
//           [tokenId]
//         );

//         let resolvedUri = tokenURI;

//         // Обработка IPFS URI
//         if (tokenURI.startsWith('ipfs://')) {
//           resolvedUri = `https://ipfs.io/ipfs/${tokenURI.split('ipfs://')[1]}`;
//         }

//         // Обработка данных в формате base64
//         if (tokenURI.startsWith('data:application/json;base64,')) {
//           const base64 = tokenURI.split(',')[1];
//           const rawData = atob(base64);
//           const metadata = JSON.parse(rawData);
//           setMetadata(metadata);
//           return;
//         }

//         const response = await fetch(resolvedUri);
//         if (!response.ok) throw new Error('Failed to fetch metadata');

//         const metadata: NFTMetadata = await response.json();
//         setMetadata(metadata);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Unknown error occurred');
//         setMetadata(null);
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [collectionMetadata.contract]
//   );

//   // Обработчик клика для смены токена
//   const handleClick = useCallback(() => {
//     // Генерируем случайный индекс между minIndex и maxIndex включительно
//     const randomIndex = getRandomFromRange(
//       collectionMetadata.minIndex,
//       collectionMetadata.maxIndex
//     );
//     router.push(
//       pathname + '?' + createQueryString('item', randomIndex.toString())
//     );
//     setCurrentIndex(randomIndex);
//   }, [collectionMetadata.minIndex, collectionMetadata.maxIndex]);

//   // Get a new searchParams string by merging the current
//   // searchParams with a provided key/value pair
//   const createQueryString = useCallback(
//     (name: string, value: string) => {
//       const params = new URLSearchParams(searchParams.toString());
//       params.set(name, value);

//       return params.toString();
//     },
//     [searchParams]
//   );

//   // Загрузка метаданных при изменении индекса
//   useEffect(() => {
//     fetchNFTMetadata(currentIndex);
//   }, [currentIndex, fetchNFTMetadata]);

//   return (
//     <div
//       className={styles.viewer_container}
//       style={{
//         cursor: isLoading ? 'wait' : 'pointer',
//       }}
//     >
//       {error && (
//         <div className={styles.viewer_error} onClick={handleClick}>
//           Error: {error}
//         </div>
//       )}
//       {isLoading && <div>Loading...</div>}

//       {metadata && !isLoading && (
//         <>
//           <div
//             className={
//               collectionMetadata.padded
//                 ? styles.viewer_title
//                 : styles.viewer_title_padded
//             }
//           >
//             <div>
//               {collectionMetadata.name} #{currentIndex}
//             </div>
//             {Object.values(collectionMetadata.marketplaces).map((place) => {
//               return (
//                 <Link
//                   key={place.link}
//                   className={`${collectionStyles.link} ${collectionStyles.text_secondary}`}
//                   target="_blank"
//                   rel="noreferrer"
//                   href={`${place.tokenLink}${currentIndex}`}
//                 >
//                   {place.name}
//                 </Link>
//               );
//             })}
//           </div>
//           <Image
//             src={metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
//             alt={`${metadata.name} ${currentIndex}` || `NFT #${currentIndex}`}
//             width={100}
//             height={100}
//             style={{
//               minWidth: '100%',
//               height: 'fit-content',
//               maxWidth: '100%',
//               maxHeight: collectionMetadata.padded
//                 ? 'calc(100% - 21.5px)'
//                 : 'calc(100% - 37.5px)',
//               objectFit: 'contain',
//             }}
//             onClick={handleClick}
//           />
//         </>
//       )}
//     </div>
//   );
// };
