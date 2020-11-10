import { deflate } from "pako";

function textEncode(str) {
  if (window.TextEncoder) {
    return new TextEncoder("utf-8").encode(str);
  }
  var utf8 = unescape(encodeURIComponent(str));
  var result = new Uint8Array(utf8.length);
  for (var i = 0; i < utf8.length; i++) {
    result[i] = utf8.charCodeAt(i);
  }
  return result;
}

export function plant(content, type, config) {
  var content = content;
  var urlPrefix = (config.serverPath || "//kroki.io/") + type + "/svg/";

  var data = textEncode(content);
  var compressed = deflate(data, { level: 9, to: "string" });
  var result = btoa(compressed)
    .replace(/\+/g, "-").replace(/\//g, "_");
  var svgUrl = urlPrefix + result;

  return `<object type="image/svg+xml" data="${svgUrl}" />`;
}

export function replace(content, config) {
  let dom = window.Docsify.dom;
  let $ = dom.create("span", content);

  if (!$.querySelectorAll) {
    return content;
  }

  for (const LANG of config?.langs) {
    let selector = `pre[data-lang="${LANG}"]`;
    (dom.findAll($, selector) || []).forEach(function (element) {
      var parent = element.parentNode;
      var planted = dom.create("p", plant(element.innerText, LANG, config));
      if (parent) {
        planted.dataset.lang = LANG;
        element.parentNode.replaceChild(planted, element);
      }
    });
  }

  return $.innerHTML;
}

export function install(hook, vm) {
  const config = Object.assign({}, {
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
  }, vm.config.kroki);
  hook.afterEach((content) => replace(content, config));
}
