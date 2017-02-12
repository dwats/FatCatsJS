const app = angular.module('reminderApp', ['ngRoute']);

app
  .controller('ReminderController', ['$scope', function ($scope) {
    /**
    let exampleReminderJSON = {
      title: '',
      endpoint: '',
      warningNumber: 0
    }
    */
    function getReminders() {
      const arr = [];
      for (let i = 0; i < (Math.random() * (5 - 1)) + 1; i++) {
        arr.push({ time: Math.round((Math.random() * (24 - 0)) + 0) });
      }
      return arr;
    }
    $scope.refresh = function () {
      console.log("boop");
      $scope.$destroy
      $scope.reminders = getReminders();
    };

  }])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/templates/reminder.html',
        controller: 'ReminderController'
      });
  }]);
