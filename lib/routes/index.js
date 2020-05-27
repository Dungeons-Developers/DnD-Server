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
  const user = response[0] || {};
  if (!user.username) return res.status(404).send();

  const match = await bcrypt.compare(req.body.password, user.password);
  if (match) {
    user.password = undefined;
    res.send(user);
  } else {
    res.status(400).send();
  }
});

// Create User - No Auth
router.post('/signup', async (req, res, next) => {
  if (!req.body || !req.body.username) return res.status(400).send();

  console.log(req.body.username);
  const user = await userModel.create({ username: req.body.username, password: req.body.password });
  user.password = undefined;
  res.status(201).send(user);
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
