'use strict';

const serverObj = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');

const Model = require('../lib/models/model.js');
const userSchema = require('../lib/models/users-schema.js');
const charSchema = require('../lib/models/character-schema.js');
const userModel = new Model(userSchema);
const charModel = new Model(charSchema);


const mockRequest = supergoose(serverObj.server);

beforeAll(async () => {
  await userModel.create({
    username: 'jName',
    password: 'jPass'
  });
  await charModel.create(
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
      user: 'jName',
    });
  await charModel.create({
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
    user: 'jName',  
  });
});


describe('create user', () => {
  it('creates user', async () =>{
    let response = await userModel.create({
      username: 'jJackson',
      password: 'jPass',
    })

    expect(response).toBeTruthy();
    expect(response.username).toBe('jJackson');
  });

  it('throws error', async () => {
    let response = await userModel.create({
      username: 'jJackson',
      password: '',
    });

    expect(response).toBeFalsy();
  })
});

describe('reads character', () => {
  it('reads by query and deletes character', async () => {
    let response = await charModel.readByQuery( {user: 'jName'});
    expect(response.length).toBe(2);
    
    let charID = response[0]._id;
    let delResult = await charModel.delete(charID);
    expect(delResult).toBe(charID);
  });

  it('reads character', async () => {
    let charQuery = await charModel.readByQuery( {user: 'jName' });
    let charID = charQuery[0]._id;
    let response = await charModel.read( {_id: charID} );

    expect(response).toBeTruthy();
  })

});

describe('errors', () => {
  it('hits read error', async () => {
    let response = await charModel.read( {_id: null });

    expect(response).toBeFalsy();
  });

  it('hits delete error', async () => {
    let response = await charModel.delete( { _id: null });

    expect(response).toBeFalsy();
  });

  it('hits readbyquery error', async () => {
    let response = await charModel.readByQuery( { user: null });

    expect(response).toStrictEqual([]);
  })
})


    
