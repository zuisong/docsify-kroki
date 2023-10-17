import { rollup, esbuild, terser } from "./deps.ts";
import packageJson from "./package.json" with { type: "json" };
import denoResolve from "./rollup-deno-plugin.ts";
const config: rollup.InputOptions & { output: rollup.OutputOptions } = {
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
};

const bundle = await rollup.rollup(config);
const out = await bundle.generate(config.output);
await bundle.close();

function safeRun(f: () => void) {
  try {
    f();
  } catch (e) {
    // ignore error
  }
}

safeRun(() => Deno.removeSync("dist", { recursive: true }));
safeRun(() => Deno.mkdirSync("dist"));

const res = out.output.map((o) => writeBundle(o, `dist/${o.fileName}`));

await Promise.allSettled(res);

function writeBundle(
  o: rollup.OutputChunk | rollup.OutputAsset,
  fileName: string,
): Promise<void> {
  if (o.type === "chunk") {
    return Deno.writeTextFile(fileName, o.code);
  } else {
    const data = o.source;
    return data instanceof Uint8Array
      ? Deno.writeFile(fileName, data)
      : Deno.writeTextFile(fileName, data);
  }
}
