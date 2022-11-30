import { strFromU8, zlibSync } from "fflate";

function textEncode(str: string) {
  return new TextEncoder().encode(str);
}

export function plant(
  content: string,
  type: string,
  config: DocsifyKrokiOption,
): string {
  const urlPrefix: string = `${config?.serverPath + type}/svg/`;
  const data: Uint8Array = textEncode(content);
  const compressed: string = strFromU8(zlibSync(data, { level: 9 }), true);
  const result: string = btoa(compressed)
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  const svgUrl: string = urlPrefix + result;

  return `<object type="image/svg+xml" data="${svgUrl}" />`;
}

export async function replace(
  content: string,
  config: DocsifyKrokiOption,
): Promise<string> {
  let spanElement: HTMLSpanElement = create("span", content);

  for (const LANG of config.langs) {
    let selector = `pre[data-lang="${LANG}"]`;
    spanElement.querySelectorAll(selector)
      .forEach((element: Element) => {
        if (element instanceof HTMLElement) {
          const parent = element.parentNode;
          const planted: HTMLParagraphElement = create(
            "p",
            plant(element.textContent, LANG, config),
          );
          if (parent) {
            planted.dataset.lang = LANG;
            element.parentNode.replaceChild(planted, element);
          }
        }
      });

    let imgSelector = `img[alt="kroki-${LANG}"]`;
    const elements = Array.from(spanElement.querySelectorAll(imgSelector));

    for (const element of elements) {
      if (element instanceof HTMLImageElement) {
        const img = element as HTMLImageElement;
        try {
          const code = await ((await fetch(img.getAttribute("src"))).text());
          console.log(element)
          const parent = element.parentNode;
          const planted: HTMLParagraphElement = create(
            "p",
            plant(code, LANG, config),
          );
          if (parent) {
            planted.dataset.lang = LANG;
            element.parentNode.replaceChild(planted, element);
          }
        } catch (e) {
          console.error("error",e)
          continue
        }
      }
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

export function install(hook: any, vm: any) {
  hook.afterEach((content: string, next) => {
    (async () => {
      const newContent = await replace(content, {
        ...defaultConfig,
        ...vm?.config?.kroki,
      });
      next(newContent);
    })();
  });
}

interface DocsifyKrokiOption {
  serverPath: string;
  langs: string[];
}
