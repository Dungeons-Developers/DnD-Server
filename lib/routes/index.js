const express = require('express');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const userSchema = require('../models/users/users-schema');
const Model = require('../models/model');

const userModel = new Model(userSchema);
const router = express.Router();

// Login - No Auth
router.post('/user', async (req, res, next) => {
  if (!req.body || !req.body.username) return res.status(400).send();
  const response = await userModel.readByQuery({ username: req.body.username });
  const user = response[0];
  if (!user.username) return res.status(404).send('this is the log');

  const match = await bcrypt.compare(req.body.password, user.password);
  if (match) {
    delete user.password;
    res.send(user);
  } else {
    res.status(400).send();
  }
});

// Create User - No Auth
router.post('/signup', (req, res, next) => {
  // TODO
});

// Create Character - Auth
router.post('/character', (req, res, next) => {
  // TODO
});

// Update Character - Auth
router.patch('/character/:charId', (req, res, next) => {
  // TODO
});

// Retrieve Character - Auth
router.get('/character/:charId', (req, res, next) => {
  // TODO
});

// Retrieve Characters - Auth
router.get('/:userId/characters', (req, res, next) => {
  // TODO
});

module.exports = router;
