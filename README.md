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
As a wasm module, the svgbob renderer exposes an async function `awaitRenderAvailable` which should be used to wait for the svgbob module to be loaded prior to markdown rendering.
