angular.module('bossy.dropdown', [])
	.run(function($templateCache) {
		$templateCache.put('jasmineTest.html', 'jasmineTest.html');
	})
	
	.factory('bossyDropdownFactory', ['$http', function($http) {
		return {
			_options: {
				title: 'drop title',
				content: 'pop'
			}
		}
		// $http.get('https://gist.githubusercontent.com/mshafrir/2646763/raw/bfb35f17bc5d5f86ec0f10b80f7b80e823e9197f/states_titlecase.json').success(function(data){
			// _options.content = data;
		// })
	}])
	
	.directive('bossyDropdown', function($compile, $http /*$data,*/ /*$schema*/) {
		return {
			restrict: 'EA',
			replace: true,
			templateUrl: 'bossy.dropdown.html',
			controller:['$scope', 'bossyDropdownFactory', function($scope, bossyDropdownFactory) {
					this._options = {
					title: bossyDropdownFactory._options.title,
					content: bossyDropdownFactory._options.content
				};
			}],
			controllerAs: "drops"		
		};
	})
	
	
