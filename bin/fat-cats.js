'use strict';
var dash_sniffer = require('../lib/dash-arp-sniffer.js');

var sheetkey = process.env.SHEETKEY;
var googauth = require('../fat-cats-558f85c4f2d6.json');
var dashmac = process.env.DASHMAC;

var dash_sniffer = new dash_sniffer({
  sheetkey: sheetkey,
  googauth: googauth,
  dashmac: dashmac
})

dash_sniffer.start();
