const { Client } = require("discord.js");
const loadCmd = require("./loadCmd");
const loadEvent = require("./loadEvent");
const logger = require("../../../functions/logger");
const loadComponents = require("./loadComponents");

/**
 * 
 * @param {Client} client 
 */
module.exports = async (client) => {

    var cmd = loadCmd();
    var comp = loadComponents();
    var ev = await loadEvent(client);

    client.on('ready', () => {

        //set command
        client.application.commands.set(cmd).catch(err => { });

        // log
        console.log('---Commands---');
        cmd.forEach(cmd => logger.log('loaded: ' + cmd.name));

        console.log('---Events---');
        ev.forEach(ev => logger.log('loaded: ' + ev.name));

        console.log('---Components---');
        comp.forEach(comp => logger.log('loaded: ' + comp.customId));

        console.log('------');

    });
}