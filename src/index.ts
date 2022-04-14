import MarkdownIt from "markdown-it";
import * as Mermaid from "mermaid";


// Define interface to await readiness of import
export async function loadPluginFactory() {
    const svgbob = await import("svgbob-wasm");

    return (md: MarkdownIt, options: any) => {
        // Setup Mermaid
        Mermaid.initialize({
            securityLevel: 'loose'
        });

        function getLangName(info: string): string {
            return info.split(/\s+/g)[0];
        }

        // Store reference to original renderer.
        let defaultFenceRenderer = md.renderer.rules.fence;

        // Render custom code types as SVGs, letting the fence parser do all the heavy lifting.
        function customFenceRenderer(tokens: any[], idx: number, options: any, env: any, slf: any) {
            let token = tokens[idx];
            let info = token.info.trim();
            let langName = info ? getLangName(info) : "";
            let imageHTML: string = "";
            let imageAttrs: string[][] = [];

            // Only handle custom token
            switch (langName) {
                case "bob": // Legacy
                case "svgbob": {
                    try {
                        imageHTML = svgbob.render(token.content);
                    } catch (e) {
                        console.log(`Error in running svgbob.convert_string: ${e}`);
                    }
                    break;
                }
                case "mermaid": {
                    const element = document.createElement("div");
                    document.body.appendChild(element);

                    // Render with Mermaid
                    try {
                        const container_id = "mermaid-container";
                        Mermaid.mermaidAPI.render(container_id, token.content, (html: string) => {
                            // We need to forcibly extract the max-width/height attributes to set on img tag
                            let svg = document.getElementById(container_id);
                            if (svg !== null) {
                                imageAttrs.push(["style", `max-width:${svg.style.maxWidth};max-height:${svg.style.maxHeight}`]);
                            }
                            // Store HTML
                            imageHTML = html;
                        }, element);
                    } catch (e) {
                        console.log(`Error in running Mermaid.mermaidAPI.render: ${e}`);
                        return `<div class="alert alert-warning">${e.str}</div>`;
                    } finally {
                        element.remove();
                    }
                    break;
                }
                default: {
                    return defaultFenceRenderer(tokens, idx, options, env, slf);
                }

            }

            // If we have an image, let's render it, otherwise return blank img tag
            if (imageHTML.length) {
                // Store encoded image data
                imageAttrs.push(["src", `data:image/svg+xml,${encodeURIComponent(imageHTML)}`]);
                return `<img ${slf.renderAttrs({attrs: imageAttrs})}>`;
            }
            return "<img>"

        }

        md.renderer.rules.fence = customFenceRenderer;
    };
}
