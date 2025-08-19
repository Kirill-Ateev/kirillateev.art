import Header from '@/components/header/Header';
import { ERC721Viewer } from '@/components/viewers/ERC721Viewer';
import { collectionsData } from '@/constants/collections';
import { withLinguiPage } from '@/withLingui';
import { locales } from '../../../../../lingui.config';
import styles from '../../page.module.css';

export async function generateStaticParams() {
  const paths: { collection: string; lang: string }[] = [];
  Object.keys(collectionsData).forEach((collectionName) => {
    locales.forEach((lang) => {
      paths.push({
        collection: collectionName,
        lang,
      });
    });
  });

  return paths;
}

export default withLinguiPage(function CollectionViewer({
  params,
}: {
  params: { lang: string; collection: keyof typeof collectionsData };
}) {
  const collectionMetadata = collectionsData[params.collection];
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <ERC721Viewer
          name={collectionMetadata.name}
          marketplaces={collectionMetadata.marketplaces}
          contractAddress={collectionMetadata.contract}
          minIndex={collectionMetadata.minIndex}
          maxIndex={collectionMetadata.maxIndex}
        />
      </main>
    </div>
  );
});
