import { docsifyKrokiPlugin } from "./kroki.ts";
window.$docsify = window.$docsify ?? {};
window.$docsify.plugins = (window.$docsify.plugins ?? []).concat(
  docsifyKrokiPlugin,
);
