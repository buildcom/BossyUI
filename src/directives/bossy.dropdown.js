angular.module('bossy.dropdown', [])
	.run(function($templateCache) {
		$templateCache.put('jasmineTest.html', 'jasmineTest.html');
	})

	.directive('bossyDropdown', function($http) {
		return {
			restrict: 'EA',
			scope: {
				//config: "="
				src: "=",
				title: "="
			},
			templateUrl: 'bossy-dropdown.html',
			controller: function($scope) {
				var thisDropdown = this;
				thisDropdown.title = $scope.title;
				thisDropdown.items = [];

				$http.get($scope.src).success(function(data) {
					thisDropdown.items = data;
				});
			},
			controllerAs: 'dropdown'
		};
	})