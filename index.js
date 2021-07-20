require('dotenv').config();
const express = require('express');
const routes = require('./src/routes/routes');
const database = require('./config/database');
const PORT = process.env.PORT || 5000;
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const socket = require('./src/utils/socket');

app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// send 404 error if path not exist
app.use('/*', (req, res) => {
	res.redirect('/404');
});

// error middleware
app.use((err, req, res, next) => {
	console.log(err);
	// res.redirect('/500');
});

server.listen(PORT, () => {
	database.init();
	socket.init(io);
	console.log(`Listening on port ${PORT}`);
});
