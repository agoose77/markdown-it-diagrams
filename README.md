# markdown-it-diagrams
Diagrams renderer for [markdown-it](https://github.com/markdown-it/markdown-it), using [svgbob](https://github.com/ivanceras/svgbob), and [mermaidjs](https://github.com/knsv/mermaid).

Example code

An example svgbob diagram:
~~~
``` bob 
     .---.
    /-o-/--
 .-/ / /->
( *  \/
 '-.  \
    \ /
     '
```
~~~
And a mermaid diagram:
~~~
``` mermaid 
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
~~~

## API
The `svgbob-wasm` dependency which provides svgbob support is a wasm module. In order to load the dependency asynchronously, this plugin exposes an async function `awaitRenderAvailable` which should be awaited prior to markdown rendering:
```typescript
import {awaitRenderAvailable} from "markdown-it-diagrams"
import {diagramPlugin} from "markdown-it-diagrams";
import * as MarkdownIt from "markdown-it";


let md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  langPrefix: `cm-s-${CodeMirrorEditor.defaultConfig.theme} language-`,
  highlight: highlightCode
}).use(diagramPlugin);

let someMarkdown = "``` bob \n" +
        "     .---.\n" +
        "    /-o-/--\n" +
        " .-/ / /->\n" +
        "( *  \\/\n" +
        " '-.  \\\n" +
        "    \\ /\n" +
        "     '\n" +
        "```";
await awaitRenderAvailable();
let html = md.render(someMarkdown);
console.log(html);
```
