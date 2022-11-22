import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "docsify-kroki",
      formats: ["es", "cjs", "umd"],
      fileName: "docsify-kroki",
    },
  },
  test: {
    environment: "happy-dom",
    coverage: {
      reporter: ["lcovonly", "html"],
    },
  },
});
