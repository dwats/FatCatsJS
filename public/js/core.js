// public/core.js
var fatCatsFeeding = angular.module('fatCatsFeeding', []);

function mainController($scope, $http) {
  $scope.formData = {};
  $scope.quantity = 5;


  $http.get('/api/feedings')
    .success(function(data) {
      $scope.feedings = data;
    })
    .error(function(data) {
      console.log('ERR: '+data);
    });

  $http.get('/api/catfood')
    .success(function(data) {
      $scope.catfoods = data;
    })
    .error(function(data) {
      console.log('ERR: '+data);
    });

  $scope.createFeeding = function() {
    $http.post('/api/feedings', $scope.formData)
      .success(function(data){
        $scope.formData = {};
        $scope.feedings = data;
      })
      .error(function(data){
        console.log('ERR: '+data);
      });
  };

  $scope.deleteFeeding = function(id) {
    $http.delete('/api/feedings/'+id)
      .success(function(data) {
        $scope.feedings = data;
      })
      .error(function(data) {
          console.log('ERR: '+data);
      });
  };
}

fatCatsFeeding.filter('elapsed', function(){
  return function(date){
      if (!date) return;
      var time = Date.parse(date),
          timeNow = new Date().getTime(),
          difference = timeNow - time,
          seconds = Math.floor(difference / 1000),
          minutes = Math.floor(seconds / 60),
          hours = Math.floor(minutes / 60),
          days = Math.floor(hours / 24);
      if (days > 1) {
          return days + " days ago";
      } else if (days == 1) {
          return "1 day ago";
      } else if (hours > 1) {
          return hours + " hours ago";
      } else if (hours == 1) {
          return "an hour ago";
      } else if (minutes > 1) {
          return minutes + " minutes ago";
      } else if (minutes == 1){
          return "a minute ago";
      } else {
          return "a few seconds ago";
      }
  };
});
