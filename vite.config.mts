import { defineConfig } from "npm:vite";
import denoResolve from "https://deno.land/x/vite_plugin_deno_resolve@0.5.0/mod.ts";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "docsify-kroki",
      formats: ["es", "cjs", "umd"],
      fileName: "docsify-kroki",
    },
    sourcemap: true,
  },
  plugins: [denoResolve()],
});
