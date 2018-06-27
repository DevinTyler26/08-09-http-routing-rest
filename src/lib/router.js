'use strict';

const logger = require('./logger');
const bodyParser = require('./body-parser');
const responses = require('./response');

module.exports = class Router {
  constructor() {
    this.routes = {
      GET: {},
      POST: {},
      PUT: {},
      DELETE: {},
    };
  }

  get(endpoint, cb) {
    this.routes.GET[endpoint] = cb;
  }

  post(endpoint, cb) {
    this.routes.POST[endpoint] = cb;
  }

  put(endpoint, cb) {
    this.routes.PUT[endpoint] = cb;
  }

  delete(endpoint, cb) {
    this.routes.DELETE[endpoint] = cb;
  }

  route() {
    return (req, res) => {
      Promise.all([bodyParser(req)])
        .then(() => {
          const reqResCb = this.routes[req.method][req.url.pathname];
          const isFunction = typeof reqResCb === 'function';
          if (isFunction) return reqResCb(req, res);
          responses.sendError(res, 400, 'Route not registered ');
          return undefined;
        })
        .catch((err) => {
          logger.log(logger.INFO, JSON.stringify(err));
          responses.sendError(res, 404, 'Route not found');
          return undefined;
        });
    };
  }
};
