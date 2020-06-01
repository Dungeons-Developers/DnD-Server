'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes');
const { swagger, options } = require('../docs/swagger');
const errorHandler = require('./middleware/error-handler');

const server = express();

const expressSwagger = swagger(server);
expressSwagger(options); // view at /api-docs

server.use(express.json());
server.use(morgan('dev'));
server.use(cors());

/**
 * This route gives you the basic "Homepage" message
 * @route GET /
 * @returns {object} 200 - Homepage Text
 */
server.get('/', (req, res) => {
  res.send('Homepage');
});

server.use('/v1/api', router);

server.use(errorHandler);

// starts server and db connection
module.exports = {
  server: server,
  start: (port, db) => {
    db.start();
    server.listen(port, () => {
      console.log(`Server running at port: ${port}`);
    });
  },
};
