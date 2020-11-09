# docsify-kroki

## Install
1. Configure docsify-kroki (optional):

    ```html
    <script>
    window.$docsify = {
      kroki: {
        // default support plantuml and mermaid, kroki support more
        langs: ['plantuml','mermaid'],
      },
    }
    </script>
    ```
    
    See [Options](#Options) for more details.

2. Insert script into docsify document:

    ```html
    <script src="//unpkg.com/docsify-kroki"></script>
    ```


## Usage
Write your plantuml code into a code block marked ``plantuml`` or ``mermaid``:

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
By default, the official PlantUML server is used. If you have your own, configure it using the `serverPath` option:

```
<script>
window.$docsify = {
  kroki: {
    // default
    serverPath: '//kroki.io/',
  },
}
</script>
```

Please note that relative urls should start with `$`
````markdown
```plantuml
@startuml
Alice -> Bob: Authentication Request [[$./other-file docs]]
Bob --> Alice: Authentication Response [[$../other-file docs]]
@enduml
```
````

## Example
### Basic Usage
- [index.html](example/index.html)
