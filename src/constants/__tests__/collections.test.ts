import { describe, it, expect } from 'vitest';
import { collectionsData } from '@/constants/collections';

// The generatesOnChain flag is the contract between the config and the viewer
// selection in both route pages. It must be set per collection, and the two
// off-chain collections (attentionless, selection) must stay false so they
// keep using TokenViewer and never load the EVM.
describe('generatesOnChain flag', () => {
  it('is defined for every collection', () => {
    for (const [key, data] of Object.entries(collectionsData)) {
      expect(
        data.generatesOnChain,
        `${key} must declare generatesOnChain`,
      ).toBeTypeOf('boolean');
    }
  });

  it('marks the generative collections true', () => {
    for (const key of [
      'folds',
      'frames',
      'city',
      'blinds',
      'cocktail-straws',
      'window',
      'crosswalk',
      'lanes',
    ]) {
      expect(collectionsData[key].generatesOnChain, key).toBe(true);
    }
  });

  it('marks the off-chain collections false', () => {
    expect(collectionsData.attentionless.generatesOnChain).toBe(false);
    expect(collectionsData.selection.generatesOnChain).toBe(false);
  });

  it('has a registered bytecode loader for every generative collection', async () => {
    const { getBytecode } = await import('@/constants/bytecodes');
    for (const [key, data] of Object.entries(collectionsData)) {
      if (!data.generatesOnChain) continue;
      const bytecode = await getBytecode(data.contract);
      expect(
        bytecode,
        `${key} (${data.contract}) has no registered bytecode loader`,
      ).not.toBeNull();
      expect(bytecode?.startsWith('0x')).toBe(true);
    }
  });

  it('has no bytecode loader for off-chain collections', async () => {
    const { getBytecode } = await import('@/constants/bytecodes');
    for (const [key, data] of Object.entries(collectionsData)) {
      if (data.generatesOnChain) continue;
      const bytecode = await getBytecode(data.contract);
      expect(
        bytecode,
        `${key} must not ship a bytecode loader`,
      ).toBeNull();
    }
  });
});