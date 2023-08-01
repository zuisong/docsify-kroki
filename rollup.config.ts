import {
  rollup,
  type RollupOptions,
  type SourceMapInput,
} from "esm.sh/rollup@3.26.3?bundle";
import { transform } from "npm:@swc/wasm@1.3.73";
import { minify } from "esm.sh/terser@5.19.2?bundle";
import { default as alias } from "esm.sh/@rollup/plugin-alias@5.0.0";
import httpsResolve from "./rollup-plugin-url-resolve.ts";
const __dirname = new URL(".", import.meta.url).pathname;

const config: RollupOptions = {
  input: { "docsify-kroki": `${__dirname}/src/index.ts` },
  output: {
    sourcemap: true,
    dir: "dist",
    format: "module",
  },
  plugins: [
    alias({
      entries: {
        ["$"]: __dirname,
        ["esm.sh"]: "https://esm.sh",
      },
    }),
    httpsResolve(),
    {
      name: "swc",
      transform: (code) =>
        transform(code, {
          minify: true,
          jsc: {
            externalHelpers: false,
            minify: {
              compress: true,
              mangle: true,
            },
            parser: {
              syntax: "typescript",
              decorators: true,
              dynamicImport: true,
            },
          },
          env: {
            // mode: "usage",
            targets: ["chrome >= 70"],
          },
          sourceMaps: true,
        }),
    },
    {
      name: "terser",
      renderChunk: (rawCode) =>
        minify(rawCode, {
          sourceMap: true,
        }) as Promise<{ code: string; map?: SourceMapInput }>,
    },
  ],
  external: [],
};

const bundle = await rollup(config);
const output = config.output!;
await bundle.write(Array.isArray(output) ? output[0] : output);
