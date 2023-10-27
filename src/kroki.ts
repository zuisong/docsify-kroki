import type { DocsifyKrokiOption } from "./types/docsify-kroki.ts";
import { DocsifyPlugin } from "./types/docsify.ts";
import { zlib } from "./zlib.ts";

const urlSafeBase64Encode = (str: string) => btoa(encodeURI(str));

const contentType = "image/svg+xml";

async function plantWithPost(
  content: string,
  type: string,
  serverPath: string,
): Promise<string> {
  const krokiServerRenderUrl = `${serverPath + type}/svg/`;
  const resp = await fetch(krokiServerRenderUrl, {
    method: "POST",
    body: content,
  });
  const svg = await resp.text();
  return `data:${contentType};base64,${urlSafeBase64Encode(svg)}`;
}

export async function plant(
  content: string,
  type: string,
  serverPath: string,
): Promise<string> {
  const urlPrefix = `${serverPath + type}/svg/`;
  const compressed: string = await zlib(content);
  const result: string = btoa(compressed)
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  const svgUrl: string = urlPrefix + result;
  const objectData = svgUrl.length < 4000
    ? svgUrl
    : await plantWithPost(content, type, serverPath);
  return `<object type="${contentType}" style="max-width: 100%;" data="${objectData}" />`;
}

export async function replace(
  content: string,
  config: DocsifyKrokiOption,
): Promise<string> {
  const spanElement: HTMLSpanElement = create("div", content);
  const fetaures: Promise<void>[] = [];

  for (const LANG of config.langs) {
    const codeElements = Array.from(
      spanElement.querySelectorAll<HTMLPreElement>(`pre[data-lang="${LANG}"]`),
    );

    for (const element of codeElements) {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      const promise = plant(element.textContent!, LANG, config.serverPath).then(
        (graphStr) => {
          const planted: HTMLParagraphElement = create("p", graphStr);
          planted.dataset.lang = LANG;
          planted.style.maxWidth = "inherit";
          element.parentNode?.replaceChild(planted, element);
        },
      );
      fetaures.push(promise);
    }

    const imgElements = Array.from(
      spanElement.querySelectorAll<HTMLImageElement>(
        `img[alt="kroki-${LANG}"]`,
      ),
    );

    for (const element of imgElements) {
      const img = element as HTMLImageElement;
      const parent = element.parentNode;

      const srcUrl = img.getAttribute("src");
      if (!srcUrl) {
        continue;
      }
      const promise = fetch(srcUrl)
        .then((it) => it.text())
        .then((code) => plant(code, LANG, config.serverPath))
        .then((graphStr) => {
          const planted: HTMLParagraphElement = create("p", graphStr);
          planted.dataset.lang = LANG;
          planted.style.maxWidth = "inherit";
          parent?.replaceChild(planted, element);
        });
      fetaures.push(promise);
    }
  }

  for (const f of fetaures) {
    await f.catch((e) => console.error(e));
  }

  return spanElement.innerHTML;
}

function create<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  tpl: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tagName);
  node.innerHTML = tpl;
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
    "symbolator",
    "tikz",
    "vega",
    "vegalite",
    "wavedrom",
    "wireviz",
  ],
  serverPath: "//kroki.io/",
};

export const docsifyKrokiPlugin: DocsifyPlugin = (hook, vm) => {
  hook.afterEach((content: string, next: (html: string) => void) => {
    replace(content, {
      ...defaultConfig,
      ...(vm?.config?.kroki || {}),
    }).then(next);
  });
};
