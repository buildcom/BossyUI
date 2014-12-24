angular.module('bossy.toast', ['ngAnimate'])
  // The idea for a BossyController is one universal controller the user includes that gives them access
  // to functions that are part of the core bossy widgets, as well as give the bossy widgets
  // a universal scope to use for persistence throughout the app. For example, 
  // if someone has more than one toast in the timeout then we need to accomodate
  // a stack of toasts that will timeout as needed.
  // Option #2 would be to use a "Toaster" directive that wraps around the toast and manages
  // from that perspective. Also a valid solution, potentially more extensible. and also funny.
  /**
  .controller('BossyController', ['$scope', '$timeout', function($scope, $timeout)
  {
    /** object prototypes **//**
    function Toast(message, timeout){
      this.message = message;
      this.timeout = timeout;
    }
    /** universal members **//**
    //toasts is a stack of toasts made by the user
    $scope.toasts = [];
   
    /** helper method **//**
    // compares timeout values on toast objects for sorting
    function compareTimeouts(a,b) {
      if (a.timeout < b.timeout)
         return -1;
      if (a.timeout > b.timeout)
        return 1;
      return 0;
    }
    
   
    //bossyToast will then fire off the necessary bossy toast code...
    $scope.bossyToast = function(message, timeout){
      new_toast = new Toast(message, timeout)
      toasts.push(new_toast);
      toasts.sort(compareTimeouts);
      $timeout(toasts.splice(indexOf(new_toast), 1), new_toast.timeout)
    };

  }])
  **/
  .controller('ToasterController', ['$scope', '$timeout', function($scope, $timeout)
  {
    /** object prototypes **/
    function Toast(message, timeout){
      this.message = message;
      this.timeout = timeout;
    }
    /** universal members **/
    //toasts is a stack of toasts made by the user
    $scope.toasts = [];
   
    /** helper method **/
    // compares timeout values on toast objects for sorting
    function compareTimeouts(a,b) {
      if (a.timeout < b.timeout)
         return -1;
      if (a.timeout > b.timeout)
        return 1;
      return 0;
    }
    
   
    //bossyToast will then fire off the necessary bossy toast code...
    $scope.bossyToast = function(message, timeout){
      console.log("Beginning Toast"); // verifies function was called correctly
      new_toast = new Toast(message, timeout);
      console.log(new_toast); // shows the details of the newly created toast message
      $scope.toasts.push(new_toast); // adds the toast to the toastlist
      $scope.toasts.sort(compareTimeouts); // first toast to expire is at the bottom
      console.log($scope.toasts);  // shows the toasts list before toast is removed
      $timeout(function(){$scope.toasts.splice($scope.toasts.indexOf(new_toast), 1)}, new_toast.timeout);
      $timeout(function(){console.log("Ending Toast")}, new_toast.timeout); // outputs at the moment the toast is removed from the toastlist
    };

  }])
  .directive('toast', [ '$timeout', function ($timeout) {
    return {
      restrict: 'AE',
      scope: {
        config: '='
      },
      template: '<style>.bossy-toast{ box-sizing: border-box; position: relative; height: 30px; padding: 6px 10px; margins: 5px 0px; background: #222; color: #FFF;}</style><div class="bossy-toast">Toasty</div>'
    };

  }])
  .directive('toaster', [ '$timeout', function ($timeout) {
    return {
      restrict: 'AE',
      scope: {
        toasts: '='
      },
      template: '<style>.bossy-toaster{ box-sizing: border-box; position: absolute; bottom: 50px; left: 40%;}</style><div class="bossy-toaster"><toast ng-repeat="toast in toasts" ng-animate config="toast">Something</toast></div>'
    };

  }])
  .controller('ToastController', ['$scope', '$timeout', function ($scope, $timeout) {
    /** deprecated  
    $scope.show = function(toastObject){
      console.log("Trying to show" + toastObject);
      toastObject.style.display = "block";
      $timeout($scope.hide(toastObject), 3000);  // 5 seconds
    };

    $scope.hide = function(toastObject){
      console.log("Trying to hide" + toastObject);
      toastObject.style.display = "none";
    };
    **/

  }]);