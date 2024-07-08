const { promisify } = require('util');
const readFile = promisify(require('fs').readFile);
const path = require('path');
const logger = require('../../../functions/logger');
const marked = require('marked');

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    breaks: true,
    pedantic: true,
    async: true
});

/**
 * Asynchronously loads the content of the README.md file located in the current working directory.
 *
 * @return {Promise<string|null>} The rendered GitHub flavored Markdown content of the README.md file, or null if an error occurred.
 */
async function loadReadme() {
    try {
        const content = await readFile(path.join(process.cwd(), '/README.md'), 'utf8');
        logger.log('readme.md loaded');
        return marked.parse(content);
    } catch (err) {
        logger.error(err);
        return null;
    }
}

module.exports.readmeContent = (
    (async () => {
        const content = await loadReadme();
        return `<div class="markdown-body">
            ${content}
        </div>`;
    })()
);


