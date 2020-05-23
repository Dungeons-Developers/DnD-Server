'use strict';

const chalk = require('chalk');

function menu() {
  console.log(chalk.hex('#4298eb')('\nPlease use the following numbered prompts to navigate the application:\nEnter "exit" to exit and close application.\n'))
  console.log('1. characters - get a list of all of your characters');
  console.log('2. create character - create a new player character\n');
}

module.exports = menu;