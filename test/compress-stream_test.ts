import { afterEach, beforeEach, it } from "deno_std/testing/bdd.ts";
import * as asserts from "deno_std/assert/mod.ts";
import { Any, init, tearDown } from "$/test/common/dom-env-init.ts";
import { AsyncAfterEachHook, DocsifyVM, Hooks } from "$/src/types/docsify.ts";
import { sleep } from "$/test/utils.ts";

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
  await import("$/src/index.ts");

  const hook = {
    afterEach(f: AsyncAfterEachHook) {
      f(document.body.firstElementChild!.outerHTML, (str) => {
        console.log(str);
        document.body.innerHTML = str;
      });
    },
  } satisfies Hooks;
  const vm: DocsifyVM = { config: {} };

  window.$docsify?.plugins?.forEach((krokiPlugin) => {
    krokiPlugin(hook, vm);
  });

  // wait for fetch data
  await sleep(100);

  asserts.assertEquals(
    document.body?.innerHTML.trim(),
    '<p data-lang="plantuml"><object type="image/svg+xml" data="//kroki.io/plantuml/svg/eJzjciguSSwqKc3N4XJU0LVTcOJySM1LAXEBa80H2A=="></object></p>',
  );
});
