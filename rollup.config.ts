import {
  rollup,
  type RollupOptions,
  type SourceMapInput,
} from "esm.sh/rollup@3.26.3?bundle";
import { transform } from "npm:@swc/wasm@1.3.70";
import { minify } from "esm.sh/terser@5.19.2?bundle";
const config: RollupOptions = {
  input: { "docsify-kroki": "./src/index.ts" },
  output: {
    sourcemap: true,
    dir: "dist",
    format: "module",
  },
  plugins: [
    {
      name: "swc",
      transform: (code) =>
        transform(code, {
          jsc: {
            parser: {
              syntax: "typescript",
              decorators: true,
            },
          },
          env: {
            targets: ["supports es6-module-dynamic-import"],
          },
          sourceMaps: true,
        }),
    },
    {
      name: "terser",
      renderChunk: (rawCode, _chunk, outputOptions) =>
        minify(rawCode, {
          sourceMap: outputOptions.sourcemap !== false,
        })
          .then((result) => ({
            code: result.code!,
            map: result.map as SourceMapInput,
          })),
    },
  ],
  external: [
    "https://unpkg.com/compression-streams-polyfill@0.1.4/umd/index.js",
  ],
};

const bundle = await rollup(config);
const output = config.output!;
await bundle.write(Array.isArray(output) ? output[0] : output);
