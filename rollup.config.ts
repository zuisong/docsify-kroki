import { esbuild, rollup } from "./deps.ts";

import packageJson from "./package.json" assert { type: "json" };
import denoResolve from "./rollup-plugin-deno-resolve.ts";

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
    denoResolve(),
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
