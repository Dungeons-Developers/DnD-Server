'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @typedef User
 * @property {string} username.unique.required - The user who created the character
 * @property {string} password.required - The name of the character
 */
const schema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
});

schema.virtual('characters', {
  ref: 'characters',
  localField: 'username',
  foreignField: 'user',
});

schema.virtual('campaigns', {
  ref: 'campaigns',
  localField: 'username',
  foreignField: 'user',
});

schema.pre(['find', 'findOne'], function () {
  this.populate('characters');
  this.populate('campaigns');
});

schema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

schema.methods.comparePassword = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

schema.methods.generateToken = async function (exp) {
  const token = jwt.sign(
    {
      data: { id: this.id, username: this.username },
    },
    process.env.JWT_SECRET || 'BAD_SECRET',
    { expiresIn: exp || 0 },
  );
  return token;
};

schema.statics.verifyToken = async function (token) {
  const content = jwt.verify(token, process.env.JWT_SECRET || 'BAD_SECRET');
  return content.data;
};

module.exports = mongoose.model('users', schema);
