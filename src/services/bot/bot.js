const { Client, GatewayIntentBits, Collection } = require('discord.js');
const logger = require('../functions/logger');

// create a client instance
const client = new Client({
	intents: [
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildWebhooks,
		GatewayIntentBits.MessageContent,
	],
});
module.exports = client;

// create collection
client.Commands = new Collection();
client.Components = new Collection();

// connect handler
require('../handler')(client);