'use client';
import { getRandomFromRange, isNumeric } from '@/utils/numbers';
import { ethers } from 'ethers';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import collectionStyles from './../collections/styles.module.css';
import styles from './styles.module.css';

type CollectionMetadata = {
  name: string;
  marketplaces: {
    [service: string]: { name: string; link: string; tokenLink: string };
  };
  contract: string;
  minIndex: number;
  maxIndex: number;
  padded: boolean;
};

type NFTMetadata = {
  image: string;
  name?: string;
  description?: string;
};

const ERC721_ABI = [
  'function tokenURI(uint256 tokenId) external view returns (string memory)',
];

// https://ethereum.publicnode.com
// const RPC_PROVIDER = new ethers.WebSocketProvider(
//   'wss://eth-mainnet.g.alchemy.com/v2/gHHmSHb98l1e1Eo3VhnIR'
// );
const RPC_PROVIDER = new ethers.JsonRpcProvider(
  'https://vercel-view.vercel.app/api/view'
);

export const ERC721Viewer: React.FC<{
  collectionMetadata: CollectionMetadata;
}> = ({ collectionMetadata }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentIndex, setCurrentIndex] = useState<number>(
    isNumeric(searchParams.get('item'))
      ? Number(searchParams.get('item'))
      : collectionMetadata.minIndex
  );
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Функция для получения метаданных
  const fetchNFTMetadata = useCallback(
    async (tokenId: number) => {
      if (!ethers.isAddress(collectionMetadata.contract)) {
        setError('Invalid contract address');
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const contract = new ethers.Contract(
          collectionMetadata.contract,
          ERC721_ABI,
          RPC_PROVIDER
        );
        const tokenURI = await contract.tokenURI(tokenId);

        let resolvedUri = tokenURI;

        // Обработка IPFS URI
        if (tokenURI.startsWith('ipfs://')) {
          resolvedUri = `https://ipfs.io/ipfs/${tokenURI.split('ipfs://')[1]}`;
        }

        // Обработка данных в формате base64
        if (tokenURI.startsWith('data:application/json;base64,')) {
          const base64 = tokenURI.split(',')[1];
          const rawData = atob(base64);
          const metadata = JSON.parse(rawData);
          setMetadata(metadata);
          return;
        }

        const response = await fetch(resolvedUri);
        if (!response.ok) throw new Error('Failed to fetch metadata');

        const metadata: NFTMetadata = await response.json();
        setMetadata(metadata);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        setMetadata(null);
      } finally {
        setIsLoading(false);
      }
    },
    [collectionMetadata.contract]
  );

  // Обработчик клика для смены токена
  const handleClick = useCallback(() => {
    // Генерируем случайный индекс между minIndex и maxIndex включительно
    const randomIndex = getRandomFromRange(
      collectionMetadata.minIndex,
      collectionMetadata.maxIndex
    );
    router.push(
      pathname + '?' + createQueryString('item', randomIndex.toString())
    );
    setCurrentIndex(randomIndex);
  }, [collectionMetadata.minIndex, collectionMetadata.maxIndex]);

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  // Загрузка метаданных при изменении индекса
  useEffect(() => {
    fetchNFTMetadata(currentIndex);
  }, [currentIndex, fetchNFTMetadata]);

  return (
    <div
      className={styles.viewer_container}
      style={{
        cursor: isLoading ? 'wait' : 'pointer',
      }}
    >
      {error && (
        <div className={styles.viewer_error} onClick={handleClick}>
          Error: {error}
        </div>
      )}
      {isLoading && <div>Loading...</div>}

      {metadata && !isLoading && (
        <>
          <div
            className={
              collectionMetadata.padded
                ? styles.viewer_title
                : styles.viewer_title_padded
            }
          >
            <div>
              {collectionMetadata.name} №{currentIndex}
            </div>
            {Object.values(collectionMetadata.marketplaces).map((place) => {
              return (
                <Link
                  key={place.link}
                  className={`${collectionStyles.link} ${collectionStyles.text_secondary}`}
                  target="_blank"
                  rel="noreferrer"
                  href={`${place.tokenLink}${currentIndex}`}
                >
                  {place.name}
                </Link>
              );
            })}
          </div>
          <Image
            src={metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
            alt={`${metadata.name} ${currentIndex}` || `NFT #${currentIndex}`}
            width={100}
            height={100}
            style={{
              minWidth: '100%',
              height: 'fit-content',
              maxWidth: '100%',
              maxHeight: collectionMetadata.padded
                ? 'calc(100% - 21.5px)'
                : 'calc(100% - 37.5px)',
              padding: collectionMetadata.padded ? '0px' : '0px 30px 30px 30px',
              objectFit: 'contain',
            }}
            onClick={handleClick}
          />
        </>
      )}
    </div>
  );
};
