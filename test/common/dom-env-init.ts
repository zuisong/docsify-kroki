import { DOMParser } from "jsr:@b-fuze/deno-dom";
import { type Any, delay } from "../utils.ts";

export async function init() {
  const doc = new DOMParser().parseFromString(
    `
    <h1>Hello World!</h1>
    <p>Hello from <a href="https://deno.land/">Deno!</a></p>
  `,
    "text/html",
  );

  globalThis.document = doc as Any;
  document.body.innerHTML = '<div class="container"></div>';
  await delay(10);
}

export async function tearDown() {
  await delay(10);
}
