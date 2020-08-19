'use strict';

const mongoose = require('mongoose');

/**
 * @typedef Characterhealth
 * @property {string} user.required - The user who created the character
 * @property {string} name.required - The name of the character
 * @property {number} health.required - The characters score in health
 * @property {string} class.required - The class of the character
 * @property {string} race.required - The race of the character
 * @property {number} str.required - The characters score in str
 * @property {number} dex.required - The characters score in dex
 * @property {number} con.required - The characters score in con
 * @property {number} int.required - The characters score in int
 * @property {number} wis.required - The characters score in wis
 * @property {number} cha.required - The characters score in cha
 * @property {string} alignment.required - The alignment of the character
 * @property {string} deity.required - The diety the character worships
 * @property {string} skill_1.required - The skill that the character is proficient in
 * @property {string} skill_2.required - The skill that the character is proficient in
 * @property {string} armor.required - The armor the characters
 * @property {string} pack.required - The equipment the character is carrying
 * @property {string} weapon_1.required - The equipment the character is carrying
 * @property {string} weapon_2.required - The equipment the character is carrying
 * @property {number} level.required - The level of the character
 * @property {boolean} isInCampaign.required - true/false on whether or not the character is currently in a campaign
 */
const schema = new mongoose.Schema({
  user: { type: String, required: true },
  name: { type: String, required: true },
  class: { type: String, required: true },
  race: { type: String, required: true },
  health: { type: Number, required: true },
  alignment: { type: String, require: true },
  str: { type: Number, required: true },
  dex: { type: Number, required: true },
  con: { type: Number, required: true },
  int: { type: Number, required: true },
  wis: { type: Number, required: true },
  cha: { type: Number, required: true },
  deity: { type: String, required: true },
  skill_1: { type: String, required: true },
  skill_2: { type: String, requried: true },
  armor: { type: String, requried: true },
  pack: { type: String, requried: true },
  weapon_1: { type: String, requried: true },
  weapon_2: { type: String, requried: true },
  level: { type: Number, required: true },
  isInCampaign: { type: Boolean, required: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('characters', schema);