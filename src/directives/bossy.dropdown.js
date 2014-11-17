angular.module('bossy.dropdown', [])
	.directive('bossyDropdown', function($http, $compile) {
		return {
			restrict: 'EA',
			scope: {
				config: "="
			},
			templateUrl: '',
			link: function(scope, element, attrs) {
				var customTemplate = $compile('<ng-include src="dropdown.tempUrl"></ng-include>')(scope);
				element.replaceWith(customTemplate);
			},
			controller: function($scope) {
				var thisDropdown = this;
				thisDropdown.title = $scope.config.title;
				thisDropdown.items = [];

				//Determine if custom template Url has been defined.
				if($scope.config.tempUrl)
					thisDropdown.tempUrl = $scope.config.tempUrl;
				else
					thisDropdown.tempUrl = 'bossy-dropdown.html';

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
