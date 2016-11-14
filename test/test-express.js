const httpServer = require('../lib/fcServer.js');

const server = httpServer({
  url: 'mongodb://localhost:27017/cats',
  path: '/eric/Documents/code/JavaScript/FatCatsJS'
});

server.run();
