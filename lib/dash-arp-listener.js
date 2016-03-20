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
      var nowTimezone = new Date(now.getTime());
      var CrudAction = require("./crud.js");
      var collection = "feedings"
      var url = 'mongodb://localhost:27017/fat_cats';
      var doc = {"datetime" : nowTimezone};

      var fatcatsDb = new CrudAction({
        collection: collection,
        url: url
      });

      fatcatsDb.insertDocument(doc);

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
