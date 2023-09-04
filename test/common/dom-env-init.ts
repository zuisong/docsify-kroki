import { delay } from "deno_std/async/delay.ts";
import { GlobalRegistrator } from "../../deps.ts";
import { Any } from "../utils.ts";

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
