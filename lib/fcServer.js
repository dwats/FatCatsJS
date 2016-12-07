/**
 * @fileoverview Defines the createServer factory. The returned object is an Express
 * server with defined routes.
 *
 * @author ejulius86@gmail.com (Eric Julius)
 */

'use strict';

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const routes = require('./routes');

const app = express();

module.exports = (config) => {
  const obj = {
    url: config.url,
    path: config.path
  };

  /**
   * @method run
   * @summary Begin listening on a given port for http requests.
   */
  obj.run = () => {
    const self = obj;
    const path = `${self.path}public`;

    mongoose
      .connect(self.url)
      .then((result) => {
        console.log(result);
        app.use(express.static(path));
        app.use(morgan('dev'));
        app.use(bodyParser.urlencoded({ extended: 'true' }));
        app.use(bodyParser.json());
        app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
        app.use(methodOverride());
        app.use('/', express.static(path));
        app.use('/api', routes(express, mongoose));
        app.listen(8080, () => {
          console.log('Listening on port 8080');
        });
      })
      .catch((err) => {
        console.log(`Error connecting to MongooseDb @${self.url}\n${err}`);
      });

  };

  return obj;
};
