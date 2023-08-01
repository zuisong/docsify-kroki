import {
  type Plugin,
  rollup,
  type RollupOptions,
  type SourceMapInput,
} from "esm.sh/rollup@3.26.3?bundle";
import { transform } from "npm:@swc/wasm@1.3.73";
import { minify } from "esm.sh/terser@5.19.2?bundle";
import httpsResolve from "$/rollup-plugin-url-resolve.ts";
import { Any } from "$/test/common/dom-env-init.ts";

import * as JSONC from "deno_std/jsonc/mod.ts";
import { importMapResolve } from "$/rollup-plugin-import-maps.ts";

const { imports, scopes } = JSONC.parse(
  Deno.readTextFileSync("./deno.jsonc"),
) as Any;

const config: RollupOptions = {
  input: { "docsify-kroki": `./src/index.ts` },
  output: {
    sourcemap: true,
    dir: "dist",
    format: "module",
  },
  plugins: [
    httpsResolve(),
    importMapResolve({
      importMap: { imports, scopes },
    }) satisfies Plugin,
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
          mangle: true,
        }) as Promise<{ code: string; map?: SourceMapInput }>,
    },
  ],
  external: [],
};

const bundle = await rollup(config);
const output = config.output!;
await bundle.write(Array.isArray(output) ? output[0] : output);
