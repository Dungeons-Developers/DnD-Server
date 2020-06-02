const express = require('express');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const userSchema = require('../models/users-schema');
const Model = require('../models/model');
const charSchema = require('../models/character-schema');

const userModel = new Model(userSchema);
const router = express.Router();
const charModel = new Model(charSchema);

// Login - No Auth
/**
 * This route verifies the user login credentials it recieves.
 * @route POST /api/v1/user
 * @group User
 * @param {string} username.body.required - the username for the user to try and log in
 * @param {string} password.body.required - the password to verify against the users
 * @returns {object} 200 - the user record from the database
 */
router.post('/user', async (req, res, next) => {
  try {
    if (!req.body || !req.body.username) return res.status(400).send();

    const response = await userModel.readByQuery({
      username: req.body.username,
    });

    const user = response[0] || {};

    if (!user.username) return res.send();

    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      user.password = undefined;
      res.send(user);
    } else {
      res.status(400).send();
    }
  } catch (e) {
    next(e);
  }
});

// Create User - No Auth
/**
 * This route creates a new user in the database with the given credentials.
 * @route POST /api/v1/signup
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
    res.status(201).send(user);
  } catch (e) {
    next(e);
  }
});

// Create Character - No Auth
/**
 * This route adds a new character record to the database.
 * @route POST /api/v1/character
 * @group Character
 * @param {string} username.body.required - the username who created the character.
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

    const character = await charModel.create({ ...req.body });
    res.status(201).send(character);
  } catch (e) {
    next(e);
  }
});

// Update Character - No Auth
// /**
//  * This route updates the character with the given id in the database.
//  * @route PATCH /api/v1/character/:charId
//  * @group Character
//  * @param {string} charId.params.required - the id of the character you want to retrieve
//  * @returns {object} 200 - the newly updated character record
//  */
// router.patch('/character/:charId', (req, res, next) => {
//   // TODO
// });

// Retrieve Character - No Auth
// /**
//  * This route retrieves the character with the matching id from the database.
//  * @route GET /api/v1/character/:charId'
//  * @group Character
//  * @param {string} charId.params.required - the id of the character you want to retrieve.
//  * @returns {object} 200 - the character record from the database.
//  */
// router.get('/character/:charId', (req, res, next) => {
//   // TODO
// });

// Retrieve Characters - No Auth
/**
 * This route retrieves the list of characters made by the given user.
 * @route GET /api/v1/:username/characters
 * @group Character
 * @param {string} username.params.required - the user whose characters to retrieve.
 * @returns {object} 200 - list of characters for the given user.
 */
router.get('/:username/characters', async (req, res, next) => {
  try {
    const charList = await charModel.readByQuery({ user: req.params.username });
    res.status(200).send(charList);
  } catch (e) {
    next(e);
  }
});

// Delete Character - No Auth
/**
 * This route deletes the character with the matching charId from the database.
 * @route DELETE /api/v1/character/:charId
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
  } catch (e) {
    next(e);
  }
});

module.exports = router;
