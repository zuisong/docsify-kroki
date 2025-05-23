import { assertEquals } from "@std/assert";
import { afterEach, beforeEach, it } from "@std/testing/bdd";
import { replace } from "../src/kroki.ts";
import { init, tearDown } from "./common/dom-env-init.ts";
import { defaultHook, delay } from "./utils.ts";

beforeEach(async () => {
  await init();
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
    res.trim(),
    `
<p data-lang="plantuml" style="max-width: inherit;"><object type="image/svg+xml" style="max-width: 100%;" data="//kroki.io/plantuml/svg/eNrjciguSSwqKc3N4XJU0LVTcOJySM1LAXEBa80H2A=="></object></p>
    `.trim(),
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
  await import("../src/index.ts");

  globalThis.$docsify?.plugins?.forEach((krokiPlugin) => {
    krokiPlugin(
      {
        ...defaultHook,
        afterEach(f) {
          f(document.body.firstElementChild?.outerHTML || "", (str) => {
            document.body.innerHTML = str;
          });
        },
      },
      {},
    );
  });

  // wait for fetch data
  await delay(100);

  assertEquals(
    document.body?.innerHTML.trim(),
    `
<p data-lang="plantuml" style="max-width: inherit;"><object type="image/svg+xml" style="max-width: 100%;" data="//kroki.io/plantuml/svg/eNrjciguSSwqKc3N4XJU0LVTcOJySM1LAXEBa80H2A=="></object></p>
    `.trim(),
  );
});
