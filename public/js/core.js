angular.module('reminderApp', ['ngRoute', 'ngResource', 'angularMoment'])
  .factory('Reminders', ['$http', function ($http) {
    const reminders = [];
    reminders.push({ name: 'Feeding', warning: 9, http: $http.get('/api/feedings')});
    reminders.push({ name: 'Litter', warning: 48, http: $http.get('/api/litters')});
    reminders.push({ name: 'Plant Watering', warning: 120, http: $http.get('/api/waterings')});
    return reminders;
  }])
  .controller('ReminderController', ['$scope', 'Reminders', 'moment', function ($scope, Reminders, moment) {
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
    })

  }])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/templates/reminder.html',
        controller: 'ReminderController'
      });
  }]);

function getTimeSinceDate(moment, data) {
  if (data[0]) {
    if (moment().diff(data[0].datetime, 'days')) {
      return {
        time: moment().diff(data[0].datetime, 'days'),
        timename: 'day(s)'
      };
    }
    else if (moment().diff(data[0].datetime, 'hours')) {
      return {
        time: moment().diff(data[0].datetime, 'hours'),
        timename: 'hour(s)'
      };
    }
    else if (moment().diff(data[0].datetime, 'minutes')) {
      return {
        time: moment().diff(data[0].datetime, 'minutes'),
        timename: 'minute(s)'
      };
    }
    else if (moment().diff(data[0].datetime, 'seconds')) {
      return {
        time: moment().diff(data[0].datetime, 'seconds'),
        timename: 'second(s)'
      };
    }
  }
  return { time: 0, timename: '' };
}

function getWarningState(moment, data, warning) {
  if (data[0]) {
    if (moment().diff(data[0].datetime, 'hours') >= warning) return true;
  }
  return false;
}
