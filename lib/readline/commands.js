'use strict';

const rl = require('./readline.js');

const chalk = require('chalk');

const menu = require('./menu.js');

const commands = {
  login: () => {
    let username;
    let password;
  
    console.log(chalk.hex('#4298eb')('\nPlease log in.\n'));
    rl.question('Username: ', input => {
      username = input;
  
      rl.loginPassMute = true;

      rl.question('Password: ', input => {
        password = input;

        console.log(`\nWelcome, ${username}!\n`);
        rl.loginPassMute = false;
        menu();
      });

      rl._writeToOutput = function _writeToOutput(stringToWrite) {
        if (rl.loginPassMute)
          rl.output.write('*');
        else
          rl.output.write(stringToWrite);
      };
    });  
  },

  signup() {
    let username;
    let password;

    console.log(chalk.hex('#4298eb')('\nPlease sign up.\n'));
    rl.question('Username: ', input => {
      username = input;
  
      rl.signupPassMute = true;

      rl.question('Password: ', input => {
        password = input;

        console.log(`\nWelcome, ${username}!\n`);
        rl.signupPassMute = false;
        menu();
      });

      rl._writeToOutput = function _writeToOutput(stringToWrite) {
        if (rl.signupPassMute)
          rl.output.write('*');
        else
          rl.output.write(stringToWrite);
      };
    });  
  },

  createCharacter: () => {
    console.log(chalk.green('Please fill out the following information about your character:'));
    let charName;
    let charRace;
    let charClass;
  
    rl.question(chalk.blue('\nWhat is your characters name? '), name => {
      charName = name;
  
      rl.question(chalk.blue('\nWhat is your characters race? '), race => {
        charRace = race;
  
        rl.question(chalk.blue('\nWhat is your characters class? '), characterClass => {
          charClass = characterClass;
  
          console.log(chalk.green(`\nYou have created a ${charRace} ${charClass} named ${charName}!`));
        });
      });
    });
  
  }
}

module.exports = commands;