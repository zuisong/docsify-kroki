import { type Any, delay } from "../utils.ts";

import { parseHTML } from "esm.sh/linkedom?bundle";
export async function init() {
  const { document } = parseHTML('<div class="container"></div>');

  globalThis.document = document;
  await delay(1);
}

export async function tearDown() {
  await delay(100);
}
