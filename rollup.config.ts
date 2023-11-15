import { rollup, terser } from "./deps.ts";
import { transform } from "esm.sh/@babel/standalone@7.23.3?bundle";
import packageJson from "./package.json" with { type: "json" };
import denoResolve from "./rollup-deno-plugin.ts";

const config: rollup.InputOptions & { output: rollup.OutputOptions } = {
  input: { "docsify-kroki": "./src/index.ts" },
  treeshake: true,
  strictDeprecations: true,
  output: {
    inlineDynamicImports: true,
    sourcemap: true,
    sourcemapBaseUrl:
      `https://unpkg.com/docsify-kroki@${packageJson.version}/dist/`,
    exports: "none",
    dir: "dist",
    format: "es",
    banner: `
/*!
 * docsify-kroki
 * v${packageJson.version}
 * https://github.com/zuisong/docsify-kroki
 * (c) 2020-2023 zuisong
 * MIT license
 */
   `.trimStart(),
  },
  plugins: [
    denoResolve(import.meta.url),
    {
      name: "esbuild",
      transform(rawCode, fileName) {
        const { code, map } = transform(rawCode, {
          filename: fileName,
          presets: ["typescript"],
          sourceMaps: true,
          targets: ["chrome >=70"],
        });
        return { code: code ?? rawCode, map };
      },
    },
    {
      name: "terser",
      async renderChunk(code) {
        const res = await terser.minify(code, {
          module: true,
          compress: true,
          sourceMap: true,
          mangle: true,
        });
        return { code: res.code as string, map: res.map as string };
      },
    },
  ],
  external: [],
};

const bundle = await rollup.rollup(config);
await bundle.write(config.output);
