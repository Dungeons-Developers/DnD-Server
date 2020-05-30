'use strict';

// test that we can create a user
// test that we are able to sign in
// test that you can create a character
// test if character already exists
// test if user already exists???
// 
// test that it is encrypted
const serverObj = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(serverObj.server);

describe('happy path', () => {
  it('can create a user', async () => {
    let response = await mockRequest.post('/v1/api/signup').send({
      username: 'kJackson',
      password: 'kPass',
    });

    expect(response.status).toBe(201);

    expect(response.body._id).toBeDefined();
    expect(response.body.password).toBeUndefined();
    expect(response.body.password).not.toBe('kPass');
  });

  it('can creates new characters', async () => {
    let response = await mockRequest.post('/v1/api/character').setEncoding({
      user: 'kJackson',
      name: 'Dirrbick',
      class: 'Fighter',
      race: 'Dwarf',
      abilityScores: 
      alignment: { type: String},
      deity: { type: String },
      skills: { type: Object },
      equipment: { type: Object },
      level: { type: Number },
    })
  })
});
