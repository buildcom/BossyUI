'use strict';

/* Controllers */

angular.module('bossyui.controllers', [])

	.controller('homeCtrl', function($scope, $rootScope) {
		$scope.bodyclass = "home";
  })

  .controller('calenderCtrl', function($scope){
  	$scope.calendarConfig = {};
  })
  ;