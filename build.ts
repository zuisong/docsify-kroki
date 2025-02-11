import * as esbuild from "npm:esbuild@0.25.0";
import { denoPlugins } from "jsr:@luca/esbuild-deno-loader@^0.11";
import { emptyDir } from "jsr:@std/fs/empty-dir";
import { resolve, toFileUrl } from "jsr:@std/path";
import packageJson from "./package.json" with { type: "json" };

await emptyDir("./dist");

const result = await esbuild.build<esbuild.BuildOptions>({
  plugins: [
    ...denoPlugins({
      loader: "portable",
      importMapURL: toFileUrl(resolve("./deno.jsonc")).toString(),
    }),
  ],
  platform: "browser",
  entryPoints: { "docsify-kroki": "./src/index.ts" },
  outdir: "./dist/",
  bundle: true,
  minify: true,
  banner: {
    js: `
/*!
* docsify-kroki
* v${packageJson.version}
* https://github.com/zuisong/docsify-kroki
* (c) 2020-${new Date().getFullYear()} zuisong
* MIT license
*/
  `.trim(),
  },
  format: "esm",
});

esbuild.stop();
