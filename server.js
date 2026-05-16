const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// publicフォルダ配信
app.use(express.static(path.join(__dirname, "public")));

const messages = [];

io.on("connection", (socket) => {

  socket.emit("load messages", messages);

  socket.on("chat message", (msg) => {

    messages.push(msg);

    io.emit("chat message", msg);

  });

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server running");
});
