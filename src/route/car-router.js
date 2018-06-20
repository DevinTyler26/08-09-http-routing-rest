'use strict';

const Note = require('../model/car');
const logger = require('../lib/logger');
const responses = require('../lib/response');

module.exports = (router) => {
    router.post('api/v1/car', (req, res) => {
        logger.log(logger.INFO, 'Route Note: POST /api/v1/car');
        const newCar = new Car(req.body);
        newCar.save()
        .then((car) => {
            responses.sendJSON((response, 200, car);
            return undefined
        })
        .catch((err) => {
            logger.log(logger.INFO, `Route Note: bad req ${JSON.stringify(err.message)}`);
            responses.sendError(response, 400, err.message);
            return undefined;
        });
        });
    
    router.get('/api/v1/car', (req, res) => {
        if (!req.url.query.id) {
            responses.sendError(response, 404, 'Your request needs an id')
            return undefined;
        }
        Car.findOne(req.url.query.id)
        .then((note) => {
            responses.sendJSON(response, 200, car)
        })
        .catch((err) => {
            console.log(err);
            responses.sendError(response, 404, err.message);
        })
        return undefined;
    })
};
