import { delay } from "deno_std/async/delay.ts";
import { GlobalRegistrator } from "npm:@happy-dom/global-registrator@10";

export async function init() {
  GlobalRegistrator.register();
  document.body.innerHTML = '<div class="container"></div>';
  window.TextDecoder = undefined as any;
}

export async function tearDown() {
  await delay(1);
}
