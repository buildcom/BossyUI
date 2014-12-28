angular.module('bossy.toast', ['ngAnimate'])

  .controller('ToasterController', ['$scope', '$interval', '$timeout', function($scope, $interval, $timeout)
  {
    /**
     *  Toast is a constructor for toast objects
     * 
     * @param {String} message        [text that goes within the message]
     * @param {Integer} timeout       [time in milliseconds till timeout]
     * @param {CSS} background        [background color]
     * @param {CSS} color             [text color]
     * @param {CSS} height            [toast height]
     * @param {CSS} width             [toast width]
     * @param {CSS} margin            [toast margins]
     * @param {CSS} padding           [toast padding]
     * @param {CSS} border_radius     [toast border-radius]
     */
    function Toast(message, timeout, background, color, height, width, margin, padding, border_radius){
      this.message = message;
      this.timeout = timeout;
      this.background = background || "#333"; //default background is dark gray
      this.color = color || "#FFF"; //default text color is white
      this.height = height || "30px"; //default height is 30px
      this.width = width || ""; //default width is content specific
      this.margin = margin || "5px 0px"; //default margins are only for top and bottom
      this.padding = padding || "5px 5px";//default padding on all edges
      this.border_radius = border_radius || "0px";//default to square edges
    }

    /** universal members **/
    $scope.toasts = []; //toasts is a stack of toasts made by the user

    /**
     *  compareTimeouts is used to sort the list of toasts by the expiration
     * 
     * @param  {Toast} a [Toast object one]
     * @param  {Toast} b [Toast object two]
     * @return {1, 0, -1}   [true, equal, false]
     */
    function compareTimeouts(a,b) {
      if (a.timeout < b.timeout)
         return -1;
      if (a.timeout > b.timeout)
        return 1;
      return 0;
    }

    /**
     * checkTimer is responsible for returning a true or false depending on if the timer
     * has a value of greater than 0
     * 
     * @param  {Toast} toast [toast to check the timer of]
     * @return {Boolean}       [True if timer is less than 0, false otherwise]
     */
    function checkTimer(toast){
      if(toast.timeout > 0)
        return false;
      return true;
    }

     /**
     * timeToast is responsible for isolating the scope of each individual toast and 
     * setting up a timer with $interval that removes 200 miliseconds from the timer
     * for each interval of 200 miliseconds until the timeout reaches 0.
     * 
     * @param  {Toast} toast [toast to time for removal]
     */
    function timeToast(toast){
      subtract = $interval(function(){toast.timeout = toast.timeout - 200;}, 200, toast.timeout/200);
      result = $interval(function(){if(checkTimer(toast)){$scope.toasts.splice(0, 1); delete toast;}}, 200, toast.timeout/200)
    }

    /**
     * bossyToast requires a message and timeout to create a new Toast object 
     * which is then added to the stack of toasts
     * 
     * @param  {String} message [Message to toast]
     * @param  {Int} timeout [Time in ms to display toast]
     */
    $scope.bossyToast = function(message, timeout){
      //console.log("Beginning Toast"); // verifies function was called correctly
      new_toast = new Toast(message, timeout);
      //console.log(new_toast); // shows the details of the newly created toast message
      $scope.toasts.push(new_toast); // adds the toast to the toastlist
      $scope.toasts.sort(compareTimeouts); // first toast to expire is at the bottom
      //console.log($scope.toasts);  // shows the toasts list before toast is removed
      // always removes the lowest time remaining item
      timeToast(new_toast);
      // outputs at the moment the toast is removed from the toastlist
      //$timeout(function(){console.log("Ending Toast")}, new_toast.timeout); 
    };
  }])
  .directive('toast', [function () {
    return {
      restrict: 'AE',
      scope: {
        toast: '=config'
      },
      template: '{{toast.message}} {{toast.timeout}}'
    };
  }])
  .directive('toaster', [function () {
    return {
      restrict: 'AE',
      scope: {
        toasts: '=config'
      },
      template: '<toast ng-repeat="toast in toasts" config="toast" class="bossy-toast"></toast>'
    };
  }]);