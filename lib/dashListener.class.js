/**
 * @fileoverview Defines the Dash Button ARP packet listener class
 * and subsequent properties.
 * @author ejulius86@gmail.com (Eric Julius)
 */
/* jslint node: true */
/* jshint esversion: 6 */
'use strict';
var DashButton = require('node-dash-button');

/**
 * Class definition for DashWatch
 * TODO finish commenting
 * TODO Rewrite in an ES6 compliant format.
 */
class DashListener {
  constructor(settings) {
    this.settings = settings;
    this.dashmac = settings.dashmac;
    this.url = settings.url;
    this.collection = settings.collection;
  }
  /**
   * Run Dash Listener and await "detected".
   * @see DashSwitch
   * @see node-dash-button
   */
  run() {
    var self = this;
    var dash = DashButton(self.dashmac);
    dash.on("detected", function (mac){
        var DashSwitch = require('./dashSwitch.class.js');
        var dashSwitch = new DashSwitch();
        dashSwitch.route(mac, {url:self.url, collection:''});
    });
  }
}

module.exports = DashListener;
