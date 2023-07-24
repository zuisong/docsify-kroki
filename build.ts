import { transform } from "npm:@swc/wasm";
import { bundle } from "$/deps/deno_emit.ts";
import * as JSONC from "deno_std/jsonc/parse.ts";
await Deno.remove("dist", { recursive: true }).catch((e) => e);
await Deno.mkdir("dist").catch((e) => e);

const { code } = await bundle(
  new URL("./src/index.ts", import.meta.url),
  {
    importMap: JSONC.parse(Deno.readTextFileSync("./deno.jsonc")),
  },
);

const { code: transformCode } = await transform(code, {
  minify: true,
  env: {
    targets: [
      "chrome >= 80",
      "firefox >= 80",
      // "supports es6-module-dynamic-import",
      // "not ie 6-11",
    ],
  },
  jsc: {
    minify: {
      compress: true,
      mangle: true,
    },
  },
});

import { minify } from "esm.sh/terser@5.19.2?bundle";
const { code: minifyCode } = await minify(transformCode, {});

Deno.writeTextFileSync("./dist/docsify-kroki.js", minifyCode!);
