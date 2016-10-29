'use strict';

const createDashTrigger = require('../lib/fcDashTrigger.js');

const testSettings = {
  apiUrl: 'http://localhost:8080/api',
  dashButtons: [{
    name: 'Cat Feeding',
    mac: '74:75:48:8F:D9:7D',
    endpoint: '/feeding',
    payload: {
      datetime: new Date(),
      food: '5726b06124bf08692832fefd',
      amount: '1/4'
    }
  }, {
    name: 'Litter Cleaning',
    mac: 'f0:27:2d:fc:3b:99',
    endpoint: '/litter',
    payload: {
      datetime: new Date()
    }
  }, {
    name: 'Plant Watering',
    mac: '00:bb:3a:23:00:17',
    endpoint: '/watering',
    payload: {
      datetime: new Date()
    }
  }]
};

const dashTrigger = createDashTrigger(testSettings);
dashTrigger.listen();
