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

it("render plantuml", function () {
  let res = replace(
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
    '<p data-lang="plantuml"><object type="image/svg+xml" data="//kroki.io/plantuml/svg/eNpzKC5JLCopzc3hclTQtVNw4nJIzUsBcgFi-gfE"></object></p>',
  );
});

it("render plantuml", async function () {
  document.body.innerHTML = `
<pre data-lang="plantuml"><code class="lang-plantuml">
@startuml
A -> B
@enduml
</code></pre>
`;
  await import("../src/index");

  const hook = {
    afterEach: function (f: (body: Element) => string) {
      const rederd = f(document.body.firstElementChild!!);
      document.body.innerHTML = rederd;
    },
  };
  const vm = { config: { kroki: {} } };

  // @ts-ignore
  window.$docsify.plugins.forEach((krokiPlugin) => {
    krokiPlugin(hook, vm);
  });
  expect(document.body?.innerHTML.trim()).toBe(
    '<p data-lang="plantuml"><object type="image/svg+xml" data="//kroki.io/plantuml/svg/eNpzKC5JLCopzc3hclTQtVNw4nJIzUsBcgFi-gfE"></object></p>',
  );
});

it("install test", async () => {
  const kroki = await import("../src/kroki");
  const hook = { afterEach: vi.fn() };
  const vm = { config: { kroki: {} } };

  kroki.install(hook, vm);

  expect(hook.afterEach).toBeCalledTimes(1);
});
