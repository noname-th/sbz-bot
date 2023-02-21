const { Client, GatewayIntentBits, Collection } = require('discord.js');
const logger = require('./functions/logger');

// set up express app
const express = require('express');
const app = express();

require('dotenv').config();
// set env 
const PORT = process.env.PORT || 3000;
const TOKEN = process.env.DISCORD_TOKEN;

// create a client instance
const client = new Client(
    {
        intents: [
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildWebhooks,
            GatewayIntentBits.MessageContent
        ]
    }
);
module.exports = client;

// create collection
client.Commands = new Collection();
client.Components = new Collection();

// create a server instance
app.get('/', (req, res) => {
    res.send('<h1>bot running...</h1>');
});

// listen for incoming connections
app.listen(PORT, () => {
    logger.log('Server listening on port ' + PORT);
    // bot login
    client.login(TOKEN);
});
client.on('ready', () => logger.ready('bot is ready'));

// connect handler
require('./handler')(client);