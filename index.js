'use strict';

require('dotenv').config();
const chalk = require('chalk');

const mongoose = require('./data/mongoose');

const auth = require('./lib/middleware/auth.js');
const start = require('./lib/readline/start.js');

start();
