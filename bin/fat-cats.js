'use strict';
var DashWatch = require('../lib/dash-arp-listener.js');

var sheetkey = process.env.SHEETKEY;
var dashmac = process.env.DASHMAC;
var googauth = require('../fat-cats-558f85c4f2d6.json');

var fatcats = new DashWatch({
  sheetkey: sheetkey,
  googauth: googauth,
  dashmac: dashmac
});

fatcats.tokencheck();
fatcats.run();
