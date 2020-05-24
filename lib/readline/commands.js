'use strict';

const rl = require('./readline.js');

const Model = require('../models/model.js');
const userSchema = require('../models/users/users-schema.js');
const UserModel = new Model(userSchema);

const chalk = require('chalk');
const bcrypt = require('bcrypt');

const menu = require('./menu.js');

const commands = {
  login: async () => {
    let username;
    let password;
  
    console.log(chalk.hex('#4298eb')('\nPlease log in.\n'));
    rl.question('Username: ', async (input) => {
      username = input;

      let response = await UserModel.readByQuery({ username });
      console.log('response', response);

      let user;
      if (response[0]){
        user = response[0];
      }
      
      rl.loginPassMute = true;

      rl.question('Password: ', async (input) => {
        password = input;

        rl.loginPassMute = false;

        if (!user) {
          console.log(chalk.hex('#f0190a')('\nInvalid credentials.'));
        } else {
          let match = await bcrypt.compare(password, user.password);
          
          if (match) {
            console.log(`\n\nWelcome, ${username}!\n`);
          } else {
            console.log(chalk.hex('#f0190a')('\nInvalid credentials.\n'));
            // while (!match) {
            //   rl.question('Username: ', async (input) => {
            //     username = input;
            
            //     let response = await UserModel.readByQuery({ username });
            //     console.log('response', response);
            
            //     let user;
            //     if (response[0]){
            //       user = response[0];
            //     }
                
            //     rl.loginPassMute = true;
            
            //     rl.question('Password: ', async (input) => {
            //       password = input;
            
            //       if (!user) {
            //         console.log(chalk.hex('#f0190a')('\nInvalid credentials.'));
            //       } else {
            //         match = await bcrypt.compare(password, user.password);
            //       }
            //     });
            //   });
            // }
          }
        }

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

async function loginLoop() {
  let username;
  let password;
  let passed = false;

  
}

module.exports = commands;