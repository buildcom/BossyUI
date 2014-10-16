angular.module('bossy.dropdown', [])
	.run(function($templateCache) {
		$templateCache.put('jasmineTest.html', 'jasmineTest.html');
	})
	
	.factory('bossyDropdownFactory', function($http /*$data*/) {
		var promise = $http.get('https://gist.githubusercontent.com/mshafrir/2646763/raw/bfb35f17bc5d5f86ec0f10b80f7b80e823e9197f/states_titlecase.json');
		return promise;
	})
	
	.directive('bossyDropdown', function($compile, $http /*$data,*/ /*$schema*/) {
		return {
			restrict: 'EA',
			replace: true,
			templateUrl: 'bossy.dropdown.html',
			controller: function($scope, bossyDropdownFactory) {
				$scope.contents = [];

				bossyDropdownFactory
					.success(function(data){
						$scope.contents = data;
					})
					.error(function(data) {
						console.log("http.get FAILED");
						$scope.contents = data || "Request failed";
					});
			},
			controllerAs: "drops"		
		};
	})
	
	.controller('bossyDropdownCtrl', function($http, bossyDropdownFactory, $scope /*$data,*/ /*$schema*/) {
		$scope.items = [];
		
		bossyDropdownFactory
			.success(function(data){
				$scope.items = data;
			})
			.error(function(data) {
				console.log("http.get FAILED");
				$scope.items = data || "Request failed";
			})
	})
	
	
