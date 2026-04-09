import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/__tests__/setup.ts",
  },
  resolve: {
    alias: {
      "@auth-toolkit/core": path.resolve(__dirname, "../core/src/index.ts"),
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  esbuild: {
    jsx: "automatic",
  },
});
