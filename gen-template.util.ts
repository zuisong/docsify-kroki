import { defaultConfig } from "./src/kroki.ts";

const f = (lang: string) => `

### ${lang}

<details><summary>Source Code</summary>

[](langs/${lang}.md ':include :type=code md')

</details>

[](langs/${lang}.md ':include')

`;

const langs = defaultConfig.langs

const embeddingMarkDown = langs.map(f).join("---");

const readme = `
# Example

## Embedding code in markdown example

---

${embeddingMarkDown.trim()}

---

## Load diagrams from external files

### Excalidraw from external files

\`\`\`markdown
![kroki-excalidraw](./excalidraw.json)
\`\`\`

![kroki-excalidraw](./excalidraw.json)
`

Deno.writeTextFileSync("./docs/README.md",readme)