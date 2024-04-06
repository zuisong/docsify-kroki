import { assertEquals } from "jsr:@std/assert";
import { afterEach, beforeEach, it } from "jsr:@std/testing/bdd";
import { fetchMock } from "../deps.ts";
import { defaultConfig, replace } from "../src/kroki.ts";
import { init } from "./common/dom-env-init.ts";
import { defaultHook, delay } from "./utils.ts";

beforeEach(async () => {
  await init();
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
    krokiPlugin(
      {
        ...defaultHook,
        afterEach(afterEachHook) {
          afterEachHook(
            document.body.firstElementChild?.outerHTML || "",
            (str) => {
              document.body.innerHTML = str;
            },
          );
        },
      },
      { config: {} },
    );
  });
  await delay(50);

  // wait for fetch data
  assertEquals(
    document.body?.innerHTML.trim(),
    `
<p data-lang="mermaid" style="max-width: inherit;"><object type="image/svg+xml" style="max-width: 100%;" data="//kroki.io/mermaid/svg/eNodjLsOgjAUhnee4h91QN5AAyXR2bgRBto0bYOe09TTGBTf3eL8XVyaosetr4B2QEsLk8WIuj6uaiJ4e49Y0e1wZgjDBfFZHww_miW_s1jjmznxHLAvh27roD648GuzDZOkoIt2wrdw9ef9gKuNnCSQg87uibH6ASlWKgI="></object></p>
  `.trim(),
  );
});

it("from external files with a error", async () => {
  fetchMock.mock(
    "https://httpbin.errordomain/status/404",
    () => Promise.reject(new Error("from external files with a error link")),
  );

  const imageSrc =
    `<img src="https://httpbin.errordomain/status/404" alt="kroki-mermaid">`;
  await replace(imageSrc, defaultConfig);
  await delay(30);
});

it("from external files empty link", async () => {
  const imageSrc = `<img src="" alt="kroki-mermaid">`;
  await replace(imageSrc, defaultConfig);
  await delay(30);
});
