'use strict';

const logger = require('./logger');

const storage = module.exports = {};
const memory = {};

storage.save = (schema, item) => {
  return new Promise((resolve, reject) => {
    if (!schema) return reject(new Error('Cannot create new item, scheam required'));
    if (!item || !item.title) return reject(new Error('Cannot create new item, item and title are required'));
    if (!memory[schema]) memory[schema] = {};
    memory[schema][item._id] = item;
    logger.log(logger.INFO, `Storage fetching ${JSON.stringify(item)}`);
    return Promise.resolve(item);
  });
};

storage.get = (schema, _id) => {
  if (memory[schema][_id]) {
    logger.log(logger.INFO, `Storage: fetching ${JSON.stringify(memory[schema][_id], null, 2)}`);
    return Promise.resolve(memory[schema][_id]);
  }
  return Promise.reject(new Error(`${_id} not found`));
}; 
