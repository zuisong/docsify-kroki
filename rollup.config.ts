import { esbuild, rollup } from "./deps.ts";
import { importMapResolvePlugin } from "./rollup-plugin-import-maps.ts";

import packageJson from "./package.json" assert { type: "json" };
import httpsResolve from "./rollup-plugin-url-resolve.ts";

const config: rollup.InputOptions & { output: rollup.OutputOptions } = {
  input: { "docsify-kroki": "./src/index.ts" },
  treeshake: true,
  output: {
    inlineDynamicImports: true,
    sourcemap: true,
    sourcemapBaseUrl: `https://unpkg.com/docsify-kroki@${packageJson.version}/dist/`,
    exports: "none",
    dir: "dist",
    format: "es",
  },
  plugins: [
    httpsResolve(),
    importMapResolvePlugin(),
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
const output = config.output;
await bundle.write(output);
