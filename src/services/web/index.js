const express = require('express');

// set up express app
const app = express();

// set static pages root path
app.use(express.static(__dirname + '/public'));

// set view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// render home page
app.get('/', (req, res) => {
	res.render('index', {
		botName: req.app.locals.botname,
		author: req.app.locals.author,
	});
});

module.exports = app;
