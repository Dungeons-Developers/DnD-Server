'use strict';

const swagger = (app) => require('express-swagger-generator')(app);

const options = {
  swaggerDefinition: {
    info: {
      description: 'This is the DnD Character Creator Server API',
      title: 'DnD Server',
      version: '1.0.0',
    },
    host: 'localhost:3000',
    basePath: '/',
    produces: ['application/json', 'text/html'],
    schemes: ['http'],
  },
  basedir: __dirname, //app absolute path
  files: ['../lib/server.js', '../lib/routes/*.js', '../lib/models/*.js'], //Path to the API handle folder
};

module.exports = { swagger, options };
