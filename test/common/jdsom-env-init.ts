// @deno-types="npm:@types/jsdom"
import { JSDOM } from "jsdom";

export function init() {
  const doc = new JSDOM("");
  const win = doc.window;

  window.document = win.document;
  window.TextDecoder = undefined as any;
  window.HTMLElement = win.HTMLElement;
  window.HTMLImageElement = win.HTMLImageElement;
  window.XPathEvaluator = win.XPathEvaluator;
  window.XPathResult = win.XPathResult;
  window.MutationObserver = win.MutationObserver;
}
