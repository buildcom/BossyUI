'use strict';

angular.module('bossyui.directives', [])

	.directive('bossySticky', function($state, $rootScope, $window, $document) {
    return {
      restrict: 'AEC',
      link: function (scope, element, attrs) {
      	// angular.element($window).bind("scroll", function() {
          if(attrs.sticky > 0) {
            if (angular.element($window).pageYOffset <= attrs.sticky && $document[0].body.clientHeight >=$window.innerHeight + parseInt(attrs.sticky)) {
              scope.sticky = false;
  	        } else {
  	          scope.sticky = true;
  	        }
          }
	        // scope.$apply();
	      // });
      }
    }
  })

  .directive('bossyDownload', function($state, $rootScope, $http){
    return {
      restrict: 'AEC',
      link: function(scope, element, attrs) {
        element.bind('click', function(){
          console.log(attrs.file);
          $http.post(attrs.file).success(function (){
            console.log("download Success");
          })
        });
      },
    }
  })

  .directive('bossySvg', function($state, $rootScope, $http){
    return {
      templateUrl: function(elem, attr){
        return attr.src;
      }
    }
  });
  // function(scope, element, attrs) {
  //     angular.element($window).bind("scroll", function() {
  //     	console.log("success");
  //        if (this.pageYOffset >= 100) {
  //         scope.boolChangeClass = true;
  //         // console.log('Scrolled below header.');
  //       } else {
  //         scope.boolChangeClass = false;
  //         // console.log('Header is in view.');
  //       }
  //       scope.$apply();
  //     });
  //   };