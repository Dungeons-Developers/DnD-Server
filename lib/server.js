'use strict';

const express = require('express');
const cors = require('cors');
const auth = require('./middleware/auth');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send('Homepage');
});

// starts server and db connection
server.start = (port, db) => {
  db.start();
  server.listen(port, () => {
    console.log(`Server running at port: ${port}`);
  });
};

module.exports = server;
