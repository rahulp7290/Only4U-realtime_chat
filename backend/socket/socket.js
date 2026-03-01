// import http from "http";
// import express from "express";
// import { Server } from "socket.io";

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:5173",
//         credentials: true
//     }
// }); 

//  export const userSocketMap = {

//  }
// io.on("connection", (socket) => {

//     const userId = socket.handshake.query.userId;
//     if(userId !== undefined) {
//         userSocketMap[userId] = socket.id;
//     }
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));

//     socket.on("disconnect", ()=> {
//         delete io.emit("getOnlineUsers", Object.keys(userSocketMap));
//     })


// });

// export { server, app, io };


import http from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://only4u-realtime-chat.onrender.com",
    credentials: true,
  },
});

export const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  // ✅ get userId from query (not auth)
  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // send updated list
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected:", userId);

    // ✅ remove user from map
    if (userId) {
      delete userSocketMap[userId];
    }

    // send updated list again
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { server, app, io };
