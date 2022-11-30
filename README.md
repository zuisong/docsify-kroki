# docsify-kroki

![npm](https://img.shields.io/npm/v/docsify-kroki)
![Codecov](https://img.shields.io/codecov/c/github/zuisong/docsify-kroki)
![GitHub branch checks state](https://img.shields.io/github/checks-status/zuisong/docsify-kroki/master)
![npm bundle size](https://img.shields.io/bundlephobia/min/docsify-kroki)
![npm bundle size(ziped)](https://img.shields.io/bundlephobia/minzip/docsify-kroki)
![GitHub top language](https://img.shields.io/github/languages/top/zuisong/docsify-kroki)
![GitHub last commit](https://img.shields.io/github/last-commit/zuisong/docsify-kroki)
![npm download count](https://img.shields.io/npm/dm/docsify-kroki)

## Install

1. Insert script into docsify document:

```html
<script src="//unpkg.com/docsify-kroki"></script>
```

## Usage

````markdown
#Demo

## embedding it directly

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

```plantuml
@startuml
Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response

Alice -> Bob: Another authentication Request
Alice <-- Bob: another authentication Response
@enduml
```

## load from external files

![kroki-excalidraw](./docs/excalidraw.json)
````

## Options

```html
<script>
window.$docsify = {
  // default
  kroki: {
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
      "pikchr",
      "excalidraw",
    ],
    // default
    serverPath: "//kroki.io/",
  },
}
</script>
```

### langs

By default, those markdown language render by kroki:
`plantuml`,`mermaid`,`svgbob`,`vega`,`vegalite`,`wavedrom`,`nomnoml`,`graphviz`,`erd`,`ditaa`,`c4plantuml`,`packetdiag`,`nwdiag`,`actdiag`,`seqdiag`,`bytefield`,`bpmn`,`blockdiag`,`rackdiag`,`pikchr`,`excalidraw`,
you can add more to langs array.

### serverPath

By default, the official Kroki server is used. If you have your own, configure
it using the `serverPath` option:

## Example

- [index.html](docs/index.html)
