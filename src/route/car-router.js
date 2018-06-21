'use strict';

const Car = require('../model/car');
const logger = require('../lib/logger');
const responses = require('../lib/response');

module.exports = (router) => {
  router.post('api/v1/car', (req, res) => {
    logger.log(logger.INFO, 'Route Car: POST /api/v1/car');
    const newCar = new Car(req.body);
    newCar.save()
      .then((car) => {
        responses.sendJSON(res, 200, car);
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.INFO, `Route Car: bad req ${JSON.stringify(err.message)}`);
        responses.sendError(res, 400, err.message);
        return undefined;
      });
  });
    
  router.get('/api/v1/car', (req, res) => {
    if (!req.url.query.id) {
      responses.sendError(res, 404, 'Your request needs an id');
      return undefined;
    }
    Car.findOne(req.url.query.id)
      .then((car) => {
        responses.sendJSON(res, 200, car);
      })
      .catch((err) => {
        console.log(err);
        responses.sendError(res, 404, err.message);
      });
    return undefined;
  });
};
