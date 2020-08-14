const express = require('express');

const auth = require('../middleware/auth');
const { userModel, charModel, campaignModel } = require('../models/model');

const router = express.Router();

// Login - auth
/**
 * This route verifies the user login credentials it recieves.
 * @route POST /v1/api/user
 * @group User
 * @returns {object} 200 - the user record from the database
 */
router.post('/user', auth, async (req, res, next) => {
  try {
    if (req.user) {
      req.user.password = undefined;
      const user = req.user;
      const token = await user.generateToken(86400); // 1 day expiration
      res.send({ user, token });
    } else {
      res.status(400).send();
    }
  } catch (e) { next(e) }
});

// Create User - No Auth
/**
 * This route creates a new user in the database with the given credentials.
 * @route POST /v1/api/signup
 * @group User
 * @param {string} username.body.required - the username to save for the user.
 * @param {string} password.body.required - the password to hash and save for the user.
 * @returns {object} 200 - the newly created user object.
 */
router.post('/signup', async (req, res, next) => {
  try {
    if (!req.body || !req.body.username) return res.status(400).send();

    const user = await userModel.create({
      username: req.body.username,
      password: req.body.password,
    });
    user.password = undefined;
    const token = await user.generateToken(86400); // 1 day expiration

    res.status(201).send({ user, token });
  } catch (e) { next(e) }

});

// Create Character - Auth
/**
 * This route adds a new character record to the database.
 * @route POST /v1/api/character
 * @group Character
 * @param {string} user.body.required - the username who created the character.
 * @param {string} name.body.required - the name for the new character.
 * @param {string} class.body.required - the class for the new character.
 * @param {string} race.body.required - the race for the new character.
 * @param {object.number} ability_scores.body - the ability scores for the new character.
 * @param {string} alignment.body - the alignment for the new character.
 * @param {string} deity.body - the deity for the new character.
 * @param {object.string} proficient_skills.body - the proficient skills for the new character.
 * @param {object.string} equipment.body - the equipment for the new character.
 * @param {number} level.body - the level for the new character.
 * @returns {object} 200 - the newly created/added character record
 */
router.post('/character', async (req, res, next) => {
  try {
    if (!req.body) return res.status(400).send();
    console.log(req.body);

    const character = await charModel.create({ ...req.body });
    res.status(201).send(character);
  } catch (e) { next(e) }
});

// Update Character - No Auth
/**
 * This route updates the character with the given id in the database.
 * @route PATCH /v1/api/character/:charId
 * @group Character
 * @param {string} charId.params.required - the id of the character you want to retrieve
 * @returns {object} 200 - the newly updated character record
 */
router.patch('/character/:charId', async (req, res, next) => {
  try {
    console.log('ID:', req.params.charId);
    console.log('REQ.BODY', req.body);
    let updatedChar = await charModel.update(req.params.charId, req.body);
    console.log('UPDATED CHAR', updatedChar);
    res.status(200).send(updatedChar);
  } catch (e) { next(e) }
});

// Retrieve One Character - No Auth
/**
 * This route retrieves the character with the matching id from the database.
 * @route GET /v1/api/character/:charId'
 * @group Character
 * @param {string} charId.params.required - the id of the character you want to retrieve.
 * @returns {object} 200 - the character record from the database.
 */
router.get('/character/:charId', async (req, res, next) => {
  try {
    const oneChar = await charModel.read(req.params.charId);
    res.status(200).send(oneChar);
  } catch (e) { next(e) }
});

// Retrieve Characters - No Auth
/**
 * This route retrieves the list of characters made by the given user.
 * @route GET /v1/api/:username/characters
 * @group Character
 * @param {string} username.params.required - the user whose characters to retrieve.
 * @returns {object} 200 - list of characters for the given user.
 */
router.get('/:username/characters', async (req, res, next) => {
  try {
    const charList = await charModel.readByQuery({ user: req.params.username });
    res.status(200).send(charList);
  } catch (e) { next(e) }
});

// Delete Character - No Auth
/**
 * This route deletes the character with the matching charId from the database.
 * @route DELETE /v1/api/character/:charId
 * @group Character
 * @param {string} charId.params.required - the id of the character you want to delete.
 * @returns {object} 200 - the id of the deleted character.
 */
router.delete('/character/:charId', async (req, res, next) => {
  try {
    console.log('Inside delete');
    const id = await charModel.delete(req.params.charId);
    console.log('id:', id);
    res.status(200).send(id);
  } catch (e) { next(e) }
});

// Create Campaign
/**
 * This route adds a new campaign record to the database.
 * @route POST /v1/api/campaign
 * @group Campaign
 * @param {string} user.body.required - the username who created the campaign.
 * @param {array} characters.body.required - the characters involved in the campaign
 * @param {string} title.body.required - the title of the new campaign.
 * @param {string} setting.body.required - the setting of the new campaign
 * @param {string} description.body.required - the description of the new campaign
 * @param {array} notes.body - the notes associated with this new campaign
 * @param {boolean} isComplete.body.required - the true/false value of whether the campaign is complete or not.
 * @returns {object} 200 - the newly created/added campaign record
 */
router.post('/campaign', async (req, res, next) => {
  try {
    if (!req.body) return res.status(400).send();

    const campaign = await campaignModel.create({ ...req.body });
    res.status(201).send(campaign);
  } catch (e) { next(e) }
});

// Retrieve Campaigns
/**
 * This route retrieves the list of campaigns made by the given user.
 * @route GET /v1/api/:username/campaigns
 * @group Campaign
 * @param {string} username.params.required - the user whose campaigns to retrieve.
 * @returns {object} 200 - list of campaigns for the given user.
 */
router.get('/:username/campaigns', async (req, res, next) => {
  try {
    const campaignList = await campaignModel.readByQuery({ user: req.params.username });
    res.status(200).send(campaignList);
  } catch (e) { next(e) }
});

// Retrieve One Campaign
/**
 * This route retrieves the campaign with the matching id from the database.
 * @route GET /v1/api/campaign/:camId'
 * @group Campaign
 * @param {string} camId.params.required - the id of the campaign you want to retrieve.
 * @returns {object} 200 - the campaign record from the database.
 */
router.get('/character/:camId', async (req, res, next) => {
  try {
    const oneCampaign = await campaignModel.read(req.params.camId);
    res.status(200).send(oneCampaign);
  } catch (e) { next(e) }
});

// Update Campaign
/**
 * This route updates the campaign with the given id in the database.
 * @route PATCH /v1/api/campaign/:camId
 * @group Campaign
 * @param {string} camId.params.required - the id of the campaign you want to retrieve
 * @returns {object} 200 - the newly updated campaign record
 */
router.patch('/campaign/:camId', async (req, res, next) => {
  try {
    let updatedCampaign = await campaignModel.update(req.params.camId, req.body);
    res.status(200).send(updatedCampaign);
  } catch (e) { next(e) }
});

// Delete Campaign
/**
 * This route deletes the campaign with the matching camId from the database.
 * @route DELETE /v1/api/campaign/:camId
 * @group Campaign
 * @param {string} camId.params.required - the id of the character you want to delete.
 * @returns {object} 200 - the id of the deleted character.
 */
router.delete('/campaign/:camId', async (req, res, next) => {
  try {
    const id = await campaignModel.delete(req.params.camId);
    res.status(200).send(id);
  } catch (e) { next(e) }
});

module.exports = router;
