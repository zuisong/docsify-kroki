import { install } from "./kroki";
export { plant, replace } from "./kroki";

if (!window?.$docsify) {
  window.$docsify = {};
}

window.$docsify.plugins = (window.$docsify.plugins ?? []).concat(install);
