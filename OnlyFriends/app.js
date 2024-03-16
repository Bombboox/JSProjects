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

app.use('/', require('./routes/pages.js').router);

const rooms = {}; //Stores rooms for players to join <3

io.on('connection', (socket) => {
    socket.on('randomSearch', () => {
        let availableRoomId = null;

        for(const roomId in rooms) {
            const room = rooms[roomId];
            if(room.users.length < 2) {
                availableRoomId = roomId;
                break
            }
        }

        if(!availableRoomId) {
            const newRoomId = Math.random().toString(30).substring(7);
            rooms[newRoomId] = {users: [socket.id]};
            socket.join(newRoomId);
            socket.emit('roomCreated', newRoomId);
        } else {
            rooms[availableRoomId].users.push(socket.id);
            socket.join(availableRoomId);
            io.to(availableRoomId).emit('roomJoined', availableRoomId);
        }
    });

    socket.on('move', ({x, y}) => {
        socket.broadcast.emit('move', {x, y});
    });
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
