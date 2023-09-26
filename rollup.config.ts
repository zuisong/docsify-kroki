import * as rollup from "rollup";
import packageJson from "./package.json" assert { type: "json" };
import denoResolve from "https://gist.github.com/zuisong/5b4ac483d9efcb01fa29389bc19fc7f5/raw/rollup-deno-plugin.ts";
import * as terser from "terser";
import * as esbuild from "esbuild-wasm";
const config = rollup.defineConfig({
  input: { "docsify-kroki": "./src/index.ts" },
  treeshake: true,
  output: {
    inlineDynamicImports: true,
    sourcemap: true,
    sourcemapBaseUrl: `https://unpkg.com/docsify-kroki@${packageJson.version}/dist/`,
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
      transform(code, fileName) {
        if (!fileName.endsWith(".ts")) {
          return;
        }
        return esbuild.transform<esbuild.TransformOptions>(code, {
          sourcefile: fileName,
          format: "esm",
          loader: "ts",
          treeShaking: true,
          target: ["chrome80", "firefox80"],
          sourcemap: true,
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
  external: [],
});

const bundle = await rollup.rollup(config);
await bundle.write(config.output as rollup.OutputOptions);
