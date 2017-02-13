'use strict';

const config = require('./config.json');
const httpServer = require('./lib/fcServer.js')(config.httpServer);
const dashTrigger = require('./lib/fcDashTrigger.js')(config);

httpServer.run();
dashTrigger.listen();
