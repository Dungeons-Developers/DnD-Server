'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes');

const server = express();

const errorHandler = require('./middleware/error-handler');


server.use(express.json());
server.use(morgan('dev'));
server.use(cors());

server.get('/', (req, res) => {
  res.send('Homepage');
});

server.use('/v1/api', router);

// server.use(errorHandler);

// starts server and db connection
server.start = (port, db) => {
  db.start();
  server.listen(port, () => {
    console.log(`Server running at port: ${port}`);
  });
};

module.exports = server;
