import * as swc from "swc";
import { rollup, terser } from "./deps.ts";
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
`.trim(),
  },
  plugins: [
    denoResolve(import.meta.url),
    {
      name: "swc",
      transform(rawCode, filename) {
        return swc.transform(rawCode, {
          filename,
          jsc: { parser: { syntax: "typescript" } },
          env: { targets: { chrome: "60", firefox: "60", safari: "12" } },
          sourceMaps: true,
          minify: true,
        });
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
};

const bundle = await rollup.rollup(config);
await bundle.write(config.output);
