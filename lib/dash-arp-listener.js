'use strict';

function DashWatch(settings) {
  this.settings = settings;
  this.sheetkey = settings.sheetkey;
  this.googauth = settings.googauth;
  this.dashmac = settings.dashmac;

  this.run = function() {
    var MongoClient = require('mongodb').MongoClient;
    var assert = require('assert');
    var ObjectId = require('mongodb').ObjectID;
    var url = 'mongodb://localhost:27017/fat_cats';
    var dateFormat = require('dateformat');
    var dash_button = require('node-dash-button');
    var dash = dash_button(this.dashmac);

    dash.on("detected", function (){
      var now = new Date();
      var nowFormat = dateFormat(now, "dddd, mmmm dS yyyy @ HH:MM:ss");
      var insertDocument = function(db, callback) {
        db.collection('feedings').insertOne({
          "datetime": now
        }, function(err, result) {
          assert.equal(err, null);
          console.log("The Authorities fed us " + nowFormat + ".");
          callback();
        });
      };
      MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        insertDocument(db, function() {
          db.close();
        })
      })
    });
  };

  this.tokencheck = function() {
    console.log('sheet:'+this.sheetkey);
    console.log('googauth:'+this.googauth);
    console.log('dashmac:'+this.dashmac);
  }

  return this;
}

module.exports = DashWatch;
