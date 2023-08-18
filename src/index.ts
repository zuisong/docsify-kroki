import { docsifyKrokiPlugin } from "./kroki.ts";
import type {} from "./types/docsify.ts";
window.$docsify = window.$docsify ?? {};
window.$docsify.plugins = (window.$docsify.plugins ?? []).concat(
  docsifyKrokiPlugin,
);
