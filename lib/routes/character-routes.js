const express = require('express');

const auth = require('../middleware/auth');
const { charModel } = require('../models');

const router = express.Router();

// Create Character
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
  } catch (e) {
    next(e);
  }
});

// Read One Character
/**
 * This route retrieves the character with the matching id from the database.
 * @route GET /v1/api/character/:charId'
 * @group Character
 * @param {string} charId.params.required - the id of the character you want to retrieve.
 * @returns {object} 200 - the character record from the database.
 */
router.get('/character/:charId', auth, async (req, res, next) => {
  try {
    const oneChar = await charModel.read(req.params.charId);
    res.status(200).send(oneChar);
  } catch (e) {
    next(e);
  }
});

// Read Characters
/**
 * This route retrieves the list of characters made by the given user.
 * @route GET /v1/api/:username/characters
 * @group Character
 * @param {string} username.params.required - the user whose characters to retrieve.
 * @returns {object} 200 - list of characters for the given user.
 */
router.get('/:username/characters', auth, async (req, res, next) => {
  try {
    const charList = await charModel.readByQuery({ user: req.params.username });
    res.status(200).send(charList);
  } catch (e) {
    next(e);
  }
});

// Update Character
/**
 * This route updates the character with the given id in the database.
 * @route PATCH /v1/api/character/:charId
 * @group Character
 * @param {string} charId.params.required - the id of the character you want to retrieve
 * @returns {object} 200 - the newly updated character record
 */
router.patch('/character/:charId', auth, async (req, res, next) => {
  try {
    console.log('ID:', req.params.charId);
    console.log('REQ.BODY', req.body);
    let updatedChar = await charModel.update(req.params.charId, req.body);
    console.log('UPDATED CHAR', updatedChar);
    res.status(200).send(updatedChar);
  } catch (e) {
    next(e);
  }
});

// Delete Character
/**
 * This route deletes the character with the matching charId from the database.
 * @route DELETE /v1/api/character/:charId
 * @group Character
 * @param {string} charId.params.required - the id of the character you want to delete.
 * @returns {object} 200 - the id of the deleted character.
 */
router.delete('/character/:charId', auth, async (req, res, next) => {
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
