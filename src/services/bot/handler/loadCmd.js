const { Commands } = require("..");
const loadfile = require("../../../functions/loadfile")

module.exports = () => {

    let cmdArray = [];
    // load command file
    const files = loadfile('./commands');
    files.forEach(file => {
        let cmd = require(file);

        if (cmd.data && cmd.run) {

            cmdArray.push(cmd.data);
            Commands.set(cmd.data.name, cmd);
        }

    });

    return cmdArray;
}