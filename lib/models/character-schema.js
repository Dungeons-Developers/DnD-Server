'use strict';

const mongoose = require('mongoose');

/**
 * @typedef Character
 * @property {string} user.required - The user who created the character
 * @property {string} name.required - The name of the character
 * @property {string} class.required - The class of the character
 * @property {string} race.required - The race of the character
 * @property {object.number} ability_scores - The characters scores in str, dex, con, int, wis, and cha
 * @property {string} alignment - The alignment of the character
 * @property {string} deity - The diety the character worships
 * @property {object.string} proficient_skills - The skills that the character is proficient in
 * @property {object.string} equipment - The equipment the character is carrying
 * @property {number} level - The level of the character
 * @property {boolean} isInCampaign - true/false on whether or not the character is currently in a campaign
 */
const schema = mongoose.Schema({
  user: { type: String, required: true },
  name: { type: String, required: true },
  class: { type: String, required: true },
  race: { type: String, required: true },
  ability_scores: { type: Object },
  alignment: { type: String },
  deity: { type: String },
  proficient_skills: { type: Object },
  equipment: { type: Object },
  level: { type: Number },
  isInCampaign: { type: Boolean }
});

module.exports = mongoose.model('characters', schema);
