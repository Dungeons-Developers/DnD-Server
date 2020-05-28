'use strict';

const mongoose = require('mongoose');

const schema = mongoose.Schema({
  user: { type: String, required: true},
  name: { type: String, required: true },
  class: { type: String, required: true },
  race: { type: String, required: true },
  alignment: {},
  deity: {},
  skills: {},
  equipment: {},
  level: { type: Number },
});

module.exports = mongoose.model('characters', schema);
