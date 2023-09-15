import { esbuild, rollup, terser } from "./deps.ts";
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
    denoResolve(import.meta.url),
    {
      name: "esbuild",
      transform: async (code, fileName) => {
        if (!fileName.endsWith(".ts")) {
          return;
        }
        const res = await esbuild.transform<esbuild.TransformOptions>(code, {
          sourcefile: fileName,
          format: "esm",
          loader: "ts",
          treeShaking: true,
          target: ["chrome80", "firefox80"],
          sourcemap: true,
        });
        esbuild.formatMessages(res.warnings, { kind: "warning", color: true });
        return res;
      },
    },
    {
      name: "terser",
      renderChunk: async (code) => {
        const res = await terser.minify(code, {
          module: true,
          compress: true,
          sourceMap: true,
          mangle: true,
          output: {
            comments: false,
          },
        });
        return { code: res.code as string, map: res.map as string };
      },
    },
  ],
  external: [],
};

const bundle = await rollup.rollup(config);
await bundle.write(config.output);
