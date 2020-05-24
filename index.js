'use strict';

require('dotenv').config();

const start = require('./lib/readline/start');
const db = require('./data/mongoose');
const server = require('./lib/server');

const PORT = process.env.PORT;

server.start(PORT, db);
start();
