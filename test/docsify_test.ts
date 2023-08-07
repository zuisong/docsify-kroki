import { afterEach, beforeEach, it } from "deno_std/testing/bdd.ts";
import { sleep } from "$/test/utils.ts";
import { init, tearDown } from "$/test/common/dom-env-init.ts";
import { replace } from "$/src/kroki.ts";
import { AsyncAfterEachHook, DocsifyVM, Hooks } from "$/src/types/docsify.ts";
import { assertEquals } from "deno_std/assert/assert_equals.ts";

beforeEach(() => {
  init();
});

afterEach(async () => {
  await tearDown();
});

const config = {
  langs: [
    "plantuml",
    "mermaid",
    "svgbob",
    "vega",
    "vegalite",
    "wavedrom",
    "nomnoml",
    "graphviz",
    "erd",
    "ditaa",
    "c4plantuml",
    "packetdiag",
    "nwdiag",
    "actdiag",
    "seqdiag",
    "bytefield",
    "bpmn",
    "blockdiag",
    "rackdiag",
  ],
  serverPath: "//kroki.io/",
};

it("render plantuml", async () => {
  const res = await replace(
    `
<pre data-lang="plantuml"><code class="lang-plantuml">
@startuml
A -> B
@enduml
</code></pre>
`.trim(),
    config,
  );

  assertEquals(
    res,
    '<p data-lang="plantuml"><object type="image/svg+xml" data="//kroki.io/plantuml/svg/eJziciguSSwqKc3N4XJU0LVTcOJySM1LAXEBAAAA__8DAGvNB9g="></object></p>',
  );
});

it("render plantuml 1", async () => {
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
  } as Hooks;
  const vm: DocsifyVM = { config: {} };

  window.$docsify?.plugins?.forEach((krokiPlugin) => {
    krokiPlugin(hook, vm);
  });

  // wait for fetch data
  await sleep(100);

  assertEquals(
    document.body?.innerHTML.trim(),
    '<p data-lang="plantuml"><object type="image/svg+xml" data="//kroki.io/plantuml/svg/eJziciguSSwqKc3N4XJU0LVTcOJySM1LAXEBAAAA__8DAGvNB9g="></object></p>',
  );
});
