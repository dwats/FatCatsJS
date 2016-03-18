var dash_button = require('node-dash-button');
var dash = dash_button("74:75:48:8f:d9:7d");

dash.on("detected", function(){
  var d = new Date();
  console.log(d.toString() + ": Authorities have fed us.");
})
