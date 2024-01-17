import { GlobalRegistrator } from "../../deps.ts";
import { Any, delay } from "../utils.ts";

export async function init() {
  // deno-lint-ignore ban-ts-comment
  //@ts-ignore
  GlobalRegistrator.registered = null;
  GlobalRegistrator.register();
  document.body.innerHTML = '<div class="container"></div>';
  globalThis.TextDecoder = undefined as Any;
  await delay(1);
}

export async function tearDown() {
  await delay(1);
}
