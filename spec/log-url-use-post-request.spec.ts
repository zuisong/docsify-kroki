import { beforeEach, expect, it } from "vitest";
import { sleep } from "./utils";
import { mockFetch, mockGet, mockPost } from "vi-fetch";
import { AsyncAfterEachHook, DocsifyVM, Hooks } from "../src/types/docsify";
import randomstring from "randomstring";

import "vi-fetch/setup";
import { urlSafeBase64Encode } from "../src/kroki";
beforeEach(() => {
  mockFetch.clearAll();
});

it("from external files with a erroe", async () => {
  mockGet("https://long-text.txt").willResolve(
    randomstring.generate(10000),
  );

  const krokiReturnBody = "kroki with long url";

  mockPost("https://kroki.io/mermaid/svg/").willResolve(
    krokiReturnBody,
  );

  const imageSrc = `<img src="https://long-text.txt" alt="kroki-mermaid">`;

  document.body.innerHTML = `${imageSrc}`;
  await import("../src/index");

  const vm: DocsifyVM = {
    config: { kroki: { serverPath: "https://kroki.io/" } },
  };

  window.$docsify?.plugins?.forEach((krokiPlugin) => {
    krokiPlugin({
      afterEach(param: AsyncAfterEachHook) {
        param(document.body.firstElementChild!!.outerHTML, (str) => {
          document.body.innerHTML = str;
        });
      },
    } as Hooks, vm);
  });

  await sleep(30);

  expect(document.body.querySelector("object")?.getAttribute("data")).eq(
    `data:image/svg+xml;base64,${urlSafeBase64Encode(krokiReturnBody)}`,
  );
});
