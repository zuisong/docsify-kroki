import { init } from "./common/dom-env-init.ts";
import { assertEquals } from "jsr:@std/assert";
import { beforeEach, it } from "jsr:@std/testing/bdd";

beforeEach(async () => {
  await init();
});

it("test init plugin", async () => {
  await import("../src/index.ts");
  assertEquals(window.$docsify?.plugins?.length, 1);
});
