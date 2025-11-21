import { denoPlugin } from "jsr:@deno/esbuild-plugin@1.2.0";
import { emptyDir } from "jsr:@std/fs@1";
import * as esbuild from "npm:esbuild@0.25.8";
import packageJson from "./package.json" with { type: "json" };

await emptyDir("./dist");

const _result = await esbuild.build<esbuild.BuildOptions>({
  plugins: [denoPlugin()],
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
