const express = require('express');

const auth = require('../middleware/auth');
const { campaignModel } = require('../models');

const router = express.Router();

// Create Campaign
/**
 * This route adds a new campaign record to the database.
 * @route POST /v1/api/campaign
 * @group Campaign
 * @param {string} user.body.required - the username who created the campaign.
 * @param {array} characters.body.required - the characters involved in the campaign
 * @param {string} title.body.required - the title of the new campaign.
 * @param {string} setting.body.required - the setting of the new campaign
 * @param {string} description.body.required - the description of the new campaign
 * @param {array} notes.body - the notes associated with this new campaign
 * @param {boolean} isComplete.body.required - the true/false value of whether the campaign is complete or not.
 * @returns {object} 200 - the newly created/added campaign record
 */
router.post('/campaign', auth, async (req, res, next) => {
  try {
    if (!req.body) return res.status(400).send();

    const campaign = await campaignModel.create({ ...req.body });
    res.status(201).send(campaign);
  } catch (e) {
    next(e);
  }
});

// Read One Campaign
/**
 * This route retrieves the campaign with the matching id from the database.
 * @route GET /v1/api/campaign/:camId'
 * @group Campaign
 * @param {string} camId.params.required - the id of the campaign you want to retrieve.
 * @returns {object} 200 - the campaign record from the database.
 */
router.get('/campaign/:camId', auth, async (req, res, next) => {
  try {
    const oneCampaign = await campaignModel.read(req.params.camId);
    res.status(200).send(oneCampaign);
  } catch (e) {
    next(e);
  }
});

// Read Campaigns
/**
 * This route retrieves the list of campaigns made by the given user.
 * @route GET /v1/api/:username/campaigns
 * @group Campaign
 * @param {string} username.params.required - the user whose campaigns to retrieve.
 * @returns {object} 200 - list of campaigns for the given user.
 */
router.get('/:username/campaigns', auth, async (req, res, next) => {
  try {
    const campaignList = await campaignModel.readByQuery({
      user: req.params.username,
    });
    res.status(200).send(campaignList);
  } catch (e) {
    next(e);
  }
});

// Update Campaign
/**
 * This route updates the campaign with the given id in the database.
 * @route PATCH /v1/api/campaign/:camId
 * @group Campaign
 * @param {string} camId.params.required - the id of the campaign you want to retrieve
 * @returns {object} 200 - the newly updated campaign record
 */
router.patch('/campaign/:camId', auth, async (req, res, next) => {
  try {
    let updatedCampaign = await campaignModel.update(
      req.params.camId,
      req.body,
    );
    res.status(200).send(updatedCampaign);
  } catch (e) {
    next(e);
  }
});

// Delete Campaign
/**
 * This route deletes the campaign with the matching camId from the database.
 * @route DELETE /v1/api/campaign/:camId
 * @group Campaign
 * @param {string} camId.params.required - the id of the character you want to delete.
 * @returns {object} 200 - the id of the deleted character.
 */
router.delete('/campaign/:camId', auth, async (req, res, next) => {
  try {
    const id = await campaignModel.delete(req.params.camId);
    res.status(200).send(id);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
