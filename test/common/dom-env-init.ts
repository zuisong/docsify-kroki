import { delay } from "deno_std/async/delay.ts";
import { GlobalRegistrator } from "npm:@happy-dom/global-registrator@10.5.1";

export async function init() {
  GlobalRegistrator.register();
  document.body.innerHTML = '<div class="container"></div>';
  globalThis.TextDecoder = undefined as Parameters<typeof alert>[0];
  await delay(1);
}

export async function tearDown() {
  await delay(1);
}
