'use strict';
var dash_sniffer = require('../lib/dash-arp-sniffer.js');

var sheetkey = process.env.SHEETKEY;
var dashmac = process.env.DASHMAC;
var googauth = require('../fat-cats-558f85c4f2d6.json');

var dash_sniffer = new dash_sniffer({
  sheetkey: sheetkey,
  googauth: googauth,
  dashmac: dashmac
});

dash_sniffer.start();
