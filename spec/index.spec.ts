import { expect, it } from "vitest";

it("test init plugin", async function () {
  await import("../src/index");
  expect(window.$docsify.plugins)
    .toHaveLength(1);
});
