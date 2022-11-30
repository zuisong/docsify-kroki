import { docsifyKrokiPlugin } from "./kroki";

if (!window.$docsify) {
  window.$docsify = {};
}

window.$docsify.plugins = (window.$docsify.plugins ?? []).concat(
  docsifyKrokiPlugin,
);
