'use strict';

class Model {
  constructor(schema) {
    this.schema = schema;
  }

  async create(record) {
    try {
      let recordToAdd = new this.schema(record);
      return await recordToAdd.save();
    }
    catch(e) {
      console.error('ERROR CREATING RECORD', e);
      return false;
    } 
  }

  async read(_id) {
    try {
      let record = await this.schema.findOne({_id});
      return record;
    }
    catch(e) {
      console.error('ERROR FINDING RECORD', e);
      return false;
    }
  }

  async readByQuery(query) {
    try {
      let records = await this.schema.find(query);
      return records;
    }
    catch(e) {
      console.error('ERROR FINDING RECORD', e);
      return false;
    }
  }

  async update(_id, changedRecord) {
    try {
      let newRecord = await this.schema.findByIdAndUpdate({_id}, changedRecord);
      console.log('Updated Record:', newRecord);
      return newRecord;
    }
    catch(e) {
      console.error('ERROR UPDATING RECORD', e);
      return false;
    }
  }
  
  async delete(_id) {
    try {
      let deletedRecord = await this.schema.deleteOne({_id});
      return _id;
    }
    catch(e) {
      console.error('ERROR DELETING RECORD', e);
      return false;
    }
  }
}

module.exports = Model;