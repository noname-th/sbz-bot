const { Client, GatewayIntentBits, Collection } = require('discord.js');
const logger = require('./functions/logger');

// set up express app
const express = require('express');
const app = express();

// set static pages root path
app.use(express.static(__dirname + '/public'));

// set view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

require('dotenv').config();
// set env
const PORT = process.env.PORT || 3000;
const TOKEN = process.env.DISCORD_TOKEN;

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

// listen for incoming connections
app.listen(PORT, () => {
	logger.log('Server listening on port ' + PORT);
	// bot login
	client.login(TOKEN);
});
client.on('ready', () => {
	logger.ready(`${client.user.username}bot is ready`);
	app.locals.botname = client.user.username;
});

// render home page
app.get('/', (req, res) => {
	res.render('index', {
		botName: req.app.locals.botname,
	});
});

// connect handler
require('./handler')(client);
