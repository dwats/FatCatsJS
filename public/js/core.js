// public/core.js
var fatCatsFeeding = angular.module('fatCatsFeeding', []);

fatCatsFeeding.controller('Controller', ['$scope', '$http', function($scope, $http) {
  $scope.formData = {};
  $scope.quantity = 5;

  /**
   * Set $scope.feedings to feedings API get results.
   */
  $http.get('/api/feedings')
    .success(function(data) {
      $scope.feedings = data;
    })
    .error(function(data) {
      console.log('ERR: '+data);
    });

  /**
   * Set $scope.catfoods to catfoods API get results.
   */
  $http.get('/api/catfood')
    .success(function(data) {
      $scope.catfoods = data;
    })
    .error(function(data) {
      console.log('ERR: '+data);
    });

  /**
   * POST form results to /api/feedings
   */
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

  /**
   * DELETE by ID
   */
  $scope.deleteFeeding = function(id) {
    $http.delete('/api/feedings/'+id)
      .success(function(data) {
        $scope.feedings = data;
      })
      .error(function(data) {
          console.log('ERR: '+data);
      });
  };
}]);

fatCatsFeeding.directive('myElapsed', ['$interval', function($interval) {
  function link(scope, element, attr) {
    var timeoutId;

    function updateTime() {
      element.text(getElapsed(scope.feedings[0].datetime));
    }

    scope.$watch(attr.myCurrentTime, function(value) {
      updateTime();
    });

    element.on('$destroy', function() {
      $interval.cancel(timeoutId);
    });

    timeoutId = $interval(function() {
      updateTime();
    }, 1000);
  }
  return {
    link : link
  };
}]);

/**
 * Return formatted string containing "elapsed time" since input
 */
function getElapsed(date){
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
}
