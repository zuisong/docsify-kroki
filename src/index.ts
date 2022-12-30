import { docsifyKrokiPlugin } from "./kroki.ts";

if (!window.$docsify) {
  window.$docsify = {};
}

window.$docsify.plugins = (window.$docsify.plugins ?? []).concat(
  docsifyKrokiPlugin,
);
