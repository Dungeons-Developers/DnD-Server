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
const mockServer = jest.fn(serverObj.start);

const Model = require('../lib/models/model.js');
const userSchema = require('../lib/models/users-schema.js');
const userModel = new Model(userSchema);


beforeAll(async () => {
  await mockRequest.post('/v1/api/character').send(
    {
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
    });
  await mockRequest.post('/v1/api/character').send({
    name: 'Goodbye',
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
  });
  let user = await mockRequest.post('/v1/api/signup').send({
    username: 'jName',
    password: 'jPass'
  });
})


describe('server', () => {
  it('has a homepage', async () => {
    let response = await mockRequest.get('/');

    expect(response.text).toBe('Homepage');
    expect(response.status).toBe(200);
  });
});

describe('signs in user', () => {
  it('signs in a user', async () => {
    let response = await mockRequest.post('/v1/api/user').send({
      username: 'jName',
      password: 'jPass'
    });
    expect(response.body.username).toBe('jName');
    expect(response.body.password).toBeUndefined();
  });

  it('does not sign in', async () => {
    let response = await mockRequest.post('/v1/api/user').send({
      username: 'jName',
      password: 'j'
    });

    expect(response.status).toBe(400);
  })
})

describe('create user endpoint', () => {
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

  it('does not allow same user', async () => {
    let response = await mockRequest.post('/v1/api/signup').send({
      username: 'jName',
      password: 'jPass'
    });
    expect(response.body.user).toBeFalsy();
  })
  
  it('can creates new characters', async () => {
    let object = {
      name: 'New Char',
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
      user: 'jName',      
    }
    let response = await mockRequest.post('/v1/api/character').send(object);

    expect(response.status).toBe(201);

    expect(response.body).toBeDefined;
  });
});

describe('get end point', () => {
  it('gets characters', async () => {
    let response = await mockRequest.get('/v1/api/username/characters');

      expect(response).toBeDefined();
      expect(response.body[0].name).toBe('hello');
  });

})
describe('delete', () => {
  it('deletes a character', async () => {
    let character = await mockRequest.get('/v1/api/username/characters');
    let charId = character.body[0]._id;

    let response = await mockRequest.delete(`/v1/api/character/${charId}`);
    expect(response.text).toBe(charId);
  })

})

describe('error handlers', () => {
  it('signin throws error', async () => {
    let response = await mockRequest.post('/v1/api/user').send({
    });

    console.log(response.body);
    console.log(response.status);

    expect(response.status).toBeDefined();
  })

  it('delete throws error', async () => {
    let response = await mockRequest.delete('/v1/api/character/');

    expect(response.status).toBe(404);
  });

  it('get character errors', async () => {
    let response = await mockRequest.get('/v1/api/user/character');

    expect(response.status).toBe(404);
  })

});
