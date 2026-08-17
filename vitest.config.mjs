import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'src'),
    },
  },
});
