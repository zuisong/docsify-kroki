import { expect, it } from "vitest";
import { DocsifyVM, Hooks } from "../src/types";
import { sleep } from "./utils";

it("from external files", async () => {
  const imageSrc =
    `<img src="https://httpbin.org/base64/Z3JhcGggVEQKICBBWyBBbnlvbmUgXSAtLT58Q2FuIGhlbHAgfCBCKCBHbyB0byBnaXRodWIuY29tL3l1enV0ZWNoL2tyb2tpICkKICBCIC0tPiBDeyBIb3cgdG8gY29udHJpYnV0ZT8gfQogIEMgLS0-IERbIFJlcG9ydGluZyBidWdzIF0K"
  alt="kroki-mermaid">`;

  document.body.innerHTML = `${imageSrc}`;
  await import("../src/index");

  const hook: Hooks = {
    afterEach(f) {
      f(document.body.firstElementChild!!.outerHTML, (str) => {
        document.body.innerHTML = str;
      });
    },
  };
  const vm: DocsifyVM = { config: {} };

  window.$docsify.plugins?.forEach((krokiPlugin) => {
    krokiPlugin(hook, vm);
  });

  // wait for fetch data
  await sleep(2000);
  expect(document.body?.innerHTML.trim()).toBe(
    '<p data-lang="mermaid"><object type="image/svg+xml" data="//kroki.io/mermaid/svg/eNodjLsOgjAUhnee4h91QN5AAyXR2bgRBto0bYOe09TTGBTf3eL8XVyaosetr4B2QEsLk8WIuj6uaiJ4e49Y0e1wZgjDBfFZHww_miW_s1jjmznxHLAvh27roD648GuzDZOkoIt2wrdw9ef9gKuNnCSQg87uibH6ASlWKgI="></object></p>',
  );
});

it("from external files with a erroe", async () => {
  const imageSrc = `<img src="https://httpbin.errordomain/status/404"
  alt="kroki-mermaid">`;

  document.body.innerHTML = `${imageSrc}`;
  await import("../src/index");

  const vm: DocsifyVM = { config: {} };

  window.$docsify.plugins?.forEach((krokiPlugin) => {
    krokiPlugin({
      afterEach(param) {
        param(document.body.firstElementChild!!.outerHTML, (str) => {
          document.body.innerHTML = str;
        });
      },
    } as Hooks, vm);
  });

  // wait for fetch data
  await sleep(2000);
});
