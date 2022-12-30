// @deno-types="npm:fflate"
import { strFromU8, zlibSync } from "https://jspm.dev/fflate@0.7.4";
import { DocsifyKrokiOption, DocsifyPlugin } from "./types.ts";
// @deno-types="npm:js-base64"
import { encode } from "https://jspm.dev/js-base64@3.7.3";

function textEncode(str: string) {
  return new TextEncoder().encode(str);
}
const contentType = "image/svg+xml";

function plantWithPost(
  content: string,
  type: string,
  config: DocsifyKrokiOption,
): Promise<string> {
  const krokiServerRenderUrl = `${config?.serverPath + type}/svg/`;
  return fetch(krokiServerRenderUrl, {
    method: "POST",
    body: content,
  })
    .then((resp) => resp.text())
    .then((svg) => `
    <object data="data:${contentType};base64,${encode(svg)}"
    type="${contentType}"></object>
    `);
}

// deno-lint-ignore require-await
export async function plant(
  content: string,
  type: string,
  config: DocsifyKrokiOption,
): Promise<string> {
  const urlPrefix = `${config?.serverPath + type}/svg/`;
  const data: Uint8Array = textEncode(content);
  const compressed: string = strFromU8(zlibSync(data, { level: 9 }), true);
  const result: string = btoa(compressed)
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  const svgUrl: string = urlPrefix + result;
  const svgContent = `<object type="image/svg+xml" data="${svgUrl}" />`;
  if (svgContent.length < 4000) {
    return svgContent;
  }
  return plantWithPost(content, type, config);
}

export async function replace(
  content: string,
  config: DocsifyKrokiOption,
): Promise<string> {
  const spanElement = create("span", content);
  const fetaures: Promise<void>[] = [];

  // deno-lint-ignore no-extra-non-null-assertion
  for (const LANG of (config.langs!!)) {
    const selector = `pre[data-lang="${LANG}"]`;
    const codeElements = Array.from(spanElement.querySelectorAll(selector));

    for (const element of codeElements) {
      if (element instanceof HTMLElement) {
        // deno-lint-ignore no-extra-non-null-assertion
        const promise = plant(element.textContent!!, LANG, config).then(
          (graphStr) => {
            const planted: HTMLParagraphElement = create(
              "p",
              graphStr,
            );
            planted.dataset.lang = LANG;
            element.parentNode?.replaceChild(planted, element);
          },
        );
        fetaures.push(promise);
      }
    }

    const imgSelector = `img[alt="kroki-${LANG}"]`;
    const imgElements = Array.from(spanElement.querySelectorAll(imgSelector));

    for (const element of imgElements) {
      if (element instanceof HTMLImageElement) {
        const img = element as HTMLImageElement;
        const parent = element.parentNode;

        // deno-lint-ignore no-extra-non-null-assertion
        const promise = fetch(img.getAttribute("src")!!)
          .then((it) => it.text())
          .then((code) => plant(code, LANG, config))
          .then((graphStr) => {
            const planted: HTMLParagraphElement = create(
              "p",
              graphStr,
            );
            if (parent) {
              planted.dataset.lang = LANG;
              parent.replaceChild(planted, element);
            }
          });
        fetaures.push(promise);
      }
    }
  }

  for (const p of fetaures) {
    try {
      await p;
    } catch (e) {
      console.error("error", e);
    }
  }

  return spanElement.innerHTML;
}

function create<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  tpl: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tagName);
  if (tpl) {
    node.innerHTML = tpl;
  }
  return node;
}

export const defaultConfig: DocsifyKrokiOption = {
  langs: [
    "plantuml",
    "mermaid",
    "svgbob",
    "vega",
    "vegalite",
    "wavedrom",
    "nomnoml",
    "graphviz",
    "erd",
    "ditaa",
    "c4plantuml",
    "packetdiag",
    "nwdiag",
    "actdiag",
    "seqdiag",
    "bytefield",
    "bpmn",
    "blockdiag",
    "rackdiag",
    "pikchr",
    "excalidraw",
  ],
  serverPath: "//kroki.io/",
};

export const docsifyKrokiPlugin: DocsifyPlugin = (hook, vm) => {
  hook.afterEach((content, next) => {
    (async () => {
      const newContent = await replace(content, {
        ...defaultConfig,
        ...vm?.config?.kroki,
      });
      next(newContent);
    })();
  });
};
