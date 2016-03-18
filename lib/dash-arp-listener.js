'use strict';

function DashWatch(settings) {
  this.settings = settings;
  this.sheetkey = settings.sheetkey;
  this.googauth = settings.googauth;
  this.dashmac = settings.dashmac;

  this.run = function() {
    var dash_button = require('node-dash-button');
    var dash = dash_button(this.dashmac);

    dash.on("detected", function (){
      console.log("found");
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
