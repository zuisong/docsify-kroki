import { install } from "./kroki";

declare global {
  var $docsify: { plugins?: any[] };
}

if (!window.$docsify) {
  window.$docsify = {};
}

window.$docsify.plugins = (window.$docsify.plugins ?? []).concat(
  install,
);
