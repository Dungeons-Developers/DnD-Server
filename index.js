'use strict';

const chalk = require('chalk');
const cliSelect = require('cli-select');

async function start() {
  let response = await cliSelect({
    values: ['Log in', 'Sign up'],
    valueRenderer: (value, selected) => {
        if (selected) {
            return chalk.underline(value);
        }
  
        return value;
    },
  });

  console.log(response);
}

start();