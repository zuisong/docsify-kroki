import { replace } from "../src/kroki";
import { expect, it } from "vitest";
import { DocsifyVM, Hooks } from "../src/types";
import { sleep } from "./utils";

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

  expect(res).toBe(
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
  await import("../src/index");

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

  expect(document.body?.innerHTML.trim()).toBe(
    '<p data-lang="plantuml"><object type="image/svg+xml" data="//kroki.io/plantuml/svg/eNrjciguSSwqKc3N4XJU0LVTcOJySM1LAXEBa80H2A=="></object></p>',
  );
});
