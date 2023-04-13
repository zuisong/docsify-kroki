import denoResolve from "https://deno.land/x/vite_plugin_deno_resolve@0.5.0/mod.ts";
import JSON5 from "npm:json5";
import { defineConfig } from "npm:vite";
import { importMaps } from "vite-deno-import-map-plugin";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "docsify-kroki",
      formats: ["es", "cjs"],
      fileName: "docsify-kroki",
    },
    target: "es2016",
    minify: true,
    sourcemap: true,
  },
  plugins: [
    importMaps(
      () =>
        JSON5.parse(
          Deno.readTextFileSync("./deno.jsonc"),
        ),
    ),
    denoResolve(),
    // babel(),
  ],
});
