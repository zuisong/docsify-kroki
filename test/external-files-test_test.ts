import { afterEach, beforeEach, it } from "deno_std/testing/bdd.ts";
import { assertEquals } from "deno_std/assert/assert_equals.ts";
import { fetchMock } from "../deps.ts";
import { init } from "./common/dom-env-init.ts";
import { sleep } from "./utils.ts";

beforeEach(() => {
  init();
});

afterEach(() => {
  fetchMock.restore();
});

it("from external files", async () => {
  fetchMock.mock(
    "https://api.com/v1/apples",
    `graph TD
  A[ Anyone ] -->|Can help | B( Go to github.com/yuzutech/kroki )
  B --> C{ How to contribute? }
  C --> D[ Reporting bugs ]
`,
  );

  const imageSrc = `<img src="https://api.com/v1/apples" alt="kroki-mermaid">`;

  document.body.innerHTML = `${imageSrc}`;
  await import("../src/index.ts");

  window.$docsify?.plugins?.forEach((krokiPlugin) => {
    krokiPlugin({
      afterEach(afterEachHook) {
        afterEachHook(document.body.firstElementChild!.outerHTML, (str) => {
          document.body.innerHTML = str;
        });
      },
    }, { config: {} });
  });
  await sleep(50);

  // wait for fetch data
  assertEquals(
    document.body?.innerHTML.trim(),
    '<p data-lang="mermaid"><object type="image/svg+xml" data="//kroki.io/mermaid/svg/eNodjLsOgjAUhnee4h91QN5AAyXR2bgRBto0bYOe09TTGBTf3eL8XVyaosetr4B2QEsLk8WIuj6uaiJ4e49Y0e1wZgjDBfFZHww_miW_s1jjmznxHLAvh27roD648GuzDZOkoIt2wrdw9ef9gKuNnCSQg87uibH6ASlWKgI="></object></p>',
  );
});

it("from external files with a error", async () => {
  fetchMock.mock(
    "https://httpbin.errordomain/status/404",
    () => Promise.reject(new Error("from external files with a error link")),
  );

  const imageSrc =
    `<img src="https://httpbin.errordomain/status/404" alt="kroki-mermaid">`;

  document.body.innerHTML = `${imageSrc}`;
  await import("../src/index.ts");

  window.$docsify?.plugins?.forEach((krokiPlugin) => {
    krokiPlugin(
      {
        afterEach(afterEachHook) {
          afterEachHook(document.body.firstElementChild!.outerHTML, (str) => {
            document.body.innerHTML = str;
          });
        },
      },
      {},
    );
  });

  await sleep(30);
});
