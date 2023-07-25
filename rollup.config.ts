import { swc } from "npm:rollup-plugin-swc3@0.9.1";
import { rollup, RollupOptions } from "npm:rollup@3.26.3";
import { terser } from "esm.sh/@wwa/rollup-plugin-terser@1.0.1?bundle";
const config: RollupOptions = {
  input: "./src/index.ts",
  output: {
    sourcemap: true,
    dir: "dist",
    format: "module",
  },
  plugins: [
    swc({
      sourceMaps: true,
      env: {
        targets: ["supports es6-module-dynamic-import"],
      },
    }),
    terser({}),
  ],
};

const bundle = await rollup(config);
const output = config.output!;
await bundle.write(Array.isArray(output) ? output[0] : output);
