'use strict';

const superagent = require('superagent');
const server = require('../lib/server');
const Car = require('../model/car');

const apiUrl = 'http://localhost:5000/api/v1/cars';

const mockRes = {
  make: 'test make',
  model: 'test model',
};

beforeAll(() => server.start(5000));
afterAll(() => server.stop());

describe('POST to /api/v1/cars', () => {
  test('200 for successful saving of a new car', () => {
    return superagent.post(apiUrl)
      .send(mockRes)
      .then((response) => {
        expect(response.body.make).toEqual(mockRes.make);
        expect(response.body.model).toEqual(mockRes.model);
        expect(response.body._id).toBeTruthy();
        expect(response.status).toEqual(200);
      })
      .catch((err) => {
        throw err;
      });
  });

  test('400 for a bad request', () => {
    return superagent.post(apiUrl)
      .send({})
      .then((response) => {
        throw response;
      })
      .catch((err) => {
        expect(err.status).toEqual(400);
        expect(err).toBeInstanceOf(Error);
      });
  });
});

describe('GET /api/v1/cars', () => {
  let mockResForGET;
  beforeEach((done) => {
    const newCar = new Car(mockRes);
    newCar.save()
      .then((car) => {
        mockResForGET = car;
        done();
      })
      .catch((err) => {
        throw err;
      });
  });

  test('200 successful GET request', () => {
    return superagent.get(`${apiUrl}?id=${mockResForGET._id}`)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.make).toEqual(mockResForGET.make);
        expect(response.body.model).toEqual(mockResForGET.model);
        expect(response.body.createdOn).toEqual(mockResForGET.createdOn.toISOString());
      })
      .catch((err) => {
        throw err;
      });
  });

  test('404 bad GET request', () => {
    return superagent.get(`${apiUrl}`)
      .then((response) => {
        throw err;
      })
      .catch((err) => {
        expect(err.status).toEqual(404);
      });
  });
});

describe('DELETE /api/v1/cars', () => {
  let mockResForGET;
  beforeEach((done) => {
    const newCar = new Car(mockRes);
    newCar.save()
      .then((car) => {
        mockResForGET = car;
        done();
      })
      .catch((err) => {
        throw err;
      });
  });
  test('200 successful DELETE request', () => {
    console.log(`DELETING ${mockResForGET._id}`);
    return superagent.delete(`${apiUrl}?id=${mockResForGET._id}`)
      .then((response) => {
        expect(response.status).toEqual(200);
      })
      .catch((err) => {
        throw err;
      });
  });
  test('404 bad DELETE request', () => {
    return superagent.delete(`${apiUrl}`)
      .then((response) => {
        throw err;
      })
      .catch((err) => {
        expect(err.status).toEqual(404);
      });
  });
});
describe('Bad request for no input', () => {
  test('404 bad request', () => {
    return superagent.get(`${apiUrl}`)
      .then((response) => {
        throw err;
      })
      .catch((err) => {
        expect(err.status).toEqual(404);
      });
  });
});
