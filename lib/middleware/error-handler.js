'use strict';

function errorHandler(error, req, res, next) {
  res.status(error.status).send(error.message);
}

module.exports = errorHandler;