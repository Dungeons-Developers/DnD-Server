const express = require('express');

const auth = require('../middleware/auth');
const { userModel } = require('../models');

const router = express.Router();

// Login - auth
/**
 * This route verifies the user login credentials it recieves.
 * @route GET /v1/api/login
 * @group User
 * @returns {object} 200 - the user record from the database
 */
router.get('/login', auth, async (req, res, next) => {
  try {
    if (req.user) {
      req.user.password = undefined;
      const user = req.user;
      const token = await user.generateToken(86400); // 1 day expiration
      res.send({ user, token });
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
 * @route POST /v1/api/signup
 * @group User
 * @param {string} username.body.required - the username to save for the user.
 * @param {string} password.body.required - the password to hash and save for the user.
 * @returns {object} 200 - the newly created user object.
 */
router.post('/user', async (req, res, next) => {
  try {
    if (!req.body || !req.body.username) return res.status(400).send();

    const user = await userModel.create({
      username: req.body.username,
      password: req.body.password,
    });
    user.password = undefined;
    const token = await user.generateToken(86400); // 1 day expiration

    res.status(201).send({ user, token });
  } catch (e) {
    next(e);
  }
});

// ReadOne
// TODO

// ReadMany
// TODO

// Update
// TODO

// Delete
// TODO

module.exports = router;
