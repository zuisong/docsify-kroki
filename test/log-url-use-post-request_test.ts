import {} from "$/src/types/docsify-kroki.ts";
import { DocsifyVM, Hooks } from "$/src/types/docsify.ts";
import { init } from "$/test/common/dom-env-init.ts";
import { generateRandomString, sleep } from "$/test/utils.ts";
import * as asserts from "$/test/common/asserts.ts";
import { afterEach, beforeEach, it } from "deno_std/testing/bdd.ts";
import { fetchMock } from "$/deps.ts";

beforeEach(() => {
  init();
});

afterEach(() => {
  fetchMock.restore();
});

it("from external files with a error", async () => {
  fetchMock.mock(
    "https://long-text.txt",
    generateRandomString(10000),
  );

  const krokiReturnBody = "kroki with long url";

  fetchMock.mock(
    "https://kroki.io/mermaid/svg/",
    krokiReturnBody,
  );

  const imageSrc = `<img src="https://long-text.txt" alt="kroki-mermaid">`;

  document.body.innerHTML = `${imageSrc}`;
  await import("$/src/index.ts");

  const vm: DocsifyVM = {
    config: { kroki: { serverPath: "https://kroki.io/" } },
  };

  window.$docsify?.plugins?.forEach((krokiPlugin) => {
    krokiPlugin({
      afterEach(param) {
        param(document.body.firstElementChild!.outerHTML, (str) => {
          document.body.innerHTML = str;
        });
      },
    } as Hooks, vm);
  });

  await sleep(30);

  asserts.assertEquals(
    document.body.querySelector("object")?.getAttribute("data"),
    `data:image/svg+xml;base64,a3Jva2klMjB3aXRoJTIwbG9uZyUyMHVybA==`,
  );
});
