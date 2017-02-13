angular.module('reminderApp', ['ngRoute', 'ngResource'])
  .factory('Reminders', ['$http', function ($http) {
    const obj = [];
    obj.push($http.get('/api/feedings'));
    obj.push($http.get('/api/litters'));
    obj.push($http.get('/api/waterings'));
    return Promise.all(obj).then(values => {
      return values;
    })
  }])
  .controller('ReminderController', ['$scope', 'Reminders', function ($scope, Reminders) {
    console.log(Reminders);
    Reminders
      .success(function(data) {
        $scope.reminders = data;
      })
      .error(function(data, status){
        console.log(data, status);
        $scope.todos = [];
      });
  }])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/templates/reminder.html',
        controller: 'ReminderController'
      });
  }]);
