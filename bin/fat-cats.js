'use strict';
var sheetkey = process.env.SHEETKEY;
var dashmac = process.env.DASHMAC;
var googauth = require('../fat-cats-558f85c4f2d6.json');
var dashwatch = require('../lib/dash-arp-sniffer.js');

var dashwatch = new dashwatch({
  sheetkey: sheetkey,
  googauth: googauth,
  dashmac: dashmac
});

dash_sniffer.start();
