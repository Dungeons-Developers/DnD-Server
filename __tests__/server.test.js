'use strict';

// test that we can create a user
// test that we are able to sign in
// test that you can create a character
// test if character already exists
// test if user already exists???
//
// test the response when not correct information
const serverObj = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(serverObj.server);

let object = {
  _id: 1,
  name: 'hello',
  class: 'Fighter',
  race: 'Gnome',
  alignment: 'Lawful Good',
  deity: 'Talos, God of Storms',
  proficient_skills: { skill_1: 'Intimidate', skill_2: 'Search' },
  equipment: {
    armor: 'Chain Mail',
    adventure_packs: 'Dungeoners Kit',
    weapons: { choice_1: 'Great Axe', choice_2: 'War Hammer' },
  },
  ability_scores: { str: 16, dex: 14, con: 15, int: 11, wis: 13, cha: 14 },
  user: 'username',
  __v: 0,
};

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
    let response = await mockRequest.post('/v1/api/character').send(object);

    expect(response.status).toBe(201);

    expect(response.body).toBeDefined;
  });
});
