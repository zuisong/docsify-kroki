import { afterEach, beforeEach, it } from "deno_std/testing/bdd.ts";
import { init, tearDown } from "./common/dom-env-init.ts";
import { type Any, sleep } from "./utils.ts";
import { assertEquals } from "deno_std/assert/assert_equals.ts";

beforeEach(() => {
  init();
});

afterEach(async () => {
  await tearDown();
});

it("render plantuml use CompresseStream", async () => {
  globalThis.CompressionStream = undefined as Any;
  document.body.innerHTML = `
<pre data-lang="plantuml"><code class="lang-plantuml">
@startuml
A -> B
@enduml
</code></pre>
`;
  await import("../src/index.ts");

  window.$docsify?.plugins?.forEach((krokiPlugin) => {
    krokiPlugin({
      afterEach(f) {
        f(document.body.firstElementChild!.outerHTML, (str) => {
          console.log(str);
          document.body.innerHTML = str;
        });
      },
    }, {});
  });

  // wait for fetch data
  await sleep(100);

  assertEquals(
    document.body?.innerHTML.trim(),
    '<p data-lang="plantuml"><object type="image/svg+xml" data="//kroki.io/plantuml/svg/eNrjciguSSwqKc3N4XJU0LVTcOJySM1LAXEBa80H2A=="></object></p>',
  );
});
