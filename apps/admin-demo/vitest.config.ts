import { defineConfig } from 'vitest/config';

export default defineConfig({
  server: {
    port: 5174,
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
