import { delay } from "deno_std/async/delay.ts";
import { GlobalWindow } from "npm:happy-dom@9.20.3";

export async function init() {
  const win = new GlobalWindow();
  const doc = win.document;
  doc.body.innerHTML = '<div class="container"></div>';

  window.HTMLElement = win.HTMLElement as any;
  window.HTMLImageElement = win.HTMLImageElement as any;
  window.MutationObserver = win.MutationObserver as any;
  window.document = doc as unknown as Document;
  window.TextDecoder = undefined as any;
}

export async function tearDown() {
  let id = window.setTimeout(function () {}, 0);
  while (id--) {
    window.clearTimeout(id); // will do nothing if no timeout with id is present
  }
  await delay(500);
}
