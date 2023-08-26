import * as JSONC from "deno_std/jsonc/mod.ts";
import { esbuild, rollup } from "./deps.ts";
import { importMapResolvePlugin } from "./rollup-plugin-import-maps.ts";
import httpsResolve from "./rollup-plugin-url-resolve.ts";
import { Any } from "./test/utils.ts";

const { imports, scopes } = JSONC.parse(
  Deno.readTextFileSync("./deno.jsonc"),
) as Any;

const config: rollup.RollupOptions = {
  input: { "docsify-kroki": `./src/index.ts` },
  treeshake: true,
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
      name: "esbuild",
      transform: (code) =>
        esbuild.transform<esbuild.TransformOptions>(code, {
          format: "esm",
          loader: "ts",
          treeShaking: true,
          target: ["chrome80", "firefox80"],
          sourcemap: true,
          minify: true,
          minifySyntax: true,
          minifyWhitespace: true,
          minifyIdentifiers: true,
          keepNames: false,
          lineLimit: 200,
          mangleQuoted: true,
        }),
    },
  ] satisfies rollup.Plugin[],
  external: [],
};

const bundle = await rollup.rollup(config);
const output = config.output!;
await bundle.write(Array.isArray(output) ? output[0] : output);
