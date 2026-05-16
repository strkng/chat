const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

const messages = [];

io.on("connection", (socket) => {

  // 過去メッセージ送信
  socket.emit("load messages", messages);

  // 新規メッセージ
  socket.on("chat message", (msg) => {

    messages.push(msg);

    // 全員へ送信
    io.emit("chat message", msg);
  });

});

server.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
