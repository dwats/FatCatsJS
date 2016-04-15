/**
 * @fileoverview Defines the DashSwitch class and subsequent properties
 * @author ejulius86@gmail.com (Eric Julius)
 */
 /* jslint node: true */
 /* jshint esversion: 6 */
'use strict';
var CrudAction = require("./crud.js");

/**
 * Class definition for DashSwitch
 * @param {string} mac MAC address pressed Amazon Dash Button.
 * @param {object} settings Object containing MongoDB settings
 * @param {string} settings.url URL to MongoDb
 * @param {string} settings.collection Empty property to define collection name
 */
 /* TODO add pooping case */
 /* TODO add cleaning case */
class DashSwitch {
  route(mac, settings) {
    var self = this;
    switch (mac) {
      case "74:75:48:8F:D9:7D":
        settings.collection = 'feedings';
        self.logFeeding(settings);
        break;
      default:
        console.log("Unregistered Dash Button Press Detected.");
    }
  }
  logFeeding(settings) {
    var doc = {datetime: new Date()};
    var fatcatsDb = new CrudAction({
      collection: settings.collection,
      url: settings.url
    });
    fatcatsDb.create(doc);
    console.log('+1 ' + doc.datetime);
  }
  logDeposit(settings) {}
  logCleaning(settings) {}
}
/** @export */
module.exports = DashSwitch;
