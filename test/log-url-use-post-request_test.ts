import {} from "$/src/types/docsify-kroki.ts";
import { DocsifyVM, Hooks } from "$/src/types/docsify.ts";
import { init } from "$/test/common/dom-env-init.ts";
import { generateRandomString } from "$/test/common/randomstring.ts";
import { sleep } from "$/test/utils.ts";
import { fetchMock } from "$/test/deno_mock_fetch.ts";
import * as asserts from "$/test/common/asserts.ts";
import { afterEach, beforeEach, it } from "deno_std/testing/bdd.ts";

beforeEach(() => {
  init();
});

afterEach(() => {
  fetchMock.restore();
});

it("from external files with a error", async () => {
  fetchMock.mock(
    { url: "https://long-text.txt", method: "GET" },
    generateRandomString(10000),
  );

  const krokiReturnBody = "kroki with long url";

  fetchMock.mock(
    { url: "https://kroki.io/mermaid/svg/", method: "POST" },
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
