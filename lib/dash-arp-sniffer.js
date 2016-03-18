function dashwatch(settings) {
  this.settings = settings;
  this.sheetkey = settings.sheetkey;
  this.googauth = settings.googauth;
  this.dashmac = settings.dashmac;
};

dashwatch.prototype.start = function() {
  var dash_button = require('node-dash-button');
  var dash = dash_button(this.dashmac);

  dash.on("detected", function (){
    console.log("found");
  });
};

module.exports = {
  dashwatch
};
