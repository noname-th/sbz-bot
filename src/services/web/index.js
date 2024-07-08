const express = require('express');
const path = require('path');
const logger = require('../../functions/logger');
const { readmeContent } = require('./backend');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(process.cwd())));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// default local variables
app.locals.content = null;
app.locals.botname = '????';
app.locals.author = 'noname-th';


app.get('/', (req, res) => {
	res.render('index', {
		botName: req.app.locals.botname,
		author: req.app.locals.author,
	});
});

app.get('/readme', async (req, res) => {
	const readme = await readmeContent;
	res.render('index', {
		content: readme,
		botName: req.app.locals.botname,
		author: req.app.locals.author,
	});

});

/**
 * Runs the web server on the specified port.
 * @param {number} port - The port number to listen on.
 * @throws {Error} If the port number is invalid or if the client or package.json are invalid.
 */
const run = async (port) => {
	// Validate port number
	if (typeof port !== 'number' || port < 0) {
		throw new Error('Invalid port number');
	}

	// Load necessary modules
	const packageJson = require('../../../package.json');
	const client = require('../bot');

	// Load user and author information from client and package.json asynchronously
	const [user, author] = await Promise.all([
		client.user ? client.user.username : null,
		packageJson && packageJson.author ? packageJson.author : null,
	]);

	// Check if user and author information is valid
	if (!user || !author) {
		throw new Error('Invalid client or package.json');
	}

	// Set local variables for bot name and author
	app.locals.botname = user;
	app.locals.author = author;

	// Start the server and log the listening port
	app.listen(port, () => logger.ready(`Server listening on port ${port}`));
};

module.exports = { app, run };


