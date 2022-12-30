import { beforeEach, it } from "deno_std/testing/bdd.ts";
import { DocsifyVM, Hooks } from "../src/types.ts";
import { sleep } from "./utils.ts";
import * as asserts from "deno_std/testing/asserts.ts";
import "npm:vi-fetch/setup";
import { init } from "./common/jdsom-env-init.ts";
import { replace } from "../src/kroki.ts";

beforeEach(() => {
  init();
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

it("render plantuml", async function () {
  let res = await replace(
    `
<pre data-lang="plantuml"><code class="lang-plantuml">
@startuml
A -> B
@enduml
</code></pre>
`.trim(),
    config,
  );

  asserts.assertEquals(
    res,
    '<p data-lang="plantuml"><object type="image/svg+xml" data="//kroki.io/plantuml/svg/eNrjciguSSwqKc3N4XJU0LVTcOJySM1LAXEBa80H2A=="></object></p>',
  );
});

it("render plantuml 1", async function () {
  document.body.innerHTML = `
<pre data-lang="plantuml"><code class="lang-plantuml">
@startuml
A -> B
@enduml
</code></pre>
`;
  await import("../src/index.ts");

  const hook = {
    afterEach(f) {
      f(document.body.firstElementChild!!.outerHTML, (str) => {
        console.log(str);
        document.body.innerHTML = str;
      });
    },
  } as Hooks;
  const vm: DocsifyVM = { config: {} };

  window.$docsify.plugins?.forEach((krokiPlugin) => {
    krokiPlugin(hook, vm);
  });

  // wait for fetch data
  await sleep(100);

  asserts.assertEquals(
    document.body?.innerHTML.trim(),
    '<p data-lang="plantuml"><object type="image/svg+xml" data="//kroki.io/plantuml/svg/eNrjciguSSwqKc3N4XJU0LVTcOJySM1LAXEBa80H2A=="></object></p>',
  );
});
