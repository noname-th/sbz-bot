const gc = require('get-caller-file');
const path = require('path');
/**
 * A function that logs the content based on the provided type.
 *
 * @param {string} content - The content to be logged.
 * @return {void}
 */
exports.log = (content, moduleName = null, type = 'log') => {

    // get logger caller
    moduleName = moduleName || path.relative(process.cwd(), gc()).split(path.sep).slice(1, -1).join('.');

    switch (type) {
        case "log": return console.log(`[${type.toUpperCase()}] ${moduleName ? `(${moduleName})` : ''} ${content} `);
        case "warn": return console.warn(`[${type.toUpperCase()}] ${moduleName ? `(${moduleName})` : ''} ${content} `);
        case "error": return console.error(`[${type.toUpperCase()}] ${moduleName ? `(${moduleName})` : ''} ${content} `);
        case "debug": return console.debug(`[${type.toUpperCase()}] ${moduleName ? `(${moduleName})` : ''} ${content} `);
        case "ready": return console.log(`[${type.toUpperCase()}] ${content}`);
        default: throw new TypeError("Logger type must be either log, warn, error, debug or ready. but got " + type);
    }
}


exports.warn = (content, moduleName = null) => this.log(content, moduleName, "warn");
exports.error = (content, moduleName = null) => this.log(content, moduleName, "error");
exports.debug = (content, moduleName = null) => this.log(content, moduleName, "debug");
exports.ready = (content, moduleName = null) => this.log(content, moduleName, "ready");

