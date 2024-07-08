const { glob } = require('glob');
const fs = require('fs');
const path = require('path');

/**
 * 
 * @param {string} dirname 
 */
module.exports = (dirname) => {

    const files = glob.sync(process.cwd().replace(/\\/g, '/') + `/src/services/bot/${dirname}/**/*.js`);

    // clear cache and skip file 
    files.forEach((file, i) => {
        if (path.basename(file).startsWith('_')) files.splice(i, 1);
        delete require.cache[require.resolve(file)]
    });
    return files;

}
