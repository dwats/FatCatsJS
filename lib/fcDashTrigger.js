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
 *    payload: { // wellformed object to be passed to API endpoint via POST as form }
 *  }]
 * }
 * </code></pre>
 *
 * @todo Refactor `if` statement method (?) into a standalone function (if this will work with factories).
 *
 * @module fcDashTrigger
 * @param {Object} settings - structured data regarding API end points, payloads, etc.
 * @return {Object} This returns a <code>dashTrigger</code> object. When the <code>listen()</code> method is invoked it will
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
        self.payloadDelivery(thisButton)
          .then((res) => {
            if (res.statusCode === 200) {
              console.log(`${new Date()}::Payload delivery to "${thisButton.endpoint}" responded with ${res.statusCode}`);
            }
            else if (res.statusCode >= 400 && res.statusCode <= 503) {
              throw Error(`Payload delivery failed with response code ${res.statusCode}`);
            }
          })
          .catch((err) => {
            console.log(`${new Date()}::Payload delivery to "${thisButton.endpoint}" resulted in error \n\t${err}`);
          });
      }
    });
  };

  /**
   * @method payloadDelivery
   * @summary When called the <code>button</code> argument's payload property is delivered to an API endpoint.
   * @param {Object} button - Contains information regarding API endpoint and payload.
   * @return {Object} A promise containing request response or error reject.
   */
  obj.payloadDelivery = (button) => {
    const self = obj;
    const datetime = new Function(button.payload.datetime);
    const options = {
      url: `${self.apiUrl}${button.endpoint}`,
      form: datetime()
    };
    console.log(`>>>> ENDPOINT_URL: ${options.url}`);
    return new Promise((resolve, reject) => {
      request
        .post(options)
        .on('response', (res) => {
          resolve(res);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  };

  return obj;
};
