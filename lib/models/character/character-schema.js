'use strict';

const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: { type: String, required: true },
  class: {},
  race: {},
  alignment: {},
  deity: {},
  skills: {},
  equipment: {},
  level: { type: Number },
});

module.exports = mongoose.model('characters', schema);
