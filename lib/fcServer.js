/**
 * @fileoverview Defines the createServer factory. The returned object is an ExpressJS
 * server with a custom REST API.
 *
 * @author ejulius86@gmail.com (Eric Julius)
 */

'use strict';

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
const router = express.Router();
let server;

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
    const path = `${self.path}/public`;
    self.dbConnect(self.url)
      .then((result) => {
        console.log(result);
      }, (err) => {
        console.log(`Error connecting to MongooseDb @${self.url}\n${err}`);
      });
  };

  /**
   * @method dbConnect
   * @summary Attempt to connect to a Mongo Db
   * @private
   * @return {Promise} returns promise object with success or error.
   */
  obj.dbConnect = url =>
    new Promise((resolve, reject) => {
      try {
        mongoose.connect(url);
      }
      catch (err) {
        reject(err);
      }
      resolve(`Connection to MongoDb @${url} established.`);
    });
  return obj;
};
