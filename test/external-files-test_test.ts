import * as asserts from "$/test/common/asserts.ts";
import { afterEach, beforeEach, it } from "deno_std/testing/bdd.ts";
import { sleep } from "$/test/utils.ts";

import { fetchMock } from "$/test/deno_mock_fetch.ts";

import { init } from "$/test/common/dom-env-init.ts";
import type { DocsifyVM, Hooks } from "$/src/types/docsify.ts";

beforeEach(() => {
  init();
});

afterEach(() => {
  fetchMock.restore();
});

it("from external files", async () => {
  fetchMock.mock({ method: "GET", url: "https://api.com/v1/apples" }, {
    body: `graph TD
  A[ Anyone ] -->|Can help | B( Go to github.com/yuzutech/kroki )
  B --> C{ How to contribute? }
  C --> D[ Reporting bugs ]
`,
    status: 200,
  });

  const imageSrc = `<img src="https://api.com/v1/apples" alt="kroki-mermaid">`;

  document.body.innerHTML = `${imageSrc}`;
  await import("$/src/index.ts");

  const hooks: Hooks = {
    afterEach(afterEachHook) {
      afterEachHook(document.body.firstElementChild!.outerHTML, (str) => {
        document.body.innerHTML = str;
      });
    },
  };
  const vm: DocsifyVM = { config: {} };

  window.$docsify?.plugins?.forEach((krokiPlugin) => {
    krokiPlugin(hooks, vm);
  });
  await sleep(50);

  // wait for fetch data
  asserts.assertEquals(
    document.body?.innerHTML.trim(),
    '<p data-lang="mermaid"><object type="image/svg+xml" data="//kroki.io/mermaid/svg/eJwcjLsOgjAUhnee4h91QN5AAyXR2bgRBto0bYOe09TTGBTf3eL8XVyaosetr4B2QEsLk8WIuj6uaiJ4e49Y0e1wZgjDBfFZHww_miW_s1jjmznxHLAvh27roD648GuzDZOkoIt2wrdw9ef9gKuNnCSQg87uibH6AQAA__8DAClWKgI="></object></p>',
  );
});

it("from external files with a error", async () => {
  fetchMock.mock({
    url: "https://httpbin.errordomain/status/404",
    method: "GET",
  }, () => Promise.reject(new Error("from external files with a error link")));

  const imageSrc = `<img src="https://httpbin.errordomain/status/404"
  alt="kroki-mermaid">`;

  document.body.innerHTML = `${imageSrc}`;
  await import("$/src/index.ts");

  const vm: DocsifyVM = { config: {} };

  window.$docsify?.plugins?.forEach((krokiPlugin) => {
    krokiPlugin({
      afterEach(afterEachHook) {
        afterEachHook(document.body.firstElementChild!.outerHTML, (str) => {
          document.body.innerHTML = str;
        });
      },
    } as Hooks, vm);
  });

  await sleep(30);
});
