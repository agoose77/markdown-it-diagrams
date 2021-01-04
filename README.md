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
The `svgbob-wasm` dependency which provides svgbob support is a wasm module. 
In order to load the dependency asynchronously, this plugin exposes an async function `loadPluginFactory`
which should be awaited to provide the plugin factory:
```typescript
import {loadPluginFactory} from "markdown-it-diagrams";
import * as MarkdownIt from "markdown-it";

loadPluginFactory().then((plugin) => {
    let md = new MarkdownIt({
      html: true,
    }).use(plugin);
    
    let someMarkdown = "``` bob \n" +
            "     .---.\n" +
            "    /-o-/--\n" +
            " .-/ / /->\n" +
            "( *  \\/\n" +
            " '-.  \\\n" +
            "    \\ /\n" +
            "     '\n" +
            "```";
    let html = md.render(someMarkdown);
    console.log(html);
})
```
