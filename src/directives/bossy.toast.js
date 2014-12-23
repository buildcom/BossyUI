angular.module('bossy.toast', ['ngAnimate'])
  .controller('ToastController', ['$scope', '$timeout', function ($scope, $timeout) {

    $scope.show = function(toastObject){
      console.log("Trying to show" + toastObject);
      toastObject.style.display = "block";
      $timeout($scope.hide(toastObject), 3000);  // 5 seconds
    };

    $scope.hide = function(toastObject){
      console.log("Trying to hide" + toastObject);
      toastObject.style.display = "none";
    };

    

  }]).directive('toast', [ '$timeout', function ($timeout) {
    function link(scope, element, attrs) {
      console.log(element[0]);
      $timeout(function(){
           element.remove();
       }, 5000);
    };

    return {
      restrict: 'AE',
      scope: {
        config: '='
      },
      template: '<style>.bossy-toast{ box-sizing: border-box; border-radius: 15px; position: absolute; height: 30px; padding: 6px 10px; bottom: 50px; left: 40%; background: #222; color: #FFF;}</style><div class="bossy-toast">Welcome</div>',
      link: link,
      controller: 'ToastController'
    };

  }]);

  // if expression is true
  // toast(display visible)for x amount of seconds (display hidden)