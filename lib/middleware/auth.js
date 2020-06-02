'use strict';

let newUser = {
  username: 'username',
  password: 'password',
};

const Model = require('../models/model.js');
const userSchema = require('../models/users-schema.js');

let UsersModel = new Model(userSchema);

const auth = async () => {
  let user = await UsersModel.create(newUser);

  console.log(`user saved to the DB: ${user}`);
  return user;
};

module.exports = auth;
