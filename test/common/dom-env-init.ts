import { Window } from "npm:/happy-dom@15";
import { type Any, delay } from "../utils.ts";

export async function init() {
  const w = new Window();
  globalThis.document = w.document as Any;
  document.body.innerHTML = '<div class="container"></div>';
  await delay(10);
}

export async function tearDown() {
  await delay(10);
}
