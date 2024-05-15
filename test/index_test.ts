import { assertEquals } from "@std/assert";
import { beforeEach, it } from "@std/testing/bdd";
import { init } from "./common/dom-env-init.ts";

beforeEach(async () => {
  await init();
});

it("test init plugin", async () => {
  await import("../src/index.ts");
  assertEquals(window.$docsify?.plugins?.length, 1);
});
