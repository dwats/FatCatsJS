const config = require('../config.json');

const datetime = new Function(config.dashButtons[0].payload.datetime);
console.log(datetime());
