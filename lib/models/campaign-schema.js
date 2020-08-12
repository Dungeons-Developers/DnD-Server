'use strict';

const mongoose = require('mongoose');

/**
 * @typedef Campaign
 * @property {string} user.required - The user who created the campaign
 * @property {array} characters.required - The characters involved in the campaign
 * @property {string} title.required - The title of the campaign
 * @property {string} setting.required - The setting of the campaign
 * @property {string} description.required - The description of the campaign
 * @property {array} notes - The notes about the campaign progression
 * @property {boolean} isComplete.required - The status of the campaign - complete/incomplete
 */
const schema = mongoose.Schema({
  user: { type: String, required: true },
  characters: { type: Array, required: true },
  title: { type: String, required: true },
  setting: { type: String, required: true },
  description: { type: String, required: true },
  notes: { type: Array },
  isComplete: { type: Boolean, required: true },
});

module.exports = mongoose.model('campaigns', schema);
