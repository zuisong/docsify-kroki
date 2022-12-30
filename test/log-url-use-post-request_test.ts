import * as asserts from "deno_std/testing/asserts.ts";
import { beforeEach, it } from "deno_std/testing/bdd.ts";
import { DocsifyVM, Hooks } from "../src/types.ts";
import { sleep } from "./utils.ts";
import { mockFetch, mockGet, mockPost } from "npm:vi-fetch";

import { generate } from "https://esm.sh/randomstring@1.2.3";

import "npm:vi-fetch/setup";
import { toBase64 } from "npm:js-base64";
import { init } from "./common/jdsom-env-init.ts";

beforeEach(() => {
  init();
  mockFetch.clearAll();
});

it("from external files with a error", async () => {
  mockGet("https://long-text.txt").willResolve(
    generate(10000),
  );

  const krokiReturnBody = "kroki with long url";

  mockPost("https://kroki.io/mermaid/svg/").willResolve(
    krokiReturnBody,
  );

  const imageSrc = `<img src="https://long-text.txt" alt="kroki-mermaid">`;

  document.body.innerHTML = `${imageSrc}`;
  await import("../src/index.ts");

  const vm: DocsifyVM = {
    config: { kroki: { serverPath: "https://kroki.io/" } },
  };

  window.$docsify.plugins?.forEach((krokiPlugin) => {
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
    `data:image/svg+xml;base64,${toBase64(krokiReturnBody)}`,
  );
});
