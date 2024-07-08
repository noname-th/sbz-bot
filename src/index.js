const logger = require('./functions/logger');
const bot = require('./services/bot');
const web = require('./services/web');

require('dotenv').config();
// set env
const PORT = process.env.PORT || 3000;
const TOKEN = process.env.DISCORD_TOKEN;

bot.on('ready', () => {
	logger.ready(`${bot.user.username} is ready`);
	web.run(Number(PORT));

});
bot.login(TOKEN);