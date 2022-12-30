import * as asserts from "deno_std/testing/asserts.ts";
import { beforeEach, it } from "deno_std/testing/bdd.ts";
import { DocsifyVM, Hooks } from "../src/types.ts";
import { sleep } from "./utils.ts";
import { mockFetch, mockGet } from "npm:vi-fetch";

import "npm:vi-fetch/setup";
import { init } from "./common/jdsom-env-init.ts";

beforeEach(() => {
  init();
  mockFetch.clearAll();
});

it("from external files", async () => {
  mockGet("https://api.com/v1/apples").willResolve(`graph TD
  A[ Anyone ] -->|Can help | B( Go to github.com/yuzutech/kroki )
  B --> C{ How to contribute? }
  C --> D[ Reporting bugs ]
`);

  const imageSrc = `<img src="https://api.com/v1/apples" alt="kroki-mermaid">`;

  document.body.innerHTML = `${imageSrc}`;
  await import("../src/index.ts");

  const hooks: Hooks = {
    afterEach(afterEachHook) {
      // deno-lint-ignore no-extra-non-null-assertion
      afterEachHook(document.body.firstElementChild!!.outerHTML, (str) => {
        document.body.innerHTML = str;
      });
    },
  };
  const vm: DocsifyVM = { config: {} };

  window.$docsify.plugins?.forEach((krokiPlugin) => {
    krokiPlugin(hooks, vm);
  });
  await sleep(50);

  // wait for fetch data
  asserts.assertEquals(
    document.body?.innerHTML.trim(),
    '<p data-lang="mermaid"><object type="image/svg+xml" data="//kroki.io/mermaid/svg/eNodjLsOgjAUhnee4h91QN5AAyXR2bgRBto0bYOe09TTGBTf3eL8XVyaosetr4B2QEsLk8WIuj6uaiJ4e49Y0e1wZgjDBfFZHww_miW_s1jjmznxHLAvh27roD648GuzDZOkoIt2wrdw9ef9gKuNnCSQg87uibH6ASlWKgI="></object></p>',
  );
});

it("from external files with a error", async () => {
  mockGet("https://httpbin.errordomain/status/404").willThrow(
    "from external files with a error link",
  );

  const imageSrc = `<img src="https://httpbin.errordomain/status/404"
  alt="kroki-mermaid">`;

  document.body.innerHTML = `${imageSrc}`;
  await import("../src/index.ts");

  const vm: DocsifyVM = { config: {} };

  window.$docsify.plugins?.forEach((krokiPlugin) => {
    krokiPlugin({
      afterEach(afterEachHook) {
        // deno-lint-ignore no-extra-non-null-assertion
        afterEachHook(document.body.firstElementChild!!.outerHTML, (str) => {
          document.body.innerHTML = str;
        });
      },
    } as Hooks, vm);
  });

  await sleep(30);
});
