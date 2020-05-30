'use strict';

const mongoose = require('mongoose');

const schema = mongoose.Schema({
  user: { type: String, required: true},
  name: { type: String, required: true },
  class: { type: String, required: true },
  race: { type: String, required: true },
  ability_scores: { type: Object},
  alignment: { type: String},
  deity: { type: String },
  proficient_skills: { type: Object },
  equipment: { type: Object },
  level: { type: Number },
});

module.exports = mongoose.model('characters', schema);
