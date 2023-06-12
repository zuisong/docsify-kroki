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

const minifiedCode = await transform(code, {
  minify: true,
  env: {
    targets: {
      chrome: "68",
      firefox: "68",
    },
  },
  jsc: {
    minify: {
      compress: true,
      mangle: true,
    },
  },
});

Deno.writeTextFileSync(
  "./dist/docsify-kroki.js",
  minifiedCode.code,
);
