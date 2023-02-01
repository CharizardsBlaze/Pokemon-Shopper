require("dotenv").config();
const express = require("express");
const server = express();
const cors = require("cors");
const morgan = require("morgan");
const client = require("./db/index");
const apiRouter = require("./api/index");
const path = require('path')
client.connect();
server.use(cors());
server.use(morgan("dev"));
server.use(express.json());
server.use("/api", apiRouter);

server.use( express.static(path.join(__dirname, 'build')))

server.get('*', (req, res ,next) => {
res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


server.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send({
    error: error.error,
    name: error.name,
    message: error.message,
  });
});

const { PORT = 3001 } = process.env;

server.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
});

module.exports = server;
