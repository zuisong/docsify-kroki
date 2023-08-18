import httpsResolve from "$/rollup-plugin-url-resolve.ts";

import * as JSONC from "deno_std/jsonc/mod.ts";
import { importMapResolvePlugin } from "$/rollup-plugin-import-maps.ts";
import { Any } from "$/test/utils.ts";
import { rollup, swc_wasm } from "$/deps.ts";

const { imports, scopes } = JSONC.parse(
  Deno.readTextFileSync("./deno.jsonc"),
) as Any;

const config: rollup.RollupOptions = {
  input: { "docsify-kroki": `./src/index.ts` },
  treeshake: "smallest",
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
          jsc: {
            parser: {
              syntax: "typescript",
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
      name: "swc-minify",
      renderChunk: (code) =>
        swc_wasm.minifySync(code, {
          sourceMap: true,
        }),
    },
  ] satisfies rollup.Plugin[],
  external: [],
};

const bundle = await rollup.rollup(config);
const output = config.output!;
await bundle.write(Array.isArray(output) ? output[0] : output);
