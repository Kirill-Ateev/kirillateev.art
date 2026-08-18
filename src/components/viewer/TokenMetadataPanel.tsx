import React from 'react';
import styles from './styles.module.css';

type Attribute = {
  trait_type?: string;
  value?: string;
};

export const TokenMetadataPanel: React.FC<{
  description?: string;
  attributes?: Attribute[];
}> = ({ description, attributes }) => {
  const hasAttributes = Array.isArray(attributes) && attributes.length > 0;

  return (
    <div className={styles.panel}>
      {description && <p className={styles.description}>{description}</p>}

      {hasAttributes && (
        <ul className={styles.attributes}>
          {attributes!.map((attr, index) => {
            if (!attr.trait_type && !attr.value) return null;
            return (
              <li key={index} className={styles.attribute}>
                <div className={styles.attribute_head}>
                  {attr.trait_type && (
                    <span className={styles.key}>{attr.trait_type}</span>
                  )}
                  {attr.value && (
                    <span className={styles.value}>{attr.value}</span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
