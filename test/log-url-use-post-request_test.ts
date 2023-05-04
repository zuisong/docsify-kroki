import {} from "$/src/types/docsify-kroki.ts";
import { DocsifyVM, Hooks } from "$/src/types/docsify.ts";
import { init } from "$/test/common/dom-env-init.ts";
import { generate } from "$/test/deps/randomstring.ts";
import { sleep } from "$/test/utils.ts";
import { MockFetch } from "deno_mock_fetch";
import * as asserts from "deno_std/testing/asserts.ts";
import { afterEach, beforeEach, it } from "deno_std/testing/bdd.ts";

let mockFetch: MockFetch;

beforeEach(() => {
  init();
  mockFetch = new MockFetch();
});

afterEach(() => {
  mockFetch.close();
});

it("from external files with a error", async () => {
  mockFetch.intercept("https://long-text.txt", { method: "GET" }).response(
    generate(10000),
  );

  const krokiReturnBody = "kroki with long url";

  mockFetch.intercept("https://kroki.io/mermaid/svg/", { method: "POST" })
    .response(
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
        param(document.body.firstElementChild!!.outerHTML, (str) => {
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
