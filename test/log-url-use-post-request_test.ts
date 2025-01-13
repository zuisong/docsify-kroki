import { assertEquals } from "@std/assert";
import { afterEach, beforeEach, it } from "@std/testing/bdd";
import { fetchMock as fm } from "../deps.ts";
import { init } from "./common/dom-env-init.ts";
import { defaultHook, delay, generateRandomString } from "./utils.ts";

const fetchMock = fm.createInstance();

beforeEach(async () => {
  fetchMock.mockGlobal();
  await init();
});

afterEach(() => {
  fetchMock.removeRoutes();
  fetchMock.unmockGlobal();
});

it("from external files with a error", async () => {
  fetchMock.route("https://long-text.txt", generateRandomString(10_000));

  const krokiReturnBody = "kroki with long url";

  fetchMock.route("https://kroki.io/mermaid/svg/", krokiReturnBody);

  const imageSrc = `<img src="https://long-text.txt" alt="kroki-mermaid">`;

  document.body.innerHTML = imageSrc;
  await import("../src/index.ts");

  globalThis.$docsify?.plugins?.forEach((krokiPlugin) => {
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

  await delay(30);

  assertEquals(
    document.body.querySelector("object")?.getAttribute("data"),
    "data:image/svg+xml;base64,a3Jva2klMjB3aXRoJTIwbG9uZyUyMHVybA==",
  );
});
