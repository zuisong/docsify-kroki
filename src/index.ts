import { docsifyKrokiPlugin } from "./kroki";
import type {} from "./docsify";
if (!window.$docsify) {
  window.$docsify = {};
}

window.$docsify.plugins = (window.$docsify.plugins ?? []).concat(
  docsifyKrokiPlugin,
);
