require('dotenv').config();

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: { origin: '*'},
});

const { v4 : uuidV4 } = require('uuid');

const PORT = process.env.PORT;

const roomMembers = {};

function getUsername(roomID, userID) {
  const roomData = roomMembers[roomID];
  if (roomData) {
    const userObject = roomData.find(user => user.peerID === userID);
    if (userObject) {
      return userObject.username;
    } else {
      return "User not found in this room.";
    }
  } else {
    return "Room not found.";
  }
}

io.on('connection', socket => {
  socket.on('create-room', () => {
    const roomID = uuidV4();
    roomMembers[roomID] = [];
    socket.emit('room-created', roomID);
  })

  socket.on('join-room', (roomID, peerID, username) => {
    socket.join(roomID);

    console.log("Username: " + username + " with id: " + peerID);

    roomMembers[roomID].push({peerID: peerID, username: username});

    socket.on('user-ready', () => {
      socket.to(roomID).emit('new-user-joined', username, peerID);
    })
  })

  socket.on('request-member', (roomID, peerID) => {
    const username = getUsername(roomID, peerID);
    socket.emit('requested-username', username);
  })
})

server.listen(PORT)