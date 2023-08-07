import { beforeEach, it } from "deno_std/testing/bdd.ts";
import { init } from "$/test/common/dom-env-init.ts";
import { assertEquals } from "deno_std/assert/assert_equals.ts";

beforeEach(() => {
  init();
});

it("test init plugin", async function () {
  await import("$/src/index.ts");
  assertEquals(window.$docsify?.plugins?.length, 1);
});
