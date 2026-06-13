'use client';
import { getRandomFromRange } from '@/utils/numbers';
import { Trans } from '@lingui/react/macro';
import { ethers } from 'ethers';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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

const RPC_PROVIDER = new ethers.JsonRpcProvider(
  'https://vercel-rpc-view.vercel.app/api/view',
);

export const TokenViewer: React.FC<{
  collectionMetadata: CollectionMetadata;
  tokenId: number;
}> = ({ collectionMetadata, tokenId }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNFTMetadata = useCallback(
    async (id: number) => {
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
          RPC_PROVIDER,
        );
        const tokenURI = await contract.tokenURI(id);

        let resolvedUri = tokenURI;

        if (tokenURI.startsWith('ipfs://')) {
          resolvedUri = `https://ipfs.io/ipfs/${tokenURI.split('ipfs://')[1]}`;
        }

        if (tokenURI.startsWith('data:application/json;base64,')) {
          const base64 = tokenURI.split(',')[1];
          const rawData = atob(base64);
          setMetadata(JSON.parse(rawData));
          return;
        }

        const response = await fetch(resolvedUri);
        if (!response.ok) throw new Error('Failed to fetch metadata');

        setMetadata(await response.json());
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        setMetadata(null);
      } finally {
        setIsLoading(false);
      }
    },
    [collectionMetadata.contract],
  );

  useEffect(() => {
    fetchNFTMetadata(tokenId);
  }, [tokenId, fetchNFTMetadata]);

  const handleClick = useCallback(() => {
    const randomIndex = getRandomFromRange(
      collectionMetadata.minIndex,
      collectionMetadata.maxIndex,
    );

    router.push(
      `${pathname.substring(0, pathname.lastIndexOf('/'))}/${randomIndex.toString()}`,
    );
  }, [collectionMetadata.minIndex, collectionMetadata.maxIndex]);

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
              {collectionMetadata.name} #{tokenId}
            </div>
            <div
              className={`${styles.absolute_subtext} ${collectionStyles.text_secondary}`}
              onClick={handleClick}
            >
              <Trans>(click for next)</Trans>
            </div>
            {Object.values(collectionMetadata.marketplaces).map((place) => (
              <Link
                key={place.link}
                className={`${collectionStyles.link} ${collectionStyles.text_secondary}`}
                target="_blank"
                rel="noreferrer"
                href={`${place.tokenLink}${tokenId}`}
              >
                {place.name}
              </Link>
            ))}
          </div>
          <Image
            src={metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
            alt={`${metadata.name} ${tokenId}` || `NFT #${tokenId}`}
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
