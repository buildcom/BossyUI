angular.module('bossy.dropdown', [])
	.directive('bossyDropdown', function($http) {
		return {
			restrict: 'EA',
			scope: {
				config: "="
			},
			templateUrl: 'bossy-dropdown.html',
			controller: function($scope) {
				var thisDropdown = this;
				thisDropdown.title = $scope.config.title;
				thisDropdown.items = [];

				thisDropdown.updateSelectedItem = function(){
					$scope.config.select = $scope.selectedItem;
				}

				$http.get($scope.config.src)
					.success(function(data) {
						thisDropdown.items = data;
						$scope.config.items = thisDropdown.items;
					})
					.error(function(data) {
						console.log("http.get FAILED");
						$scope.config.items = data || "Request failed";
					});
			},
			controllerAs: 'dropdown'
		};
	})
