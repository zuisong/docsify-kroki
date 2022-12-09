import { defineConfig } from "vitest/config";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { Options } from '@babel/preset-env'
import { getBabelOutputPlugin } from "@rollup/plugin-babel";
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "docsify-kroki",
      formats: ["es", "cjs", "umd"],
      fileName: "docsify-kroki",
    },
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
                useBuiltIns: 'entry',
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
  plugins: [
    dts(),
  ],
});
