const express = require('express');
const dotenv = require('dotenv');

const app = express();
const PORT = process.env.PORT || 3000;

const http = require("http");
const {Server} = require("socket.io");

const server = http.createServer(app);
const io = new Server(server);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/styles'));

app.use('/', require('./routes/pages').router);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
