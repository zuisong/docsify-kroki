# docsify-kroki

[![npm](https://img.shields.io/npm/v/docsify-kroki)](https://www.npmjs.com/package/docsify-kroki)
[![codecov](https://codecov.io/gh/zuisong/docsify-kroki/branch/main/graph/badge.svg?token=WGS18HO5N6)](https://codecov.io/gh/zuisong/docsify-kroki)
![GitHub branch checks state](https://img.shields.io/github/checks-status/zuisong/docsify-kroki/main)
[![npm bundle size](https://img.shields.io/bundlephobia/min/docsify-kroki)](https://bundlephobia.com/package/docsify-kroki)
[![npm bundle size(ziped)](https://img.shields.io/bundlephobia/minzip/docsify-kroki)](https://bundlephobia.com/package/docsify-kroki)
![GitHub top language](https://img.shields.io/github/languages/top/zuisong/docsify-kroki)
[![GitHub last commit](https://img.shields.io/github/last-commit/zuisong/docsify-kroki)](https://github.com/zuisong/docsify-kroki/commits/main)
[![npm download count](https://img.shields.io/npm/dm/docsify-kroki)](https://npmtrends.com/docsify-kroki)

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
      "actdiag",
      "blockdiag",
      "bpmn",
      "bytefield",
      "c4plantuml",
      "d2",
      "dbml",
      "ditaa",
      "erd",
      "excalidraw",
      "graphviz",
      "mermaid",
      "nomnoml",
      "nwdiag",
      "packetdiag",
      "pikchr",
      "plantuml",
      "rackdiag",
      "seqdiag",
      "structurizr",
      "svgbob",
      "symbolator",
      "tikz",
      "vega",
      "vegalite",
      "wavedrom",
      "wireviz",
    ],
    // default
    serverPath: "//kroki.io/",
  },
}
</script>
```

### langs

By default, those markdown language render by kroki:

|            |              |            |             |               |
| ---------- | ------------ | ---------- | ----------- | ------------- |
| `actdiag`  | `blockdiag`  | `bpmn`     | `bytefield` | `c4plantuml`  |
| `d2`       | `dbml`       | `ditaa`    | `erd`       | `excalidraw`  |
| `graphviz` | `mermaid`    | `nomnoml`  | `nwdiag`    | `packetdiag`  |
| `pikchr`   | `plantuml`   | `rackdiag` | `seqdiag`   | `structurizr` |
| `svgbob`   | `symbolator` | `tikz`     | `vega`      | `vegalite`    |
| `wavedrom` | `wireviz`    |            |             |               |

you can add more to langs array.

### serverPath

By default, the official Kroki server is used. If you have your own, configure
it using the `serverPath` option:

## Example

- [index.html](docs/index.html)
