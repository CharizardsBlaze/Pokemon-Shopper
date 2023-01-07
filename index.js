require('dotenv').config();
const express = require('express');
const server = express();
const cors = require('cors');
const morgan = require('morgan');
const client = require('./db/index');

client.connect();

server.use(cors());
server.use(morgan('dev'))
server.use(express.json());



server.use((error, req, res, next) => {
    console.error(error.stack)
    res.status(500).send({
        error: error.error,
        name: error.name,
        message: error.message
    })
})

const {PORT = 3001} = process.env;

server.listen(PORT, () => {
    console.log(`Server Listening on ${PORT}`)
})




module.exports = server