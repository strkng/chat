const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(express.static("public"));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.send("Chat server running");
});

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log("server started");
});
