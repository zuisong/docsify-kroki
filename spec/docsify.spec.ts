import { replace } from "../src/kroki";
import { assert, describe, expect, it, vi } from "vitest";
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
    afterEach: function (
      f: (body: Element, next: (str: string) => void) => void,
    ) {
      f(document.body.firstElementChild!!, (str) => {
        console.log(str);
        document.body.innerHTML = str;
      });
    },
  };
  const vm = { config: { kroki: {} } };

  // @ts-ignore
  window.$docsify.plugins.forEach((krokiPlugin) => {
    krokiPlugin(hook, vm);
  });

  await new Promise((res) => {
    setTimeout(res, 100);
  });

  expect(document.body?.innerHTML.trim()).toBe(
    '<p data-lang="plantuml"><object type="image/svg+xml" data="//kroki.io/plantuml/svg/eNrjciguSSwqKc3N4XJU0LVTcOJySM1LAXEBa80H2A=="></object></p>',
  );
});

// it("install test", async () => {
//   const kroki = await import("../src/kroki");
//   const  next =  vi.fn()
//   const hook = { afterEach:next };
//   const vm = { config: { kroki: {} } };

//   kroki.install(hook, vm);

//   expect(hook.afterEach).toBeCalledTimes(1);
// });
