const express = require('express');
// const socketIO = require("socket.io");
const app = require('./routes');

const cors = require("cors");
const http = require("http");
app.use(cors());

const server = http.createServer(app);
const PORT = process.env.PORT || 3002;
server.listen(PORT, async () => {
  console.log("Backend started at port: " + PORT);
})
