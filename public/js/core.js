// public/core.js
var fatCatsFeeding = angular.module('fatCatsFeeding', []);

fatCatsFeeding.controller('Controller', ['$scope', '$http', '$interval', function($scope, $http, $interval) {
  $scope.formData = {};
  $scope.quantity = 5;
  $scope.feedDate = '';
  $scope.amounts = [{"id": "1/2"}, {"id":"1/3"}, {"id":"1"}];
  $scope.refresh = function() {
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
    $http.get('/api/catfoods')
      .success(function(data) {
        $scope.catfoods = data;
      })
      .error(function(data) {
        console.log('ERR: '+data);
      });
  };
  $scope.refresh();

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
        $scope.refresh();
      })
      .error(function(data) {
          console.log('ERR: '+data);
      });
  };
  /**
   * Remove with undo
   */
   var deferId; //interval id
   $scope.showUndo = false; // Hide undo warning
   $scope.removeFeeding = function(id, date) {
     $scope.feedDate = new Date(date);
     $scope.showUndo = true; // Show undo warning
     $scope.feedings = _.filter($scope.feedings, function(feeding) {
       return feeding._id !== id;
     });
     deferId = $interval(function () {
          $scope.showUndo = false;
          $scope.deleteFeeding(id);
          $interval.cancel(deferId);
      }, 15000);
   };

 /**
  * Undo Remove
  */
  $scope.undoRemove = function() {
      $interval.cancel(deferId);
      $scope.showUndo = false;
      $scope.refresh();
  };

 /**
  * PUT by ID
  */
  $scope.update = function(feeding, food, foodAmount) {
    console.log(feeding);
    console.log(food);
    console.log(foodAmount);
    $http.put('/api/feedings/'+feeding, {food: food, amount: foodAmount})
      .success(function(data) {
        $scope.refresh();
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
