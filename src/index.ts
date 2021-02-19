import {install} from "./kroki";

// @ts-ignore
if (!window?.$docsify) {
    // @ts-ignore
    window.$docsify = {};
}
// @ts-ignore
window.$docsify.plugins = (window.$docsify.plugins ?? []).concat(install);
