const HttpServer = require('../lib/server.class.js');
const request = require('request');

const httpServer = new HttpServer({
  url: 'mongodb://localhost:27017/cats',
  path: '/eric/Documents/code/JavaScript/FatCatsJS'
});

httpServer.run();

const options = {
  url: 'http://192.168.1.18:8080/api/litter',
  form: {
    datetime: new Date()
  }
};

request.post(options, (err) => {
  if (err) {
    console.log(err);
  }
});

request('http://localhost:8080/api/litters', (err, res, body) => {
  console.log(body);
});

request('http://192.168.1.18:8080/api/quit');
