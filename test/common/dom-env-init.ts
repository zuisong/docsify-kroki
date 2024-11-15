import { Window } from "../../deps.ts";
import { type Any, delay } from "../utils.ts";
export async function init() {
  const w: Window = new Window({});
  globalThis.document = w.document as Any;
  document.body.innerHTML = '<div class="container"></div>';
  globalThis.TextDecoder = undefined as Any;
  await delay(1);
}

export async function tearDown() {
  await delay(100);
}
