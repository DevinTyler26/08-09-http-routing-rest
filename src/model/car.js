'use strict';

const uuid = require('uuid/v4');
const storage = require('../lib/storage');

module.exports = class Car {
  constructor(config) {
    this._id = uuid();
    this.createdOn = new Date();
    this.make = config.make;
    this.model = config.model || '';
  }

  save() {
    return storage.save('Cars', this);
  }
    
  static findOne(_id) {
    return storage.get('Cars', _id);
  }

  static deleteOne(_id) {
    return storage.delete(_id);
  }
};
