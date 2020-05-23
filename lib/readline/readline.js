'use strict';

const readline = require('readline');

const chalk = require('chalk');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', command => {
  switch (command.trim()) {
    case '1':
      console.log('CHARACTERS');
      break;
    case '2':
      console.log('Entered character creator. \n');
      commands.createCharacter();
      break;
    case 'exit':
      rl.close();
      break;
    default:
      console.log('Command not recognized');
  }
});

rl.on('close', () => {
  console.log(chalk.hex('#4298eb')('Thank you for using D&D Companion!'));
});


module.exports = rl;