import { rollup, esbuild, terser } from "./deps.ts";
import packageJson from "./package.json" with { type: "json" };
import denoResolve from "./rollup-deno-plugin.ts";
const config = rollup.defineConfig({
  input: { "docsify-kroki": "./src/index.ts" },
  treeshake: true,
  strictDeprecations: true,
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
