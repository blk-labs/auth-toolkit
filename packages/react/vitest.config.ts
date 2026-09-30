import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/__tests__/setup.ts",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "next/headers": resolve(__dirname, "./src/__tests__/mocks/next-headers.ts"),
    },
  },
  esbuild: {
    jsx: "automatic",
  },
});
