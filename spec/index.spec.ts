import { assert, describe, expect, it, vi } from "vitest";
it("test init plugin", async function () {
  await import("../src/index");
  // @ts-ignore
  expect(window.$docsify.plugins)
    .toHaveLength(1);
});
