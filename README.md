# docsify-kroki

## Install

1. Insert script into docsify document:

```html
    <script src="//unpkg.com/docsify-kroki"></script>
```

## Usage

````markdown
### Section X
```plantuml
@startuml
Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response

Alice -> Bob: Another authentication Request
Alice <-- Bob: another authentication Response
@enduml
```
````

````markdown
### Section X
```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
````

## Options

## serverPath

By default, the official Kroki server is used. If you have your own, configure it using the `serverPath` option:

```html
<script>
window.$docsify = {
  kroki: {
    // default
    serverPath: '//kroki.io/',
  },
}
</script>
```

## Example

- [index.html](docs/index.html)
