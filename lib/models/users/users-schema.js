'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

schema.pre('save', async function() {
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('users', schema);
