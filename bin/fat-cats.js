/* jslint node: true */
/* jshint esversion: 6 */
'use strict';
var DashWatch = require('../lib/dashListener.class.js');
var url = process.env.DBURL;
var collection = process.env.DBCOL;
var dashmac = process.env.DASHMAC;

var fatcats = new DashWatch({
  dashmac: dashmac,
  url:url,
  collection: collection
});

fatcats.run();
