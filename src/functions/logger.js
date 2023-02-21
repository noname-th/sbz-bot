
exports.log = (content, type = 'log') => {

    switch (type) {
        case "log": return console.log(`[${type.toUpperCase()}] ${content} `);
        case "warn": return console.log(`[${type.toUpperCase()}] ${content} `);
        case "error": return console.log(`[${type.toUpperCase()}] ${content} `);
        case "debug": return console.log(`[${type.toUpperCase()}] ${content} `);
        case "cmd": return console.log(`[${type.toUpperCase()}] ${content}`);
        case "database": return console.log(`[${type.toUpperCase()}] ${content}`);
        case "ready": return console.log(`[${type.toUpperCase()}] ${content}`);
        default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
    }
}

exports.error = (...args) => this.log(...args, "error");
exports.warn = (...args) => this.log(...args, "warn");
exports.debug = (...args) => this.log(...args, "debug");
exports.cmd = (...args) => this.log(...args, "cmd");
exports.data = (...args) => this.log(...args, "database");
exports.ready = (...args) => this.log(...args, "ready")
