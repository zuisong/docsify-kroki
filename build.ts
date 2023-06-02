import { bundle } from "https://bundle.deno.dev/https://deno.land/x/emit@0.23.1/mod.ts";
import json5 from "json5";

await Deno.remove("dist", { recursive: true }).catch((e) => e);
await Deno.mkdir("dist").catch((e) => e);

const { code } = await bundle(
  new URL("./src/index.ts", import.meta.url),
  {
    importMap: json5.parse(Deno.readTextFileSync("./deno.jsonc")),
  },
);
import { transform } from "@babel/standalone";

const transformedCode = transform(
  code,
  {
    filename: "result.js",
    presets: ["env"],
    targets: [
      "chrome >= 68, firefox >= 68",
    ],
    minified: true,
    sourceMaps: false,
    babelrc: false,
  },
).code ?? "";

Deno.writeTextFileSync(
  "./dist/docsify-kroki.js",
  `${transformedCode}\n`,
);
