import httpsResolve from "$/rollup-plugin-url-resolve.ts";

import * as JSONC from "deno_std/jsonc/mod.ts";
import { importMapResolvePlugin } from "$/rollup-plugin-import-maps.ts";
import { Any } from "$/test/utils.ts";
import { minify, rollup, swc_wasm } from "$/deps.ts";

const { imports, scopes } = JSONC.parse(
  Deno.readTextFileSync("./deno.jsonc"),
) as Any;

const config: rollup.RollupOptions = {
  input: { "docsify-kroki": `./src/index.ts` },
  output: {
    inlineDynamicImports: true,
    sourcemap: true,
    exports: "none",
    dir: "dist",
    format: "es",
  },
  plugins: [
    httpsResolve(),
    importMapResolvePlugin({
      importMap: { imports, scopes },
    }),
    {
      name: "swc",
      transform: (code) =>
        swc_wasm.transform(code, {
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
            targets: ["chrome >= 80", "firefox >= 80"],
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
        }) as Promise<{ code: string; map?: rollup.SourceMapInput }>,
    },
  ] satisfies rollup.Plugin[],
  external: [],
};

const bundle = await rollup.rollup(config);
const output = config.output!;
await bundle.write(Array.isArray(output) ? output[0] : output);
