import type { AsyncAfterEachHook, DocsifyPlugin } from "./types/docsify.ts";
import type { DocsifyKrokiOption } from "./types/docsify-kroki.ts";
import { initPolyfill, zlib } from "./zlib.ts";

export function urlSafeBase64Encode(str: string) {
  return btoa(encodeURI(str));
}

function textEncode(str: string) {
  return new TextEncoder().encode(str);
}

const contentType = "image/svg+xml";

async function plantWithPost(
  content: string,
  type: string,
  config: DocsifyKrokiOption,
): Promise<string> {
  const krokiServerRenderUrl = `${config?.serverPath + type}/svg/`;
  const resp = await fetch(krokiServerRenderUrl, {
    method: "POST",
    body: content,
  });
  const svg = await resp.text();
  return `
    <object data="data:${contentType};base64,${urlSafeBase64Encode(svg)}"
    type="${contentType}"></object>
    `;
}

export async function plant(
  content: string,
  type: string,
  config: DocsifyKrokiOption,
): Promise<string> {
  const urlPrefix = `${config?.serverPath + type}/svg/`;
  const data: Uint8Array = textEncode(content);
  const compressed: string = strFromU8(await zlib(data));
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
  const spanElement: HTMLSpanElement = create("span", content);
  const fetaures: Promise<void>[] = [];

  for (const LANG of config.langs!) {
    const selector = `pre[data-lang="${LANG}"]`;
    const codeElements = Array.from(spanElement.querySelectorAll(selector));

    for (const element of codeElements) {
      if (element instanceof HTMLElement) {
        const promise = plant(element.textContent!, LANG, config).then(
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

        const promise = fetch(img.getAttribute("src")!)
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

  await Promise.allSettled(fetaures);

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
    "actdiag",
    "blockdiag",
    "bpmn",
    "bytefield",
    "c4plantuml",
    "d2",
    "dbml",
    "ditaa",
    "erd",
    "excalidraw",
    "graphviz",
    "mermaid",
    "nomnoml",
    "nwdiag",
    "packetdiag",
    "pikchr",
    "plantuml",
    "rackdiag",
    "seqdiag",
    "structurizr",
    "svgbob",
    "vega",
    "vegalite",
    "wavedrom",
    "wireviz",
  ],
  serverPath: "//kroki.io/",
};

export const docsifyKrokiPlugin: DocsifyPlugin = (hook, vm) => {
  hook.afterEach?.(
    ((content, next) => {
      (async () => {
        await initPolyfill();
        const newContent = await replace(content, {
          ...defaultConfig,
          ...(vm?.config?.kroki) ?? {},
        });
        next(newContent);
      })();
    }) as AsyncAfterEachHook,
  );
};

function strFromU8(dat: Uint8Array): string {
  const s = 2 ** 14;
  const chunks = [];
  for (let i = 0; i < dat.length; i += s) {
    chunks.push(String.fromCharCode(...dat.subarray(i, i + s)));
  }
  return chunks.join("");
}
