'use strict';

function DashWatch(settings) {
  this.settings = settings;
  this.sheetkey = settings.sheetkey;
  this.googauth = settings.googauth;
  this.dashmac = settings.dashmac;

  this.run = function() {
    var dateFormat = require('dateformat');
    var dash_button = require('node-dash-button');
    var dash = dash_button(this.dashmac);

    dash.on("detected", function (){
      var now = new Date();
      var nowTimezone = new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
      var CrudAction = require("./crud.js");
      var collection = "feedings"
      var url = 'mongodb://localhost:27017/fat_cats';
      var doc = {};

      var fat_catsDb = new CrudAction({
        collection: collection,
        url: url
      });

      doc.datetime = nowTimezone;
      fat_catsDb.insertDocument(doc);

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
