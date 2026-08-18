'use client';
import { SkeletonAttribute } from '@/components/common/SkeletonAttribute';
import { SkeletonBox } from '@/components/common/SkeletonBox';
import { SkeletonHeader } from '@/components/common/SkeletonHeader';
import { SkeletonText } from '@/components/common/SkeletonText';
import { ERC721_ABI, PUBLIC_CLIENT } from '@/utils/data';
import { getRandomFromRange } from '@/utils/numbers';
import { Trans } from '@lingui/react/macro';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { isAddress } from 'viem';
import collectionStyles from './../collections/styles.module.css';
import { TokenMetadataPanel } from './TokenMetadataPanel';
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
  attributes?: Array<{
    type?: string;
    value?: string;
    description?: string;
  }>;
};

export const TokenViewer: React.FC<{
  collectionMetadata: CollectionMetadata;
  tokenId: number;
  baseRoute?: string;
  showTitle?: boolean;
}> = ({ collectionMetadata, tokenId, baseRoute = '', showTitle = true }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Retry loop: never shows errors, only "Loading…" until success
  useEffect(() => {
    let cancelled = false;
    const timeouts: NodeJS.Timeout[] = [];

    const delay = (ms: number) =>
      new Promise<void>((resolve) => {
        const timeout = setTimeout(resolve, ms);
        timeouts.push(timeout);
      });

    const fetchData = async () => {
      while (!cancelled) {
        setIsLoading(true);
        try {
          // Validate contract address – throws to trigger retry if invalid
          if (!isAddress(collectionMetadata.contract)) {
            throw new Error('Invalid contract address');
          }

          const tokenURI = (await PUBLIC_CLIENT.readContract({
            address: collectionMetadata.contract as `0x${string}`,
            abi: ERC721_ABI,
            functionName: 'tokenURI',
            args: [BigInt(tokenId)],
          })) as string;

          let resolvedUri = tokenURI;

          if (tokenURI.startsWith('ipfs://')) {
            resolvedUri = `https://ipfs.io/ipfs/${tokenURI.split('ipfs://')[1]}`;
          }

          // Handle on-chain base64 JSON metadata
          if (tokenURI.startsWith('data:application/json;base64,')) {
            const base64 = tokenURI.split(',')[1];
            const data = JSON.parse(atob(base64));
            if (!cancelled) {
              setMetadata({
                ...data,
                description: data.description.replaceAll('â', '—'),
              });
              setIsLoading(false);
            }
            return;
          }

          const response = await fetch(resolvedUri);
          if (!response.ok) throw new Error('Failed to fetch metadata');

          const data = await response.json();
          if (!cancelled) {
            setMetadata(data);
            setIsLoading(false);
          }
          return; // success – exit retry loop
        } catch (err) {
          // Silently ignore the error and retry after a 100 ms delay
          if (!cancelled) {
            await delay(100);
          }
        }
      }
    };

    // Reset metadata and start fetching
    setMetadata(null);
    fetchData();

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [tokenId, collectionMetadata.contract]);

  const handleClick = useCallback(() => {
    const randomIndex = getRandomFromRange(
      collectionMetadata.minIndex,
      collectionMetadata.maxIndex,
    );

    router.push(
      `${pathname.substring(0, pathname.lastIndexOf('/'))}${baseRoute}/${randomIndex.toString()}`,
    );
  }, [collectionMetadata.minIndex, collectionMetadata.maxIndex]);

  return (
    <div
      className={styles.viewer_container}
      style={{
        cursor: isLoading ? 'wait' : 'auto',
      }}
    >
      {isLoading && (
        <div className={styles.artwork_wrap}>
          <SkeletonHeader />
          <div className={styles.artwork_body}>
            <div className={styles.skeleton_stage}>
              <SkeletonBox className={styles.skeleton_artwork} />
            </div>
            <div className={styles.skeleton_panel}>
              <SkeletonText width="100%" height="14px" />
              <SkeletonAttribute />
              <SkeletonAttribute />
              <SkeletonAttribute />
            </div>
          </div>
        </div>
      )}

      {metadata && !isLoading && (
        <div className={styles.artwork_wrap}>
          <div className={styles.artwork_header}>
            {showTitle && (
              <h1
                style={{
                  margin: 0,
                  fontSize: 'inherit',
                  fontWeight: 'inherit',
                  textAlign: 'center',
                }}
              >
                {collectionMetadata.name} #{tokenId}
              </h1>
            )}
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
          <div className={styles.artwork_body}>
            <div className={styles.artwork_stage} onClick={handleClick}>
              <Image
                src={metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
                alt={`${metadata.name} ${tokenId}` || `NFT #${tokenId}`}
                width={100}
                height={100}
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  cursor: 'pointer',
                }}
                onClick={handleClick}
              />
              <div
                className={`${styles.artwork_caption} ${collectionStyles.text_secondary}`}
                onClick={handleClick}
              >
                <Trans>(click for next)</Trans>
              </div>
            </div>
            <TokenMetadataPanel
              description={metadata.description}
              attributes={metadata.attributes}
            />
          </div>
        </div>
      )}
    </div>
  );
};
