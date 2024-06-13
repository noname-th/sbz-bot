const logger = require('./functions/logger');
const client = require('./services/bot');
const app = require('./services/app');

require('dotenv').config();
// set env
const PORT = process.env.PORT || 3000;
const TOKEN = process.env.DISCORD_TOKEN;

// listen for incoming connections
app.listen(PORT, () => {
	logger.log('Server listening on port ' + PORT);
	// bot login
	client.login(TOKEN);
});

// on bot ready
client.on('ready', () => {
	logger.ready(`${client.user.username}bot is ready`);
	app.locals.botname = client.user.username;
	app.locals.author = require('../package.json').author;
});
