const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");
io.on("connection", (socket) => {
  console.log("a user connected");
});
io.on("disconnect", (socket) => {
  console.log("a user disconnected");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

const htmlPath = path.join(__dirname, "html");
app.use(express.static(htmlPath));
