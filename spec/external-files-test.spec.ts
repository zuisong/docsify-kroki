import { beforeEach, expect, it } from "vitest";
import { sleep } from "./utils";
import { mockFetch, mockGet } from "vi-fetch";
import "vi-fetch/setup";
beforeEach(() => {
  mockFetch.clearAll();
});

it("from external files", async () => {
  const mock = mockGet("https://api.com/v1/apples").willResolve(`graph TD
  A[ Anyone ] -->|Can help | B( Go to github.com/yuzutech/kroki )
  B --> C{ How to contribute? }
  C --> D[ Reporting bugs ]
`);

  const imageSrc = `<img src="https://api.com/v1/apples" alt="kroki-mermaid">`;

  document.body.innerHTML = `${imageSrc}`;
  await import("../src/index");

  const hooks: Hooks = {
    afterEach(afterEachHook) {
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
  expect(document.body?.innerHTML.trim()).toBe(
    '<p data-lang="mermaid"><object type="image/svg+xml" data="//kroki.io/mermaid/svg/eNodjLsOgjAUhnee4h91QN5AAyXR2bgRBto0bYOe09TTGBTf3eL8XVyaosetr4B2QEsLk8WIuj6uaiJ4e49Y0e1wZgjDBfFZHww_miW_s1jjmznxHLAvh27roD648GuzDZOkoIt2wrdw9ef9gKuNnCSQg87uibH6ASlWKgI="></object></p>',
  );
});

it("from external files with a error", async () => {
  const mock = mockGet("https://httpbin.errordomain/status/404").willThrow(
    "from external files with a error link",
  );

  const imageSrc = `<img src="https://httpbin.errordomain/status/404"
  alt="kroki-mermaid">`;

  document.body.innerHTML = `${imageSrc}`;
  await import("../src/index");

  const vm: DocsifyVM = { config: {} };

  window.$docsify.plugins?.forEach((krokiPlugin) => {
    krokiPlugin({
      afterEach(afterEachHook) {
        afterEachHook(document.body.firstElementChild!!.outerHTML, (str) => {
          document.body.innerHTML = str;
        });
      },
    } as Hooks, vm);
  });

  await sleep(30);
});
