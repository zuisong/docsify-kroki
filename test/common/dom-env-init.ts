import { delay } from "deno_std/async/delay.ts";
import { GlobalRegistrator } from "npm:@happy-dom/global-registrator@10.5.2";

export type Any = Parameters<typeof alert>[0];

export async function init() {
  // deno-lint-ignore ban-ts-comment
  //@ts-ignore
  GlobalRegistrator.registered = [];
  GlobalRegistrator.register();
  document.body.innerHTML = '<div class="container"></div>';
  globalThis.TextDecoder = undefined as Any;
  await delay(1);
}

export async function tearDown() {
  await delay(1);
}
