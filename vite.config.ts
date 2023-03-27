import { defineConfig } from "vitest/config";
import { resolve } from "path";
import { Options } from "@babel/preset-env";
import { getBabelOutputPlugin } from "@rollup/plugin-babel";
export default defineConfig({
  esbuild: {
    minifyWhitespace: false,
    minifyIdentifiers: true,
    minifySyntax: true,
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "docsify-kroki",
      formats: ["es", "cjs"],
      fileName: "docsify-kroki",
    },
    minify: "esbuild",
    sourcemap: true,
    rollupOptions: {
      plugins: [
        getBabelOutputPlugin({
          allowAllFormats: true,
          presets: [
            [
              "@babel/preset-env",
              {
                corejs: 3,
                useBuiltIns: "entry",
              } as Options,
            ],
          ],
        }),
      ],
    },
  },
  test: {
    environment: "happy-dom",
    coverage: {
      reporter: ["lcovonly", "html"],
    },
  },
  plugins: [],
});
