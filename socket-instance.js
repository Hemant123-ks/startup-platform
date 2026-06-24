const express = require("express");
const app = express();
app.use(express.json());
const http = require("http");
const { Server } = require("socket.io");

const httpServer = http.createServer(app);
const io = new Server(httpServer);

module.exports = { httpServer, io, app };