//import { convert_string } from "markdown-it-diagrams";
import MarkdownIt from "markdown-it";
import {loadPluginFactory} from "markdown-it-diagrams"

loadPluginFactory().then((plugin) => {
    var md = new MarkdownIt().use(plugin);
    
    var source = document.getElementById("markdown-source");
    var dest = document.getElementById("markdown-dest");
        
    function render() {
        dest.innerHTML = md.render(source.value);
    }

    source.addEventListener("input", render, true);

    render();
});
