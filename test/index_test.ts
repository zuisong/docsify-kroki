import { beforeEach, it } from "deno_std/testing/bdd.ts";
import * as asserts from "deno_std/assert/mod.ts";
import { init } from "$/test/common/dom-env-init.ts";

beforeEach(() => {
  init();
});

it("test init plugin", async function () {
  await import("$/src/index.ts");
  asserts.assertEquals(window.$docsify?.plugins?.length, 1);
});
