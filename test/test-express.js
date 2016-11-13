const HttpServer = require('../lib/server.class.js');

const httpServer = new HttpServer({
  url: 'mongodb://localhost:27017/cats',
  path: '/eric/Documents/code/JavaScript/FatCatsJS'
});

httpServer.run();
