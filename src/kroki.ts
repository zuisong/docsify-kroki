import { strFromU8, zlibSync } from "fflate";

function textEncode(str: string) {
  return new TextEncoder().encode(str);
}

export function plant(
  content: string,
  type: string,
  config: DocsifyKrokiOption,
) {
  const urlPrefix: string = `${config?.serverPath + type}/svg/`;

  const data: Uint8Array = textEncode(content);
  const compressed: string = strFromU8(zlibSync(data, { level: 9 }), true);
  const result: string = btoa(compressed)
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  const svgUrl: string = urlPrefix + result;

  return `<object type="image/svg+xml" data="${svgUrl}" />`;
}

export function replace(content: string, config: DocsifyKrokiOption) {
  let spanElement: HTMLSpanElement = create("span", content);
  if (!spanElement.querySelectorAll) {
    return content;
  }

  for (const LANG of config.langs) {
    let selector = `pre[data-lang="${LANG}"]`;
    spanElement.querySelectorAll(selector)
      .forEach((element: HTMLElement) => {
        const parent = element.parentNode;
        const planted: HTMLParagraphElement = create(
          "p",
          plant(element.innerText, LANG, config),
        );
        if (parent) {
          planted.dataset.lang = LANG;
          element.parentNode.replaceChild(planted, element);
        }
      });
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

export function install(hook: any, vm: any) {
  const config: DocsifyKrokiOption = {
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
    ],
    serverPath: "//kroki.io/",
    ...vm.config.kroki,
  };
  hook.afterEach((content: string) => replace(content, config));
}
