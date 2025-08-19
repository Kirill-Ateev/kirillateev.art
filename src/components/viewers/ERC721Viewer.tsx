'use client';
import { ethers } from 'ethers';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import collectionStyles from './../collections/styles.module.css';
import styles from './styles.module.css';

interface NFTViewerProps {
  name: string;
  marketplaces: {
    [service: string]: { name: string; link: string; tokenLink: string };
  };
  contractAddress: string;
  minIndex: number;
  maxIndex: number;
}

interface NFTMetadata {
  image: string;
  name?: string;
  description?: string;
}

const ERC721_ABI = [
  'function tokenURI(uint256 tokenId) external view returns (string memory)',
];

const RPC_PROVIDER = new ethers.JsonRpcProvider(
  'https://ethereum.publicnode.com'
);

export const ERC721Viewer: React.FC<NFTViewerProps> = ({
  name,
  marketplaces,
  contractAddress,
  minIndex,
  maxIndex,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(minIndex);
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Функция для получения метаданных
  const fetchNFTMetadata = useCallback(
    async (tokenId: number) => {
      if (!ethers.isAddress(contractAddress)) {
        setError('Invalid contract address');
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const contract = new ethers.Contract(
          contractAddress,
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
    [contractAddress]
  );

  // Обработчик клика для смены токена
  const handleClick = useCallback(() => {
    // Генерируем случайный индекс между minIndex и maxIndex включительно
    const randomIndex =
      Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;
    setCurrentIndex(randomIndex);
  }, [minIndex, maxIndex]);

  // Загрузка метаданных при изменении индекса
  useEffect(() => {
    fetchNFTMetadata(currentIndex);
  }, [currentIndex, fetchNFTMetadata]);

  return (
    <>
      {metadata && !isLoading && (
        <div className={styles.viewer_title}>
          <div>
            {name} №{currentIndex}
          </div>
          {Object.values(marketplaces).map((place) => {
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
      )}
      <div
        className={styles.viewer_container}
        style={{
          cursor: isLoading ? 'wait' : 'pointer',
        }}
        onClick={!isLoading ? handleClick : undefined}
      >
        {error && <div className={styles.viewer_error}>Error: {error}</div>}

        {isLoading && <div>Loading...</div>}

        {metadata && !isLoading && (
          <Image
            src={metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
            alt={metadata.name || `NFT #${currentIndex}`}
            width={100}
            height={100}
            style={{
              width: '100%',
              height: '100%',
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
            }}
          />
        )}
      </div>
    </>
  );
};
