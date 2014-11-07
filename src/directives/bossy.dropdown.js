angular.module('bossy.dropdown', [])
	.run(function($templateCache) {
		$templateCache.put('jasmineTest.html', 'jasmineTest.html');
	})

	.directive('bossyDropdown', function($http) {
		return {
			restrict: 'EA',
			scope: {
				// src: "=",
				// title: "="
				config: "="
			},
			templateUrl: 'bossy-dropdown.html',
			controller: function($scope) {
				var thisDropdown = this;
				thisDropdown.title = $scope.config.title;
				thisDropdown.items = [];
				$http.get($scope.config.src)
					.success(function(data) {
						thisDropdown.items = data;
					})
					.error(function(data) {
						console.log("http.get FAILED");
						$scope.items = data || "Request failed";
					});
			},
			controllerAs: 'dropdown'
		};
	})