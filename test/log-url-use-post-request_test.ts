import { assertEquals } from "deno_std/assert/assert_equals.ts";
import { afterEach, beforeEach, it } from "deno_std/testing/bdd.ts";
import { fetchMock } from "../deps.ts";
import { init } from "./common/dom-env-init.ts";
import { defaultHook, generateRandomString, sleep } from "./utils.ts";

beforeEach(() => {
  init();
});

afterEach(() => {
  fetchMock.restore();
});

it("from external files with a error", async () => {
  fetchMock.mock("https://long-text.txt", generateRandomString(10_000));

  const krokiReturnBody = "kroki with long url";

  fetchMock.mock("https://kroki.io/mermaid/svg/", krokiReturnBody);

  const imageSrc = `<img src="https://long-text.txt" alt="kroki-mermaid">`;

  document.body.innerHTML = imageSrc;
  await import("../src/index.ts");

  window.$docsify?.plugins?.forEach((krokiPlugin) => {
    krokiPlugin(
      {
        ...defaultHook,
        afterEach(param) {
          param(document.body.firstElementChild?.outerHTML || "", (str) => {
            document.body.innerHTML = str;
          });
        },
      },
      {
        config: { kroki: { serverPath: "https://kroki.io/" } },
      },
    );
  });

  await sleep(30);

  assertEquals(
    document.body.querySelector("object")?.getAttribute("data"),
    "data:image/svg+xml;base64,a3Jva2klMjB3aXRoJTIwbG9uZyUyMHVybA==",
  );
});
