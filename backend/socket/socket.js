import express from 'express';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app); // Use HTTP server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Frontend origin
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

export const getReceiverSocketId=(receiverId)=>{
  return userSocketMap[receiverId];
}

const userSocketMap={};


io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  const userId = socket.handshake.query.userId;

  // Add the user to the map if a valid userId exists
  if (userId !== undefined && userId !== null) {
    userSocketMap[userId] = socket.id;
    console.log(`User connected: ${userId}`);
  }

  // Emit the updated list of online users to all clients
  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  // Handle socket disconnection
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);

    // Find and remove the disconnected user from userSocketMap
    for (const [key, value] of Object.entries(userSocketMap)) {
      if (value === socket.id) {
        console.log(`Removing user: ${key}`);
        delete userSocketMap[key];
        break;
      }
    }

    // Emit the updated list of online users to all clients
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});


export { app, server, io };
