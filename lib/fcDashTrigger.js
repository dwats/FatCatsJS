/**
 * @fileoverview Defines the Dash Button ARP packet listener class
 * and subsequent properties.
 * @author ejulius86@gmail.com (Eric Julius)
 */

'use strict';

const dashbutton = require('node-dash-button');
const request = require('request');

module.exports = (settings) => {
  const obj = {
    dashButtons: settings.dashButtons,
    apiUrl: settings.apiUrl
  };
  obj.listen = () => {
    const self = obj;
    const buttons = self.dashButtons.map(button => button.mac);
    const dash = dashbutton(buttons, null, null, 'all');

    dash.on('detected', (mac) => {
      const thisButton = obj.dashButtons.find(button => button.mac === mac);
      if (thisButton) {
        console.log(thisButton.name);
        const options = {
          url: self.apiUrl + thisButton.endpoint,
          form: thisButton.payload
        };
        request
          .post(options)
          .on('response', (res) => {
            console.log(res.statusCode);
          });
      }
    });
  };
  return obj;
};
