angular.module('bossy.dropdown', [])
	.directive('bossyDropdown', function($http, $compile) {
		return {
			restrict: 'EA',
			scope: {
				config: "=",
				select: "="
			},
			templateUrl: '',
			link: function(scope, element, attrs) {
				var customTemplate;

				//Checks if user is defining a url or inner html
				//If it is a url, the template must be located in a local directory or added to the DOM via ng-include
				if(scope.dropdown.template[0] !== '<')
					customTemplate = $compile('<ng-include src="dropdown.template"></ng-include>')(scope);
				else
					customTemplate = $compile(scope.dropdown.template)(scope);
				
				//Injects template
				element.replaceWith(customTemplate);
			},
			controller: function($scope) {
				var thisDropdown = this;
				thisDropdown.title = $scope.config.title;
				thisDropdown.items = [];

				//Retrieve json containing objects to populate the dropdown
				$http.get($scope.config.src)
					.success(function(data) {
						thisDropdown.items = data;
						//Attaches retrieved items to $scope.config for additional functionality
						if($scope.config.items)
							$scope.config.items = thisDropdown.items;
					})
					.error(function(data) {
						console.log("http.get FAILED");
						$scope.config.items = data || "Request failed";
					});

				//Function called to update select via ng-change in the template
				thisDropdown.updateSelectedItem = function(selectedItem){
					//selectedItem attached to two different selects for multifunctionality
					//user can collect and utilize multiple select objects if passing in a select param
					$scope.select = selectedItem;
					$scope.config.select = selectedItem;
				};

				//Determine if custom template Url has been defined.
				if($scope.config.template)
					thisDropdown.template = $scope.config.template;
				else
					thisDropdown.template = 'bossy-dropdown.html';
			},
			controllerAs: 'dropdown'
		};
	})
