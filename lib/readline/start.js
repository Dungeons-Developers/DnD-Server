'use strict';

const rl = require('./readline.js');

const chalk = require('chalk');

const commands = require('./commands.js');

console.log(chalk.hex('#1ddb4c')('\nWelcome to D&D Companion!\n'));

function start() {
  rl.question(chalk.hex('#4298eb')('1. Log in\n2. Sign up\n\n'), input => {
    switch(input) {
      case '1':
        commands.login();
        break;
      case '2':
        // commands.signup();
        break;
      default:
        console.log('Command not recognized');
    }
  });
}

module.exports = start;