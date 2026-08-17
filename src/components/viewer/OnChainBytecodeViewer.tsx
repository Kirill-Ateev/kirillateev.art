'use client';

import { CollectionData } from '@/constants/collections';
import { getRandomFromRange } from '@/utils/numbers';
import { Trans } from '@lingui/react/macro';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { TokenViewer } from './TokenViewer';
import { getBytecode } from '@/constants/bytecodes';
import { runTokenURI } from './evmRunner';
import collectionStyles from './../collections/styles.module.css';
import styles from './styles.module.css';

type NFTMetadata = {
  image: string;
  name?: string;
  description?: string;
};

export const OnChainBytecodeViewer: React.FC<{
  collectionMetadata: CollectionData;
  tokenId: number;
  baseRoute?: string;
  showTitle?: boolean;
}> = ({ collectionMetadata, tokenId, baseRoute = '', showTitle = true }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingDots, setLoadingDots] = useState<string>('');
  const [fallback, setFallback] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading) {
      setLoadingDots('');
      return;
    }

    const interval = setInterval(() => {
      setLoadingDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    let cancelled = false;

    const fetchMetadata = async () => {
      setIsLoading(true);

      try {
        const bytecode = await getBytecode(collectionMetadata.contract);

        if (!bytecode) {
          setFallback(true);
          return;
        }

        const result = await runTokenURI(bytecode, tokenId);

        if (!result.ok) {
          setFallback(true);
          return;
        }

        let resolvedUri = result.tokenURI;

        if (resolvedUri.startsWith('ipfs://')) {
          resolvedUri = `https://ipfs.io/ipfs/${resolvedUri.split('ipfs://')[1]}`;
        }

        if (resolvedUri.startsWith('data:application/json;base64,')) {
          const base64 = resolvedUri.split(',')[1];
          const rawData = atob(base64);
          if (!cancelled) {
            setMetadata(JSON.parse(rawData));
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
      } catch {
        if (!cancelled) {
          setFallback(true);
        }
      }
    };

    setMetadata(null);
    fetchMetadata();

    return () => {
      cancelled = true;
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

  if (fallback) {
    return (
      <TokenViewer
        collectionMetadata={collectionMetadata}
        tokenId={tokenId}
        baseRoute={baseRoute}
        showTitle={showTitle}
      />
    );
  }

  return (
    <div
      className={styles.viewer_container}
      style={{
        cursor: isLoading ? 'wait' : 'pointer',
      }}
    >
      {isLoading && <div>Loading{loadingDots}</div>}

      {metadata && !isLoading && (
        <>
          <div
            className={
              collectionMetadata.padded
                ? styles.viewer_title
                : styles.viewer_title_padded
            }
          >
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