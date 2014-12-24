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
    function Toast(message, timeout, background, color, height, width, margin, padding){
      this.message = message;
      this.timeout = timeout;
      this.background = background || "#333"; //default background is dark gray
      this.color = color || "#FFF"; //default text color is white
      this.height = height || "30px"; //default height is 30px
      this.width = width || ""; //default width is content specific
      this.margin = margin || "5px 0px";
      this.padding = padding || "5px 5px";
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
      // always removes the lowest time remaining item
      $timeout(function(){$scope.toasts.splice(0, 1)}, new_toast.timeout); 
      // outputs at the moment the toast is removed from the toastlist
      $timeout(function(){console.log("Ending Toast")}, new_toast.timeout); 
    };

  }])
  .directive('toast', [ '$timeout', function ($timeout) {
    return {
      restrict: 'AE',
      scope: {
        toast: '=config'
      },
      template: '{{toast.message}}'
    };

  }])
  .directive('toaster', [ '$timeout', function ($timeout) {
    return {
      restrict: 'AE',
      scope: {
        toasts: '=config'
      },
      template: '<toast ng-repeat="toast in toasts" config="toast" class="bossy-toast"></toast>'
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