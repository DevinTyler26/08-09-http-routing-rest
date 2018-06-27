'use strict';

const Car = require('../model/car');
const logger = require('../lib/logger');
const responses = require('../lib/response');

module.exports = (router) => {
  router.post('/api/v1/cars', (request, response) => {
    logger.log(logger.INFO, 'Route Car: POST /api/v1/cars');
    const newCar = new Car(request.body);
    newCar.save()
      .then((car) => {
        responses.sendJSON(response, 200, car);
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.INFO, `Route Car: bad request ${JSON.stringify(err.message)}`);
        responses.sendError(response, 400, err.message);
        return undefined;
      });
  });
    
  router.get('/api/v1/cars', (request, response) => {
    if (!request.url.query.id) {
      responses.sendError(response, 404, 'Your request needs an id');
      return undefined;
    }
    Car.findOne(request.url.query.id)
      .then((car) => {
        responses.sendJSON(response, 200, car);
      })
      .catch((err) => {
        console.log(err);
        responses.sendError(response, 404, err.message);
      });
    return undefined;
  });

  router.delete('/api/v1/cars', (request, response) => {
    if (!request.url.query.id) {
      responses.sendError(response, 404, 'Your request needs an id');
      return undefined;
    }
    Car.delete(request.url.query.id)
      .then((car) => {
        responses.sendJSON(response, 200, {
          result: `${car.make} has been deleted`
        })
      })
      .catch((err) => {
        console.log(err);
        responses.sendError(response, 404, err.message);
      });
    return undefined;
  });
};
