const { Client } = require("discord.js");
const loadfile = require("../../../functions/loadfile")

/**
 * 
 * @param {Client} client 
 */
module.exports = async (client) => {

    let evArray = [];
    // load event file
    const files = loadfile('events');
    files.forEach((file) => {

        const ev = require(file);

        //run event
        if (ev.once) {
            client.once(ev.name, (...args) => ev.run(...args));
        } else {
            client.on(ev.name, (...args) => ev.run(...args));
        }

        evArray.push(ev);

    });
    return evArray;
}