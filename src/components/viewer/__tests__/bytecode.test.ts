import { describe, it, expect } from 'vitest';

// getBytecode resolves a loader registered for a contract address. It must
// not execute any loader on import, and must return null for unregistered
// addresses so the viewer can fall back to TokenViewer.
describe('getBytecode', () => {
  it('returns null for an address with no registered loader', async () => {
    const { getBytecode } = await import('@/constants/bytecodes');
    expect(await getBytecode('0x0000000000000000000000000000000000000000')).toBeNull();
  });

  it('is case-insensitive on the address key', async () => {
    const { getBytecode, registerBytecode } = await import('@/constants/bytecodes');
    registerBytecode('0xAbCdEf00000000000000000000000000000000000', () =>
      Promise.resolve({ default: '0xdeadbeef' }),
    );
    expect(await getBytecode('0xABCDEF00000000000000000000000000000000000')).toBe('0xdeadbeef');
  });

  it('returns null when the loaded module has no default export', async () => {
    const { getBytecode, registerBytecode } = await import('@/constants/bytecodes');
    registerBytecode('0x0000000000000000000000000000000000000001', () =>
      Promise.resolve({} as { default: string }),
    );
    expect(await getBytecode('0x0000000000000000000000000000000000000001')).toBeNull();
  });

  it('returns null when the default export is empty', async () => {
    const { getBytecode, registerBytecode } = await import('@/constants/bytecodes');
    registerBytecode('0x0000000000000000000000000000000000000002', () =>
      Promise.resolve({ default: '' }),
    );
    expect(await getBytecode('0x0000000000000000000000000000000000000002')).toBeNull();
  });
});

describe('runTokenURI', () => {
  it('returns ok:false when the bytecode is empty or not 0x-prefixed', async () => {
    const { runTokenURI } = await import('@/components/viewer/evmRunner');
    expect((await runTokenURI('', 1)).ok).toBe(false);
    expect((await runTokenURI('60806040', 1)).ok).toBe(false);
  });

  it('returns ok:false on an invalid opcode', async () => {
    const { runTokenURI } = await import('@/components/viewer/evmRunner');
    const result = await runTokenURI('0xfe', 1);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason.length).toBeGreaterThan(0);
    }
  });

  it('returns ok:false when the contract reverts', async () => {
    const { runTokenURI } = await import('@/components/viewer/evmRunner');
    // PUSH1 0x00 PUSH1 0x00 REVERT — reverts with no data
    const result = await runTokenURI('0x60006000fd', 1);
    expect(result.ok).toBe(false);
  });
});