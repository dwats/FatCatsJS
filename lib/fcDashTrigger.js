/**
 * @fileoverview Defines the createDashTrigger factory. The returned Object listens
 * to local network activity for ARP packets (handshakes) and when encountered
 * compares the originating MAC address to a list of dash button MAC addresses
 * provided on instantiation to the settings property.
 *
 * @author ejulius86@gmail.com (Eric Julius)
 */

'use strict';

const dashbutton = require('node-dash-button');
const request = require('request');

/**
 * @summary Creates a dashTrigger object
 *
 * @description On ARP packet detection the originating device MAC address is compared to
 * the settings.dashButtons property. If a match is found the endpoint and payload
 * are used to make an API POST call.
 * <br/><br/>
 * The settings object should be a well formed Object with a predefined structure.
 * <pre><code>
 * {
 *  apiUrl: 'http://foo/api',
 *  dashButtons: [{
 *    name: 'A Meaningful Name',
 *    mac: '00:00:00:00:00:00',
 *    endpoint: '/bar',
 *    payload: { // wellformed object to be passed to API endpoint via POST }
 *  }]
 * }
 * </code></pre>
 *
 * @todo Refactor `if` statement method (?) into a standalone function (if this will work with factories).
 *
 * @module fcDashTrigger
 * @param {Object} settings - structured data regarding API end points, payloads, etc.
 * @return {Object} This returns a dashTrigger object that when listen() is called will
 *    listen for ARP packets and respond to MAC address matches accordingly.
 */
module.exports = (settings) => {
  const obj = {
    dashButtons: settings.dashButtons,
    apiUrl: settings.apiUrl
  };
  /**
   * @method listen
   * @summary Start listening (on the local network) for ARP packets
   */
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
