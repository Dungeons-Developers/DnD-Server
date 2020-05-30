const express = require('express');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const userSchema = require('../models/users/users-schema');
const Model = require('../models/model');
const charSchema = require('../models/character/character-schema');

const userModel = new Model(userSchema);
const router = express.Router();
const charModel = new Model(charSchema);


// Login - No Auth
router.post('/user', async (req, res, next) => {
  try {
    if (!req.body || !req.body.username) return res.status(400).send('1');
  
    const response = await userModel.readByQuery({ username: req.body.username });
  
    const user = response[0] || {};
  
    if (!user.username) return res.send({});
  
    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      user.password = undefined;
      res.send(user);
    } else {
      res.status(400).send('3');
    }
  } catch(e) {
    next(e);
  }
});

// Create User - No Auth
router.post('/signup', async (req, res, next) => {
  try {
    if (!req.body || !req.body.username) return res.status(400).send();
  
    const user = await userModel.create({ username: req.body.username, password: req.body.password });
    user.password = undefined;
    res.status(201).send(user);
  } catch(e) {
    next(e);
  }
});

// Create Character - Auth
router.post('/character', async (req, res, next) => {
  try {
    if (!req.body) return res.status(400).send();
  
    const character = await charModel.create({...req.body});
    res.status(201).send(character);
  } catch(e) {
    next(e);
  }
});

// Update Character - Auth
router.patch('/character/:charId', (req, res, next) => {
  // TODO
});

// Retrieve Character - Auth
// // Won't need this until front-end
// router.get('/character/:charId', (req, res, next) => {
//   // TODO
// });

// Retrieve Characters - Auth
router.get('/:username/characters', async (req, res, next) => {
  try {
    const charList = await charModel.readByQuery({user: req.params.username});
  
    res.status(200).send(charList);
  } catch(e) {
    next(e);
  }
});

router.delete('/character/:charId', async (req, res, next) => {
  try {
    console.log('Inside delete');
    const id = await charModel.delete(req.params.charId);
    console.log('id:', id);
    res.status(200).send(id);
  } catch(e) {
    next(e);
  }
});

router.delete('/test/:_id', async (req, res, next) => {
  console.log('id', req.params._id);
  res.send(req.params._id);
});

// router.get('/test', async (req, res, next) => {
//   res.send('TEST');
// });

module.exports = router;
