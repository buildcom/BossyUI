angular.module('bossy.dropdown', [])
	.run(function($templateCache) {
		$templateCache.put('jasmineTest.html', 'jasmineTest.html');
	})

	.directive('bossyDropdown', function($http) {
		return {
			restrict: 'EA',
			scope: {
				src: "=",
				value: "="
			},
			templateUrl: 'bossy-dropdown.html',
			controller: function($scope) {
				var drop = this;
				drop.listedValue = $scope.value;
				drop.items = [];

				$http.get($scope.src).success(function(data) {
					drop.items = data;
				});
			},
			controllerAs: 'dropdown'
		};
	})