import { expect, it } from "vitest";

it("from external files", async () => {
  const imageSrc =
    `<img src="https://httpbin.org/base64/Z3JhcGggVEQKICBBWyBBbnlvbmUgXSAtLT58Q2FuIGhlbHAgfCBCKCBHbyB0byBnaXRodWIuY29tL3l1enV0ZWNoL2tyb2tpICkKICBCIC0tPiBDeyBIb3cgdG8gY29udHJpYnV0ZT8gfQogIEMgLS0-IERbIFJlcG9ydGluZyBidWdzIF0K"
  alt="kroki-mermaid">`;

  document.body.innerHTML = `${imageSrc}`;
  await import("../src/index");

  const hook = {
    afterEach: function (
      f: (body: Element, next: (str: string) => void) => void,
    ) {
      f(document.body.firstElementChild!!, (str) => {
        document.body.innerHTML = str;
      });
    },
  };
  const vm = { config: { kroki: {} } };

  // @ts-ignore
  window.$docsify.plugins.forEach((krokiPlugin) => {
    krokiPlugin(hook, vm);
  });

  // wait for fetch data
  await new Promise((res) => {
    setTimeout(res, 3000);
  });
  expect(document.body?.innerHTML.trim()).toBe(
    '<p data-lang="mermaid"><object type="image/svg+xml" data="//kroki.io/mermaid/svg/eNodjLsOgjAUhnee4h91QN5AAyXR2bgRBto0bYOe09TTGBTf3eL8XVyaosetr4B2QEsLk8WIuj6uaiJ4e49Y0e1wZgjDBfFZHww_miW_s1jjmznxHLAvh27roD648GuzDZOkoIt2wrdw9ef9gKuNnCSQg87uibH6ASlWKgI="></object></p>',
  );
});

it("from external files with a erroe", async () => {
  const imageSrc = `<img src="https://error-link.com"
  alt="kroki-mermaid">`;

  document.body.innerHTML = `${imageSrc}`;
  await import("../src/index");

  const hook = {
    afterEach: function (
      f: (body: Element, next: (str: string) => void) => void,
    ) {
      f(document.body.firstElementChild!!, (str) => {
        document.body.innerHTML = str;
      });
    },
  };
  const vm = { config: { kroki: {} } };

  // @ts-ignore
  window.$docsify.plugins.forEach((krokiPlugin) => {
    krokiPlugin(hook, vm);
  });

  // wait for fetch data
  await new Promise((res) => {
    setTimeout(res, 3000);
  });
});
