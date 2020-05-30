'use strict';

function errorHandler(err, req, res, next) {
  res.send(err);
}

module.exports = errorHandler;