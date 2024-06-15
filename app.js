const express = require('express');
// const socketIO = require("socket.io");
const app = require('./routes');

const http = require("http");

const server = http.createServer(app);
const PORT = process.env.PORT || 3002;
server.listen(PORT, async () => {
  console.log("Backend started on port: " + PORT);
})
