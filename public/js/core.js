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
