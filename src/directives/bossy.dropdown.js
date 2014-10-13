angular.module('bossy.dropdown', [])
	.run(function($templateCache) {
		$templateCache.put('jasmineTest.html', 'jasmineTest.html');
	})
	
	.factory('bossyDropdownFactory', ['$http', /*'$data',*/ function($http /*$data*/) {
		
		return $http.get('https://gist.githubusercontent.com/mshafrir/2646763/raw/bfb35f17bc5d5f86ec0f10b80f7b80e823e9197f/states_titlecase.json');
			
		//TEST ARRAY 
		 // dataArray =  [
        // {id: 0, name:'AlenMania'},
        // {id: 1, name:'Albania'},
        // {id: 2, name:'Algeria'},
        // {id: 3, name:'Andorra'},
        // {id: 4, name:'Angola'},
        // {id: 5, name:'Antigua & Deps'}
		// ];
	}])
	
	.directive('bossyDropdown', function($compile, $http /*$data,*/ /*$schema*/) {
		return {
			restrict: 'EA',
			replace: true,
			templateUrl: 'bossy.dropdown.html',
			controller: function($scope, bossyDropdownFactory) {
				$scope.contents = [];
				
				bossyDropdownFactory.success(function(data){
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
	
	.controller('bossyDropdownCtrl', function($compile, $http, bossyDropdownFactory, $scope /*$data,*/ /*$schema*/) {
			$scope.contents = [];
			
			bossyDropdownFactory.success(function(data){
				$scope.contents = data;
			})
			.error(function(data) {
				console.log("http.get FAILED");
				$scope.contents = data || "Request failed";
			})
	})
	
	
