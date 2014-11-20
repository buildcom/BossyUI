angular.module('bossy.dropdown', [])
	.directive('bossyDropdown', function($http, $compile) {
		return {
			restrict: 'EA',
			scope: {
				config: "="
			},
			templateUrl: 'bossy-dropdown.html',
			link: function(scope, element, attrs) {
				var customTemplate;

				//Checks if user is defining a url or inner html
				if(scope.dropdown.template[0] !== '<')
					customTemplate = $compile('<ng-include src="dropdown.template"></ng-include>')(scope);
				else
					customTemplate = $compile(scope.dropdown.template)(scope);
				
				element.replaceWith(customTemplate);
				//scope.selectedItem = "ooo";

			},
			controller: function($scope) {
				var thisDropdown = this;
				thisDropdown.title = $scope.config.title;
				thisDropdown.items = [];

				//Determine if custom template Url has been defined.
				if($scope.config.template)
					thisDropdown.template = $scope.config.template;
				else
					thisDropdown.template = 'bossy-dropdown.html';

				thisDropdown.updateSelectedItem = function(selectedItem){
					$scope.config.select = selectedItem;
					console.log($scope.config.select);
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
