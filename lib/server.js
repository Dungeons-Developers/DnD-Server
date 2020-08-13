'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes');
const { swagger, options } = require('../docs/swagger');
const errorHandler = require('./middleware/error-handler.js');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
  console.log('Socket connected:', socket.id);

  socket.on('join', payload => {
    socket.join(payload);
    console.log('Socket joined room:', payload);
  });
  
});

const expressSwagger = swagger(app);
expressSwagger(options); // view at /api-docs

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

/**
 * This route gives you the basic "Homepage" message
 * @route GET /
 * @group Home
 * @returns {object} 200 - Homepage Text
 */
app.get('/', (req, res) => {
  res.send('Homepage');
});

// API v1
app.use('/v1/api', router);

app.use(errorHandler);

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
