'use strict';

require('dotenv').config();
const chalk = require('chalk');
const cliSelect = require('cli-select');
const mongoose = require('mongoose');
const dbUrl = process.env.dbUrl;

const auth = require('./lib/middleware/auth.js');
const start = require('./lib/readline/start.js');

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});

mongoose.connection.once('open', function callback () {
  console.log('Connected to DB!');
});

/// Clayton's test code for terminal UI display
// async function start() {
//   let response = await cliSelect({
//     values: ['Log in', 'Sign up'],
//     valueRenderer: (value, selected) => {
//         if (selected) {
//             return chalk.underline(value);
//         }
  
//         return value;
//     },
//   });

//   console.log(response);
// }

// 
start();