/* global angular */
angular.module('reminderApp', ['ngRoute', 'ngResource', 'angularMoment'])
  .factory('Reminders', ['$http', ($http) => {
    const reminders = [];
    reminders.push({ name: 'Feeding', warning: 9, http: $http.get('/api/feedings') });
    reminders.push({ name: 'Litter', warning: 48, http: $http.get('/api/litters') });
    reminders.push({ name: 'Plant Watering', warning: 120, http: $http.get('/api/waterings') });
    return reminders;
  }])

  .controller('ReminderController', ['$scope', 'Reminders', 'moment', ($scope, Reminders, moment) => {
    $scope.reminders = [];
    Reminders.forEach((reminder) => {
      reminder.http
        .success((data) => {
          $scope.reminders.push({
            name: reminder.name,
            warning: getWarningState(moment, data, reminder.warning),
            elapsed: getTimeSinceDate(moment, data),
            data: data.map(datedata => new Date(datedata.datetime))
          });
        })
        .error((data, status) => {
          console.log(data, status);
          $scope.reminders = [];
        });
      console.log($scope.reminders);
    });

  }])
  .config(['$routeProvider', ($routeProvider) => {
    $routeProvider
      .when('/', {
        templateUrl: '/templates/reminder.html',
        controller: 'ReminderController'
      });
  }]);

/**
 * Return a humanized duration between a predefined Date object and now
 * @param {Object} moment - the moment.js library
 * @param {Object} datetime - moment.js date object
 */
function getTimeSinceDate(moment, datetime) {
  const timeSince = { time: 0, timename: '' };
  if (!datetime) return timeSince;
  const prettyTime = moment
    .duration(datetime)
    .humanize()
    .split(' ')
    .map(getTitleCase);
  timeSince.time = prettyTime[0];
  timeSince.timename = prettyTime.slice(1).join(' ');
  return timeSince;
}

/**
 * Return a title case string.
 * @param {String} word - a string containing the word to be returned with title case
 * @return {String}
 */
function getTitleCase(word) {
  if (!word) return undefined;
  if (!isNaN(word)) return word;
  if (word.length === 1) return word.toUpperCase();
  return word[0].toUpperCase() + word.slice(1);
}

function getWarningState(moment, data, warning) {
  if (data[0]) {
    if (moment().diff(data[0].datetime, 'hours') >= warning) return true;
  }
  return false;
}
