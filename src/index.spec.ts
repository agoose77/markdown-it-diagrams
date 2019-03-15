import {diagramPlugin, awaitRenderAvailable} from './index';
import MarkdownIt from "markdown-it";

import * as chai from 'chai';
import 'mocha';

const expect = chai.expect;

const testString = "       .---.\n" +
    "      /-o-/--\n" +
    "   .-/ / /->\n" +
    "  ( *  \\/\n" +
    "   '-.  \\\n" +
    "      \\ /\n" +
    "       '"

describe('Render simple Markdown', () => {
    it('should render simple markdown', async function () {
        await awaitRenderAvailable();
        let md = new MarkdownIt({html: true}).use(diagramPlugin);
        let result = md.render(testString);
        expect(result).to.equal("jack");
    })
});
