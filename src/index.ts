import { docsifyKrokiPlugin } from "./kroki.ts";
globalThis.$docsify = globalThis.$docsify || {};
globalThis.$docsify.plugins = (globalThis.$docsify.plugins || []).concat(
  docsifyKrokiPlugin,
);
