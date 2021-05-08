import { replace } from "../src/kroki";

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

describe("docsify kroki test", function () {
  it("render plantuml", function () {
    let res = replace(
      `
<pre data-lang="plantuml"><code class="lang-plantuml">
@startuml
A -> B
@enduml
</code></pre>
`.trim(),
      config
    );

    expect(res).toBe('<p data-lang="plantuml"><object type="image/svg+xml" data="//kroki.io/plantuml/svg/eNpzKC5JLCopzc3hclTQtVNw4nJIzUsBcgFi-gfE"></object></p>')
  });
});
